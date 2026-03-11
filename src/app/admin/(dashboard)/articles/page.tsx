import { Plus, Edit2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/services/articles.service";
import { DeleteConfirmDialog } from "@/components/ui/DeleteConfirmDialog";
import { RestoreConfirmDialog } from "@/components/ui/RestoreConfirmDialog";
import { ArticlesFilters } from "@/features/articles/components/ArticlesFilters";
import { deleteArticleAction, restoreArticleAction } from "@/actions/articles";

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; date?: string }>;
}) {
  const { q, date } = await searchParams;
  
  const { data: articles } = await getArticles({ query: q, dateStr: date, includeDeleted: true });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">إدارة المقالات</h1>
          <p className="text-gray-500 font-cairo">إضافة، تعديل، وحذف المقالات الطبية في المدونة التثقيفية.</p>
        </div>
        
        <Link 
          href="/admin/articles/new" 
          className="bg-primary-dark-green text-white font-tajawal font-bold px-6 py-3 rounded-xl hover:bg-[#154618] transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          إضافة مقال جديد
        </Link>
      </div>

      {/* Filters Bar */}
      <ArticlesFilters />

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <div key={article.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
            <div className="relative h-48 bg-gray-100">
               {article.featured_image ? (
                 <Image src={article.featured_image} alt={article.title} fill className="object-cover" />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                   <span className="font-tajawal text-sm font-medium">صورة الغلاف</span>
                 </div>
               )}
               {/* Overlay actions */}
               <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Link href={`/articles/${article.id}`} target="_blank" className="w-8 h-8 rounded-full bg-white/90 text-gray-600 flex items-center justify-center hover:bg-white shadow" title="عرض في الموقع">
                   <Eye className="w-4 h-4" />
                 </Link>
                 <Link href={`/admin/articles/${article.id}`} className="w-8 h-8 rounded-full bg-white/90 text-blue-600 flex items-center justify-center hover:bg-white shadow" title="تعديل">
                   <Edit2 className="w-4 h-4" />
                 </Link>
                 {article.deleted_at ? (
                   <RestoreConfirmDialog
                     id={article.id}
                     name={article.title}
                     action={restoreArticleAction}
                     triggerClassName="w-8 h-8 rounded-full bg-white/90 text-blue-600 flex items-center justify-center hover:bg-white shadow"
                   />
                 ) : (
                   <DeleteConfirmDialog
                     id={article.id}
                     name={article.title}
                     action={deleteArticleAction}
                     triggerClassName="w-8 h-8 rounded-full bg-white/90 text-red-600 flex items-center justify-center hover:bg-white shadow"
                   />
                 )}
               </div>
            </div>
            <div className={`p-5 flex-1 flex flex-col ${article.deleted_at ? 'opacity-60 bg-gray-50' : ''}`}>
              <div className="flex justify-between items-center mb-3 text-xs font-cairo text-gray-500">
                <span>{new Date(article.publish_date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric'})}</span>
                {article.deleted_at ? (
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded-lg font-bold">محذوف</span>
                ) : (
                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded-lg font-bold">منشور</span>
                )}
              </div>
              <h3 className="font-tajawal font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm font-cairo text-gray-600">
                <span>الكاتب: {article.author}</span>
                <span className="text-primary-light-green">-- مشاهدة</span>
              </div>
            </div>
          </div>
        ))}
        {(!articles || articles.length === 0) && (
           <div className="col-span-full py-10 text-center text-gray-500 font-cairo">لا توجد مقالات مضافة بعد.</div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 font-tajawal mt-8 hidden">
        <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary-dark-green transition-colors disabled:opacity-50" disabled>
          السابق
        </button>
        <button className="w-10 h-10 rounded-xl bg-primary-dark-green text-white flex items-center justify-center font-bold">
          1
        </button>
        <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary-dark-green transition-colors">
          التالي
        </button>
      </div>
    
    </div>
  );
}
