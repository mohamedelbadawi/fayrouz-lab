"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type UserPermissions = {
  can_manage_tests: boolean;
  can_manage_articles: boolean;
  can_manage_settings: boolean;
  can_manage_users: boolean;
};

/**
 * Ensure the calling user is a super_admin before any sensitive action.
 */
async function assertSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "غير مصرح لك بالوصول." };

  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (role?.role !== "super_admin") {
    return { error: "هذه العملية متاحة للمدير العام فقط." };
  }
  return { error: null };
}

/**
 * Create a new auth user + assign permissions via user_roles.
 */
export async function createUserAction(formData: FormData) {
  const auth = await assertSuperAdmin();
  if (auth.error) return { error: auth.error };

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("full_name") as string;
  const can_manage_tests = formData.get("can_manage_tests") === "on";
  const can_manage_articles = formData.get("can_manage_articles") === "on";
  const can_manage_settings = formData.get("can_manage_settings") === "on";

  if (!email || !password) {
    return { error: "البريد الإلكتروني وكلمة المرور مطلوبان." };
  }

  const adminClient = createAdminClient();

  // Create auth user with a force-password-change flag
  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip email confirmation
    user_metadata: { force_password_change: true },
  });

  if (createError || !newUser?.user) {
    console.error("Error creating user:", createError);
    return { error: createError?.message || "حدث خطأ أثناء إنشاء المستخدم." };
  }

  // Insert role row
  const { error: roleError } = await adminClient
    .from("user_roles")
    .insert({
      user_id: newUser.user.id,
      email,
      full_name,
      role: "editor",
      can_manage_tests,
      can_manage_articles,
      can_manage_settings,
      can_manage_users: false,
    });

  if (roleError) {
    console.error("Error inserting user role:", roleError);
    // Rollback: delete the auth user we just created
    await adminClient.auth.admin.deleteUser(newUser.user.id);
    return { error: roleError.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Update an existing user's permissions.
 */
export async function updateUserPermissionsAction(userId: string, formData: FormData) {
  const auth = await assertSuperAdmin();
  if (auth.error) return { error: auth.error };

  const full_name = formData.get("full_name") as string;
  const can_manage_tests = formData.get("can_manage_tests") === "on";
  const can_manage_articles = formData.get("can_manage_articles") === "on";
  const can_manage_settings = formData.get("can_manage_settings") === "on";

  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("user_roles")
    .update({
      full_name,
      can_manage_tests,
      can_manage_articles,
      can_manage_settings,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Delete an auth user (cascades to user_roles via FK).
 */
export async function deleteUserAction(userId: string) {
  const auth = await assertSuperAdmin();
  if (auth.error) return { error: auth.error };

  const adminClient = createAdminClient();

  const { error } = await adminClient.auth.admin.deleteUser(userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Get all users with their roles (for listing in dashboard).
 */
export async function getUserRoles() {
  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from("user_roles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching user roles:", error);
    return [];
  }
  return data;
}
