import { Plus, Edit2, Eye } from "lucide-react";
import Link from "next/link";
import { getTests } from "@/services/tests.service";
import { DeleteConfirmDialog } from "@/components/ui/DeleteConfirmDialog";
import { RestoreConfirmDialog } from "@/components/ui/RestoreConfirmDialog";
import { TestsFilters } from "@/features/tests/components/TestsFilters";
import { deleteTestAction, restoreTestAction } from "@/actions/tests";

export default async function AdminTestsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  
  const { data: tests } = await getTests({ query: q, category, includeDeleted: true });

  // Helper to safely strip HTML tags
  const stripHtml = (html: string | null) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">إدارة الفحوصات</h1>
          <p className="text-gray-500 font-cairo">إضافة، تعديل، وحذف التحاليل الطبية المتاحة في المختبر.</p>
        </div>
        
        <Link 
          href="/admin/tests/new" 
          className="bg-primary-dark-green text-white font-tajawal font-bold px-6 py-3 rounded-xl hover:bg-[#154618] transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          إضافة فحص جديد
        </Link>
      </div>

      {/* Filters Bar */}
      <TestsFilters />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right font-cairo">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 font-tajawal text-sm">
              <tr>
                <th className="px-6 py-4 font-bold">اسم الفحص</th>
                <th className="px-6 py-4 font-bold">التصنيف</th>
                <th className="px-6 py-4 font-bold">السعر</th>
                <th className="px-6 py-4 font-bold">وقت النتيجة</th>
                <th className="px-6 py-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {tests?.map((test) => (
                <tr key={test.id} className={`transition-colors ${test.deleted_at ? 'bg-gray-50/80 opacity-60' : 'hover:bg-gray-50/50'}`}>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 mb-1">
                      {test.name}
                      {test.deleted_at && (
                        <span className="mr-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">محذوف</span>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs truncate max-w-[250px]" title={stripHtml(test.description)}>
                      {stripHtml(test.description)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {test.category === 'blood' ? 'أمراض الدم' : test.category === 'organs' ? 'وظائف الأعضاء' : 'فيتامينات'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary-dark-green">{test.price} ج.م</td>
                  <td className="px-6 py-4 text-gray-600">{test.result_time}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link href={`/tests/${test.id}`} target="_blank" className="text-gray-400 hover:text-gray-600 transition-colors" title="عرض في الموقع">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/tests/${test.id}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="تعديل">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      {test.deleted_at ? (
                        <RestoreConfirmDialog
                          id={test.id}
                          name={test.name}
                          action={restoreTestAction}
                          triggerClassName="text-gray-400 hover:text-blue-600 transition-colors"
                        />
                      ) : (
                        <DeleteConfirmDialog
                          id={test.id}
                          name={test.name}
                          action={deleteTestAction}
                          triggerClassName="text-gray-400 hover:text-red-600 transition-colors"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {(!tests || tests.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">لا توجد فحوصات مضافة بعد.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder info */}
        <div className="p-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 font-cairo">
          <span>عرض {tests?.length || 0} فحص</span>
        </div>
      </div>
    
    </div>
  );
}
