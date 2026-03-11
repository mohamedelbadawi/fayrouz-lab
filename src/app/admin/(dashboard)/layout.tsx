import { AdminSidebar } from "@/components/ui/AdminSidebar";
import { createClient } from "@/utils/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null; // Middleware usually handles this

  let userInfo = {
    email: user.email!,
    fullName: "مدير",
    roleLabel: "محرر",
  };

  let permissions = {
    isSuperAdmin: false,
    can_manage_tests: false,
    can_manage_articles: false,
    can_manage_settings: false,
    can_manage_users: false,
  };

  if (user) {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role, full_name, can_manage_tests, can_manage_articles, can_manage_settings, can_manage_users")
      .eq("user_id", user.id)
      .single();

    if (roleData) {
      const isSuperAdmin = roleData.role === "super_admin";
      permissions = {
        isSuperAdmin,
        can_manage_tests: isSuperAdmin || roleData.can_manage_tests,
        can_manage_articles: isSuperAdmin || roleData.can_manage_articles,
        can_manage_settings: isSuperAdmin || roleData.can_manage_settings,
        can_manage_users: isSuperAdmin || roleData.can_manage_users,
      };
      userInfo = {
        email: user.email!,
        fullName: roleData.full_name || "مدير",
        roleLabel: isSuperAdmin ? "مدير عام" : "محرر",
      };
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar permissions={permissions} user={userInfo} />
      <main className="flex-1 p-6 md:p-10 w-full lg:max-w-[calc(100vw-288px)]">
        {children}
      </main>
    </div>
  );
}
