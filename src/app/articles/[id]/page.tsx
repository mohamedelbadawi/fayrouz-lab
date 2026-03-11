import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { QRCode } from "@/components/ui/QRCode";
import { Calendar, User, Share2, Facebook, Twitter, Link as LinkIcon, Beaker } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getArticleById, getRelatedTestsForArticle, getRecentArticles } from "@/services/articles.service";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  
  if (!article) return { title: "مقال غير موجود - مختبر الفيروز" };

  return {
    title: article.title,
    description: article.summary || undefined,
    openGraph: {
      title: article.title,
      description: article.summary || undefined,
      images: article.featured_image ? [article.featured_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary || undefined,
      images: article.featured_image ? [article.featured_image] : [],
    }
  };
}

export default async function ArticleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch data concurrently if possible, or sequentially depending on need
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  const linkedTests = await getRelatedTestsForArticle(id);
  const relatedArticles = await getRecentArticles(id, 2);

  const publishDate = new Date(article.publish_date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const articleUrl = `https://elfayrouz-lab.com/articles/${id}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Article Header */}
        <div className="bg-white border-b border-gray-100 pb-16 pt-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="inline-block px-3 py-1 bg-secondary-soft-green text-primary-dark-green text-xs font-tajawal font-bold rounded-full mb-6">
              دليل التحاليل الطبية
            </div>
            
            <h1 className="text-4xl md:text-5xl font-tajawal font-bold text-gray-900 leading-tight mb-8 max-w-4xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-cairo text-gray-500 mb-10 border-b border-gray-100 pb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-light-green" />
                <span>نُشر في: {publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-light-green" />
                <span>بقلم: {article.author}</span>
              </div>
            </div>

            {/* Featured Image */}
            {article.featured_image ? (
              <div className="relative w-full aspect-video rounded-3xl mb-0 overflow-hidden border border-gray-200 max-w-4xl">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full max-w-4xl aspect-video bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 border border-gray-200">
                <span className="font-tajawal font-medium text-lg">صورة المقال الرئيسية</span>
              </div>
            )}
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Article Content */}
            <div className="lg:w-2/3">
              {article.content ? (
                <div
                  className="prose prose-lg max-w-none font-cairo text-gray-700 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:p-3 [&_th]:border [&_th]:border-gray-200 [&_th]:p-3 [&_th]:bg-gray-50 [&_h1]:font-tajawal [&_h2]:font-tajawal [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-tajawal [&_h3]:font-bold [&_h3]:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className="text-gray-400 font-cairo text-center py-10">لا يوجد محتوى لهذا المقال حالياً.</p>
              )}

              {/* Share Buttons */}
              <div className="mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-tajawal font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-gray-400" />
                  شارك هذا المقال
                </h3>
                <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-light-green/10 hover:text-primary-dark-green transition-colors">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-28 space-y-8">

                {/* QR Code */}
                <div className="bg-primary-dark-green/5 border border-primary-light-green/20 rounded-3xl p-8 text-center flex flex-col items-center">
                  <h3 className="font-tajawal font-bold text-xl text-primary-dark-green mb-6">احفظ المقال للرجوع إليه</h3>
                  <QRCode url={articleUrl} label="امسح الكود بكاميرا هاتفك للوصول لهذا المقال" />
                </div>

                {/* Linked Tests */}
                {linkedTests.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-tajawal font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-primary-light-green" />
                      التحاليل المرتبطة بهذا المقال
                    </h3>
                    <div className="space-y-4">
                      {linkedTests.map((test: any) => (
                        <div key={test.id}>
                          <div className="bg-secondary-soft-green rounded-2xl p-5 border border-green-100">
                            <p className="font-tajawal font-bold text-primary-dark-green mb-1">{test.name}</p>
                            <p className="font-cairo text-sm text-gray-600 mb-3">
                              السعر: <strong>{Number(test.price).toLocaleString('ar-EG')} ج.م</strong> · النتيجة خلال: <strong>{test.result_time}</strong>
                            </p>
                            <Link
                              href={`/tests/${test.id}`}
                              className="block w-full text-center px-5 py-2.5 bg-primary-dark-green text-white font-tajawal font-bold rounded-xl hover:bg-[#154618] transition-colors text-sm"
                            >
                              عرض تفاصيل التحليل
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Articles */}
                {relatedArticles && relatedArticles.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-tajawal font-bold text-lg text-gray-900 mb-4">مقالات ذات صلة</h3>
                    <div className="space-y-4">
                      {relatedArticles.map((rel, idx) => (
                        <div key={rel.id}>
                          {idx > 0 && <div className="h-px w-full bg-gray-100 my-4" />}
                          <Link href={`/articles/${rel.id}`} className="block group">
                            <h4 className="font-tajawal font-bold text-gray-900 group-hover:text-primary-light-green transition-colors mb-1 line-clamp-2 text-sm">
                              {rel.title}
                            </h4>
                            <p className="font-cairo text-xs text-gray-500 line-clamp-2">{rel.summary?.replace(/<[^>]*>?/gm, '')}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <Link href="/articles" className="block w-full text-center mt-5 pt-4 border-t border-gray-100 text-primary-dark-green font-tajawal font-bold text-sm hover:text-primary-light-green transition-colors">
                      عرض المزيد من المقالات
                    </Link>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
