import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Microscope } from "lucide-react";

export function HeroSection() {
  return (
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
  );
}
