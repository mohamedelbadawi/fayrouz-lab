"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/actions/users";
import toast from "react-hot-toast";
import { Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";

const PERMISSIONS = [
  { name: "can_manage_tests", label: "إدارة التحاليل", description: "إضافة وتعديل وحذف التحاليل الطبية", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { name: "can_manage_articles", label: "إدارة المقالات", description: "إنشاء وتعديل وحذف المقالات الطبية", color: "bg-green-50 border-green-200 text-green-700" },
  { name: "can_manage_settings", label: "إدارة الإعدادات", description: "تعديل إعدادات الموقع والتواصل", color: "bg-orange-50 border-orange-200 text-orange-700" },
];

export function CreateUserForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createUserAction(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("تم إنشاء المستخدم بنجاح!");
        router.push("/admin/users");
      }
    });
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <Spinner className="w-12 h-12 text-primary-dark-green" />
            <p className="text-gray-900 font-tajawal font-bold text-lg">جاري إنشاء المستخدم...</p>
          </div>
        </div>
      )}

      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${isPending ? "pointer-events-none opacity-60" : ""}`}>
        <form action={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="full_name" className="block text-sm font-bold font-tajawal text-gray-900">الاسم الكامل</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all"
                placeholder="مثال: محمد أحمد"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold font-tajawal text-gray-900">البريد الإلكتروني <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                required
                dir="ltr"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all"
                placeholder="user@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="password" className="block text-sm font-bold font-tajawal text-gray-900">كلمة المرور المؤقتة <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  minLength={8}
                  dir="ltr"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 pe-12 font-cairo transition-all"
                  placeholder="8 أحرف على الأقل"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs font-cairo text-gray-400">سيُطلب من المستخدم تغيير كلمة المرور عند أول تسجيل دخول.</p>
            </div>

            {/* Permissions */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-sm font-bold font-tajawal text-gray-900">الصلاحيات الممنوحة</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PERMISSIONS.map(({ name, label, description, color }) => (
                  <label
                    key={name}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm has-[:checked]:shadow-sm has-[:checked]:${color} ${color.split(" ")[0]} border-gray-100 has-[:checked]:border-current`}
                  >
                    <input
                      type="checkbox"
                      name={name}
                      className="mt-0.5 w-4 h-4 rounded accent-current"
                    />
                    <div>
                      <p className="font-tajawal font-bold text-gray-900 text-sm">{label}</p>
                      <p className="font-cairo text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link
              href="/admin/users"
              className="px-6 py-3 rounded-xl bg-gray-50 text-gray-700 font-tajawal font-bold hover:bg-gray-100 transition-colors"
            >
              إلغاء
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 rounded-xl bg-primary-dark-green text-white font-tajawal font-bold hover:bg-[#154618] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isPending ? "جاري الإنشاء..." : "إنشاء المستخدم"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
