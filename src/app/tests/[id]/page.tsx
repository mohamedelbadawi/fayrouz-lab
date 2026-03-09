import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Clock, Beaker, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function TestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: test, error } = await supabase
    .from("tests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !test) {
    notFound();
  }

  const categoryLabel = 
    test.category === 'blood' ? 'أمراض الدم' :
    test.category === 'organs' ? 'وظائف الأعضاء' :
    test.category === 'vitamins' ? 'الفيتامينات' : test.category;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb & Header Box */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-sm font-cairo text-gray-500 mb-6">
              <Link href="/" className="hover:text-primary-dark-green transition-colors">الرئيسية</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tests" className="hover:text-primary-dark-green transition-colors">الفحوصات</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary-dark-green font-medium">{test.name}</span>
            </nav>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-secondary-soft-green text-primary-dark-green text-xs font-tajawal font-bold rounded-full mb-4">
                  {categoryLabel}
                </div>
                <h1 className="text-4xl font-tajawal font-bold text-gray-900 mb-4">{test.name}</h1>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-w-[300px] shrink-0">
                <div className="text-3xl font-tajawal font-bold text-primary-dark-green mb-6 border-b border-gray-200 pb-4">
                  {Number(test.price).toLocaleString('ar-EG')} <span className="text-lg font-normal text-gray-500">ج.م</span>
                </div>
                <div className="space-y-4 font-cairo text-gray-700">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-light-green" />
                    <span>وقت النتيجة: <strong className="font-bold text-gray-900">{test.result_time}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Beaker className="w-5 h-5 text-primary-light-green" />
                    <span>التصنيف: <strong className="font-bold text-gray-900">{categoryLabel}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description (Rich Text) */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {test.description ? (
              <div
                className="prose prose-lg max-w-none font-cairo text-gray-700 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:p-3 [&_th]:border [&_th]:border-gray-200 [&_th]:p-3 [&_th]:bg-gray-50"
                dangerouslySetInnerHTML={{ __html: test.description }}
              />
            ) : (
              <p className="text-gray-400 font-cairo text-center py-10">لا يوجد وصف متاح لهذا الفحص حالياً.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
