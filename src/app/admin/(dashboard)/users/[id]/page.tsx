import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getUserRoles } from "@/actions/users";
import { notFound } from "next/navigation";
import { EditPermissionsForm } from "./EditPermissionsForm";

export default async function AdminEditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const users = await getUserRoles();
  const user = users.find((u) => u.user_id === id);

  if (!user) notFound();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-sm font-cairo text-gray-500 mb-2">
          <Link href="/admin/users" className="hover:text-primary-dark-green transition-colors flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            العودة لإدارة المستخدمين
          </Link>
        </div>
        <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">تعديل صلاحيات المستخدم</h1>
        <p className="text-gray-500 font-cairo">تعديل الصلاحيات الممنوحة لـ <strong className="text-gray-800">{user.email}</strong></p>
      </div>

      <EditPermissionsForm user={user} />
    </div>
  );
}
