import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { TestCard } from "@/components/ui/TestCard";
import { FrontTestsFilters } from "@/components/ui/FrontTestsFilters";
import { createClient } from "@/utils/supabase/server";

export default async function TestsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';

  const supabase = await createClient();

  let queryBuilder = supabase
    .from("tests")
    .select("*")
    .is("deleted_at", null)
    .order("name");

  if (q) {
    queryBuilder = queryBuilder.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (category && category !== "all") {
    queryBuilder = queryBuilder.eq("category", category);
  }

  const { data: tests } = await queryBuilder;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          {/* Header Area */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-tajawal font-bold text-gray-900 mb-6">دليل الفحوصات الطبية</h1>
            <p className="text-gray-600 font-cairo text-lg">
              تصفح مجموعتنا الواسعة من التحاليل الطبية المصممة لتلبية كافة احتياجاتك الصحية بأسعار تنافسية ونتائج دقيقة.
            </p>
          </div>

          <FrontTestsFilters />

          {/* Results Info */}
          <div className="mb-6 font-cairo text-gray-600 flex justify-between items-center">
            <p>يتم عرض <span className="font-bold text-gray-900">{tests?.length || 0}</span> فحوصات طبية</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {tests?.map((test) => (
              <TestCard 
                key={test.id}
                id={test.id}
                name={test.name}
                description={test.description}
                category={test.category === 'blood' ? 'أمراض الدم' : test.category === 'organs' ? 'وظائف الأعضاء' : 'فيتامينات'}
                price={test.price}
                resultTime={test.result_time}
              />
            ))}
            {(!tests || tests.length === 0) && (
               <div className="col-span-full py-10 text-center text-gray-500 font-cairo">لا توجد فحوصات مضافة بعد.</div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 font-tajawal hidden">
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
      </main>

      <Footer />
    </div>
  );
}
