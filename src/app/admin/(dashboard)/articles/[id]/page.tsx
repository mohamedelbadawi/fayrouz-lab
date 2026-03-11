import { ArrowRight, Save } from "lucide-react";
import { CoverImageUploader } from "@/components/ui/CoverImageUploader";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { editArticleAction } from "@/actions/articles";
import { MultiSelect } from "@/components/ui/MultiSelect";

export default async function AdminEditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  const { data: tests } = await supabase.from("tests").select("id, name").is("deleted_at", null);
  const { data: linkedTestsData } = await supabase.from("article_tests").select("test_id").eq("article_id", id);
  
  const testOptions = tests?.map(t => ({ value: t.id, label: t.name })) || [];
  const linkedTests = linkedTestsData?.map(link => link.test_id) || [];

  if (error || !article) {
    notFound();
  }

  const updateArticleAction = editArticleAction.bind(null, id);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-cairo text-gray-500 mb-2">
            <Link href="/admin/articles" className="hover:text-primary-dark-green transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4" />
              العودة لإدارة المقالات
            </Link>
          </div>
          <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">تعديل المقال</h1>
          <p className="text-gray-500 font-cairo">تحديث بيانات ومحتوى المقال.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <form action={updateArticleAction as (formData: FormData) => void} className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="block text-sm font-bold font-tajawal text-gray-900">عنوان المقال</label>
              <input 
                type="text" 
                id="title" 
                name="title"
                defaultValue={article.title}
                required
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="summary" className="block text-sm font-bold font-tajawal text-gray-900">نبذة مختصرة (ملخص)</label>
              <textarea 
                id="summary" 
                name="summary" 
                defaultValue={article.summary}
                rows={3}
                required
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all"
              ></textarea>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="content" className="block text-sm font-bold font-tajawal text-gray-900">محتوى المقال الكامل</label>
              <RichTextEditor 
                name="content" 
                defaultValue={article.content}
                placeholder="أدخل محتوى المقال هنا، يمكنك إضافة نصوص، صور، وجداول وتنسيقها..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-bold font-tajawal text-gray-900">اسم الكاتب</label>
              <input 
                type="text" 
                id="author" 
                name="author" 
                defaultValue={article.author}
                required
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold font-tajawal text-gray-900">التحاليل المرتبطة بالمقال</label>
              <MultiSelect
                name="linked_tests"
                options={testOptions}
                defaultValue={linkedTests}
                placeholder="اختر التحاليل المرتبطة..."
              />
              <p className="text-xs text-gray-500 font-cairo mt-1">
                يمكنك اختيار أكثر من فحص ليظهر في صفحة المقال.
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold font-tajawal text-gray-900">صورة الغلاف</label>
              <CoverImageUploader name="featured_image" defaultValue={article.featured_image || ''} />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              href="/admin/articles" 
              className="px-6 py-3 rounded-xl bg-gray-50 text-gray-700 font-tajawal font-bold hover:bg-gray-100 transition-colors"
            >
              إلغاء
            </Link>
            <button 
              type="submit" 
              className="px-8 py-3 rounded-xl bg-primary-dark-green text-white font-tajawal font-bold hover:bg-[#154618] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="w-5 h-5" />
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
