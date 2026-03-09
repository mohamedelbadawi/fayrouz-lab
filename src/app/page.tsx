import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { TestCard } from "@/components/ui/TestCard";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { ChevronLeft, ArrowLeft, HeartPulse, Microscope, ShieldCheck, Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch top 4 tests
  const { data: popularTests } = await supabase
    .from("tests")
    .select("*")
    .limit(4);

  // Fetch 3 recent articles
  const { data: latestArticles } = await supabase
    .from("articles")
    .select("*")
    .order("publish_date", { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-secondary-soft-green/50 -z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-light-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-right">
              <span className="inline-block px-4 py-1.5 bg-primary-light-green/10 text-primary-dark-green rounded-full font-tajawal font-bold text-sm mb-6">
                صحتك هي أولويتنا
              </span>
              <h1 className="text-5xl lg:text-7xl font-tajawal font-bold text-gray-900 leading-tight mb-8">
                أدق الفحوصات <br />
                <span className="text-primary-dark-green relative">
                  لصحة أفضل
                  <svg className="absolute w-full h-3 -bottom-1 right-0 text-primary-light-green/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-gray-600 font-cairo leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                مختبر الفيروز للتحاليل الطبية يقدم أحدث وأدق الفحوصات المخبرية باستخدام تكنولوجيا متطورة لضمان تشخيص دقيق يساهم في رحلة علاجك.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/tests"
                  className="w-full sm:w-auto px-8 py-4 bg-primary-dark-green hover:bg-[#154618] text-white rounded-xl font-tajawal font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  تصفح الفحوصات
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-primary-dark-green/10 hover:border-primary-dark-green text-primary-dark-green rounded-xl font-tajawal font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 relative w-full aspect-square md:aspect-video lg:aspect-square">
              {/* Background Image Container */}
              <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex items-center justify-center">
                <Image
                  src="/image.png"
                  alt="مختبر الفيروز"
                  fill
                  priority
                  className="object-cover  scale-[1.1] lg:scale-[1.1]"
                />
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -left-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce z-10" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-primary-dark-green">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-tajawal font-bold text-gray-900">دقة متناهية</div>
                  <div className="text-xs font-cairo text-gray-500">نتائج موثوقة %100</div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce z-10" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-tajawal font-bold text-gray-900">أحدث التقنيات</div>
                  <div className="text-xs font-cairo text-gray-500">أجهزة متطورة عالمياً</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-tajawal font-bold text-gray-900 mb-6">لماذا تختار مختبر الفيروز؟</h2>
            <p className="text-gray-600 font-cairo text-lg">نحن نلتزم بتقديم أعلى المعايير الطبية العالمية لضمان حصولك على نتائج دقيقة في أسرع وقت ممكن.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-primary-light-green transition-colors group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-primary-dark-green group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-tajawal font-bold text-gray-900 mb-4">دقة وجودة عالية</h3>
              <p className="text-gray-600 font-cairo leading-relaxed">نستخدم أحدث الأجهزة المخبرية التقنية التي تضمن لك الحصول على نتائج دقيقة وخالية من الأخطاء.</p>
            </div>

            <div className="p-8 rounded-3xl bg-secondary-soft-green border border-green-100 hover:border-primary-light-green transition-colors group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-primary-dark-green group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-tajawal font-bold text-gray-900 mb-4">سرعة الإنجاز</h3>
              <p className="text-gray-600 font-cairo leading-relaxed">نقدر وقتك الثمين، لذا نحرص على تسليم نتائج تحاليلك في وقت قياسي دون المساومة على الجودة.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-primary-light-green transition-colors group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-primary-dark-green group-hover:scale-110 transition-transform">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-tajawal font-bold text-gray-900 mb-4">كادر متخصص</h3>
              <p className="text-gray-600 font-cairo leading-relaxed">يضم مختبرنا نخبة من الأطباء والمتخصصين ذوي الخبرة العالية في مجال التحاليل الطبية.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tests Overview */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-tajawal font-bold text-gray-900 mb-6">الفحوصات الأكثر طلباً</h2>
              <p className="text-gray-600 font-cairo text-lg">تعرف على مجموعة من أهم وأكثر التحاليل الطبية التي يتم إجراؤها في مختبرنا.</p>
            </div>
            <Link
              href="/tests"
              className="flex items-center gap-2 text-primary-dark-green font-tajawal font-bold hover:text-primary-light-green transition-colors"
            >
              عرض جميع الفحوصات
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTests?.map((test) => (
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
            {(!popularTests || popularTests.length === 0) && (
              <div className="col-span-full py-10 text-center text-gray-500 font-cairo">لا توجد فحوصات مضافة بعد.</div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Articles */}
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
                summary={article.summary}
                publishDate={new Date(article.publish_date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                author={article.author}
                imageUrl={article.featured_image}
              />
            ))}
            {(!latestArticles || latestArticles.length === 0) && (
              <div className="col-span-full py-10 text-center text-gray-500 font-cairo">لا توجد مقالات مضافة بعد.</div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
