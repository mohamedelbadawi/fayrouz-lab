"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUserPermissionsAction } from "@/actions/users";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";

type UserRole = {
  user_id: string;
  email: string;
  full_name: string | null;
  can_manage_tests: boolean;
  can_manage_articles: boolean;
  can_manage_settings: boolean;
};

const PERMISSIONS = [
  { name: "can_manage_tests", label: "إدارة التحاليل", description: "إضافة وتعديل وحذف التحاليل الطبية", color: "bg-blue-50 border-blue-200" },
  { name: "can_manage_articles", label: "إدارة المقالات", description: "إنشاء وتعديل وحذف المقالات الطبية", color: "bg-green-50 border-green-200" },
  { name: "can_manage_settings", label: "إدارة الإعدادات", description: "تعديل إعدادات الموقع والتواصل", color: "bg-orange-50 border-orange-200" },
];

export function EditPermissionsForm({ user }: { user: UserRole }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateUserPermissionsAction(user.user_id, formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("تم تحديث الصلاحيات بنجاح!");
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
            <p className="text-gray-900 font-tajawal font-bold text-lg">جاري تحديث الصلاحيات...</p>
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
                defaultValue={user.full_name || ""}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all"
              />
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <label className="block text-sm font-bold font-tajawal text-gray-900">البريد الإلكتروني</label>
              <input
                type="email"
                value={user.email}
                readOnly
                dir="ltr"
                className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-xl block p-4 font-cairo cursor-not-allowed"
              />
            </div>

            {/* Permissions */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-sm font-bold font-tajawal text-gray-900">الصلاحيات</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PERMISSIONS.map(({ name, label, description, color }) => (
                  <label
                    key={name}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${color}`}
                  >
                    <input
                      type="checkbox"
                      name={name}
                      defaultChecked={(user as any)[name]}
                      className="mt-0.5 w-4 h-4 rounded"
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
              {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
