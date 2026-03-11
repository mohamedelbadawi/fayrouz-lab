import { AdminSidebar } from "@/components/ui/AdminSidebar";
import { createClient } from "@/utils/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isSuperAdmin = false;
  if (user) {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();
    isSuperAdmin = roleData?.role === "super_admin";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isSuperAdmin={isSuperAdmin} />
      <main className="flex-1 p-6 md:p-10 w-full lg:max-w-[calc(100vw-288px)]">
        {children}
      </main>
    </div>
  );
}
