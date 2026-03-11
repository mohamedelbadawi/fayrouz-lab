import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TestForm } from "../TestForm";
import { addTestAction } from "@/actions/tests";
import { createClient } from "@/utils/supabase/server";

export default async function AdminNewTestPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from("articles").select("id, title").is("deleted_at", null);
  
  const articleOptions = articles?.map(a => ({ value: a.id, label: a.title })) || [];
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
          <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">إضافة فحص جديد</h1>
          <p className="text-gray-500 font-cairo">أدخل بيانات الفحص الطبي لإضافته إلى الدليل.</p>
        </div>
      </div>

      <TestForm action={addTestAction} articles={articleOptions} />
    </div>
  );
}
