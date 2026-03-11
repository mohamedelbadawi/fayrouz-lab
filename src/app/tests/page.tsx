import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { TestCard } from "@/features/tests/components/TestCard";
import { FrontTestsFilters } from "@/features/tests/components/FrontTestsFilters";
import { getTests } from "@/services/tests.service";
import { Pagination } from "@/components/ui/Pagination";

export default async function TestsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const pageSize = 12;

  const { data: tests, totalCount } = await getTests({ query: q, category, page, pageSize });
  const totalPages = Math.ceil(totalCount / pageSize);

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
                description={test.description ?? ""}
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
          <Pagination currentPage={page} totalPages={totalPages} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
