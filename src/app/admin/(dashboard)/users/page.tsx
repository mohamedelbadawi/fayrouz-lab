import Link from "next/link";
import { getUserRoles } from "@/actions/users";
import { UserCheck, UserX, Shield, Plus, Pencil, Trash2, ArrowRight } from "lucide-react";
import { DeleteUserButton } from "./DeleteUserButton";

export default async function AdminUsersPage() {
  const users = await getUserRoles();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">إدارة المستخدمين</h1>
          <p className="text-gray-500 font-cairo">أنشئ مستخدمين جدد وحدد صلاحياتهم في لوحة التحكم.</p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary-dark-green text-white font-tajawal font-bold rounded-xl hover:bg-[#154618] transition-colors shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" />
          إضافة مستخدم جديد
        </Link>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="font-tajawal font-bold text-lg text-gray-900">المستخدمون ({users.length})</h2>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <UserX className="w-7 h-7 text-gray-400" />
            </div>
            <p className="font-tajawal font-bold text-gray-700 mb-1">لا مستخدمين بعد</p>
            <p className="text-sm text-gray-400 font-cairo mb-5">لم يتم إضافة أي مستخدمين آخرين حتى الآن</p>
            <Link
              href="/admin/users/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-dark-green text-white font-tajawal font-bold rounded-xl hover:bg-[#154618] transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              إضافة مستخدم
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {users.map((user) => (
              <li key={user.id} className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50/50 transition-colors group">
                {/* Avatar */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-tajawal font-bold text-lg ${user.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                  {(user.full_name || user.email).charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-tajawal font-bold text-gray-900">{user.full_name || "—"}</p>
                    {user.role === "super_admin" && (
                      <span className="inline-flex items-center gap-1 text-xs font-cairo px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                        <Shield className="w-3 h-3" />
                        مدير عام
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-cairo text-gray-500 truncate">{user.email}</p>
                  {/* Permissions */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.can_manage_tests && (
                      <span className="text-xs font-cairo px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">التحاليل</span>
                    )}
                    {user.can_manage_articles && (
                      <span className="text-xs font-cairo px-2 py-0.5 rounded-full bg-green-50 text-green-700">المقالات</span>
                    )}
                    {user.can_manage_settings && (
                      <span className="text-xs font-cairo px-2 py-0.5 rounded-full bg-orange-50 text-orange-700">الإعدادات</span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="shrink-0 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-cairo text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <UserCheck className="w-3 h-3" />
                    نشط
                  </div>
                </div>

                {/* Actions */}
                {user.role !== "super_admin" && (
                  <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/admin/users/${user.user_id}`}
                      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary-dark-green hover:text-white transition-colors"
                      title="تعديل الصلاحيات"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <DeleteUserButton userId={user.user_id} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
