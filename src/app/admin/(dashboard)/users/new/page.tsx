import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CreateUserForm } from "./CreateUserForm";

export default function AdminNewUserPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm font-cairo text-gray-500 mb-2">
          <Link href="/admin/users" className="hover:text-primary-dark-green transition-colors flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            العودة لإدارة المستخدمين
          </Link>
        </div>
        <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">إضافة مستخدم جديد</h1>
        <p className="text-gray-500 font-cairo">أنشئ حساباً جديداً وحدد الصلاحيات التي يملكها في لوحة التحكم.</p>
      </div>

      <CreateUserForm />
    </div>
  );
}
