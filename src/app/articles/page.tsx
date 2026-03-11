import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { ArticlesFilters } from "@/features/articles/components/ArticlesFilters";
import { getArticles } from "@/services/articles.service";
import { Pagination } from "@/components/ui/Pagination";

export default async function ArticlesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const dateStr = typeof resolvedParams.date === 'string' ? resolvedParams.date : '';
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const pageSize = 9;

  const { data: articles, totalCount } = await getArticles({ query: q, dateStr, page, pageSize });
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-tajawal font-bold text-gray-900 mb-6">المدونة الطبية والتثقيف الصحي</h1>
            <p className="text-gray-600 font-cairo text-lg">
              مقالات طبية موثوقة ونبذات تعريفية حول أهم الفحوصات الطبية لمساعدتك في فهم لغة التحاليل والحفاظ على صحتك.
            </p>
          </div>

          <div className="mb-12">
            <ArticlesFilters />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles?.map((article) => (
              <ArticleCard 
                key={article.id}
                id={article.id}
                title={article.title}
                summary={article.summary ?? ""}
                publishDate={new Date(article.publish_date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                author={article.author ?? ""}
                imageUrl={article.featured_image ?? undefined}
              />
            ))}
            {(!articles || articles.length === 0) && (
               <div className="col-span-full py-10 text-center text-gray-500 font-cairo">لا توجد مقالات مضافة بعد.</div>
            )}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
