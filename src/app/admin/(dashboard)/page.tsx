import { Users, FileText, Beaker, TrendingUp, Clock, ArrowLeft, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { RefreshCacheButton } from "./RefreshCacheButton";

export default async function AdminDashboardPage() {
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

  // Get exact counts
  const { count: testsCount } = await supabase
    .from("tests")
    .select("*", { count: "exact", head: true });

  const { count: articlesCount } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  // Get 5 latest tests ordered by creation date
  const { data: recentTests } = await supabase
    .from("tests")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(5);

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
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Beaker className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-tajawal font-bold text-lg text-gray-900">أحدث التحاليل المضافة</h2>
            </div>
            <Link href="/admin/tests" className="text-sm font-tajawal text-primary-light-green hover:text-primary-dark-green flex items-center gap-1 transition-colors">
              عرض الكل
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {(!recentTests || recentTests.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Beaker className="w-7 h-7 text-gray-400" />
              </div>
              <p className="font-tajawal font-bold text-gray-700 mb-1">لا تحاليل بعد</p>
              <p className="text-sm text-gray-400 font-cairo mb-5">لم تنشئ أي تحليل طبي حتى الآن</p>
              <Link
                href="/admin/tests/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-dark-green text-white font-tajawal font-bold rounded-xl hover:bg-[#154618] transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                إضافة أول تحليل
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentTests.map((test) => {
                const categoryMap: Record<string, { label: string; color: string }> = {
                  blood: { label: 'أمراض الدم', color: 'bg-red-50 text-red-700' },
                  organs: { label: 'وظائف الأعضاء', color: 'bg-orange-50 text-orange-700' },
                  vitamins: { label: 'فيتامينات', color: 'bg-yellow-50 text-yellow-700' },
                };
                const cat = categoryMap[test.category] ?? { label: test.category, color: 'bg-gray-50 text-gray-700' };
                const addedDate = test.created_at ? new Date(test.created_at).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }) : '';

                return (
                  <li key={test.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Beaker className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-tajawal font-bold text-gray-900 truncate">{test.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`inline-block text-xs font-cairo px-2 py-0.5 rounded-full ${cat.color}`}>{cat.label}</span>
                        <span className="flex items-center gap-1 text-xs font-cairo text-gray-400">
                          <Clock className="w-3 h-3" />
                          {test.result_time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="font-tajawal font-bold text-primary-dark-green">{Number(test.price).toLocaleString('ar-EG')} ج.م</p>
                        {addedDate && <p className="text-xs font-cairo text-gray-400">{addedDate}</p>}
                      </div>
                      <Link
                        href={`/admin/tests/${test.id}`}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-dark-green hover:text-white"
                        title="تعديل"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
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
            <Link href="/admin/articles/new" className="p-4 border border-green-100 bg-green-50/50 hover:bg-green-50 rounded-xl flex items-center gap-3 transition-colors group text-right">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-tajawal font-bold text-green-900">إضافة مقال جديد</span>
            </Link>
            {isSuperAdmin && <RefreshCacheButton />}
          </div>
        </div>
      </div>
    </div>
  );
}
