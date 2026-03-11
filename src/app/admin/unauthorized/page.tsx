import Link from "next/link";
import { ShieldOff } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white max-w-md w-full p-10 rounded-3xl border border-gray-100 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-2xl mb-6">
          <ShieldOff className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-tajawal font-bold text-gray-900 mb-2">غير مصرح بالوصول</h1>
        <p className="text-gray-500 font-cairo text-sm mb-8">
          ليس لديك صلاحية للوصول إلى هذه الصفحة. يرجى التواصل مع المدير العام لمنحك الصلاحيات اللازمة.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-dark-green text-white font-tajawal font-bold rounded-xl hover:bg-[#154618] transition-colors"
        >
          العودة للوحة التحكم
        </Link>
      </div>
    </div>
  );
}
