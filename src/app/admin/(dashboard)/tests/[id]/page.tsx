import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { TestForm } from "../TestForm";
import { editTestAction } from "@/actions/tests";

export default async function AdminEditTestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: test, error } = await supabase
    .from("tests")
    .select("*")
    .eq("id", id)
    .single();

  const { data: articles } = await supabase.from("articles").select("id, title").is("deleted_at", null);
  const { data: linkedArticlesData } = await supabase.from("article_tests").select("article_id").eq("test_id", id);
  
  const articleOptions = articles?.map(a => ({ value: a.id, label: a.title })) || [];
  const linkedArticles = linkedArticlesData?.map(link => link.article_id) || [];

  if (error || !test) {
    notFound();
  }

  const updateTestAction = editTestAction.bind(null, id);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-cairo text-gray-500 mb-2">
            <Link href="/admin/tests" className="hover:text-primary-dark-green transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4" />
              العودة لإدارة الفحوصات
            </Link>
          </div>
          <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">تعديل الفحص</h1>
          <p className="text-gray-500 font-cairo">تحديث بيانات الفحص الطبي.</p>
        </div>
      </div>

      <TestForm 
        initialData={test} 
        action={updateTestAction} 
        articles={articleOptions} 
        initialLinkedArticles={linkedArticles} 
      />

    </div>
  );
}
