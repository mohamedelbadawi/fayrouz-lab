import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { Article } from "@/types";

interface EducationalArticlesSectionProps {
  latestArticles: Article[] | null;
}

export function EducationalArticlesSection({ latestArticles }: EducationalArticlesSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-tajawal font-bold text-gray-900 mb-6">ثقف نفسك طبياً</h2>
            <p className="text-gray-600 font-cairo text-lg">مجموعة من المقالات والنصائح الطبية لمساعدتك في فهم لغة التحاليل والحفاظ على صحتك.</p>
          </div>
          <Link
            href="/articles"
            className="flex items-center gap-2 text-primary-dark-green font-tajawal font-bold hover:text-primary-light-green transition-colors"
          >
            تصفح المدونة الطبية
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles?.map((article) => (
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
          {(!latestArticles || latestArticles.length === 0) && (
            <div className="col-span-full py-10 text-center text-gray-500 font-cairo">لا توجد مقالات مضافة بعد.</div>
          )}
        </div>
      </div>
    </section>
  );
}
