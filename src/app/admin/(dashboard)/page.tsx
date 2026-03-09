import { Users, FileText, Beaker, TrendingUp } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Get exact counts
  const { count: testsCount } = await supabase
    .from("tests")
    .select("*", { count: "exact", head: true });

  const { count: articlesCount } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  // Get 3 recent tests
  const { data: recentTests } = await supabase
    .from("tests")
    .select("*")
    .limit(3);

  const stats = [
    { label: "إجمالي التحاليل", value: testsCount?.toString() || "0", icon: Beaker, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "المقالات المنشورة", value: articlesCount?.toString() || "0", icon: FileText, color: "text-green-600", bg: "bg-green-50" },
    { label: "الزيارات اليومية", value: "0", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "التفاعلات", value: "+0%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">لوحة التحكم</h1>
        <p className="text-gray-500 font-cairo">مرحباً بك مجدداً! إليك ملخص لأداء الموقع هذا الأسبوع.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm font-cairo text-gray-500 mb-1">{stat.label}</div>
                <div className="text-2xl font-tajawal font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tests Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-tajawal font-bold text-lg text-gray-900">أحدث التحاليل المضافة</h2>
            <Link href="/admin/tests" className="text-sm font-tajawal text-primary-light-green hover:underline">عرض الكل</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right font-cairo text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">اسم الفحص</th>
                  <th className="px-6 py-3 font-medium">التصنيف</th>
                  <th className="px-6 py-3 font-medium">السعر</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTests?.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-gray-900">{test.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {test.category === 'blood' ? 'أمراض الدم' : test.category === 'organs' ? 'وظائف الأعضاء' : 'فيتامينات'}
                    </td>
                    <td className="px-6 py-4 text-primary-dark-green font-bold">{test.price} ج.م</td>
                  </tr>
                ))}
                {(!recentTests || recentTests.length === 0) && (
                   <tr>
                     <td colSpan={3} className="px-6 py-8 text-center text-gray-500">لا يوجد بيانات لعرضها</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-tajawal font-bold text-lg text-gray-900 mb-6">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/tests/new" className="p-4 border border-blue-100 bg-blue-50/50 hover:bg-blue-50 rounded-xl flex items-center gap-3 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Beaker className="w-5 h-5" />
              </div>
              <span className="font-tajawal font-bold text-blue-900">إضافة تحليل جديد</span>
            </Link>
            <Link href="/admin/articles/new" className="p-4 border border-green-100 bg-green-50/50 hover:bg-green-50 rounded-xl flex items-center gap-3 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-tajawal font-bold text-green-900">إضافة مقال جديد</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
