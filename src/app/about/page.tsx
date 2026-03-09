import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Award, ShieldCheck, Microscope, Users, Target, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Area */}
        <section className="bg-secondary-soft-green/50 py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
            <div className="inline-block px-4 py-1.5 bg-primary-light-green/20 text-primary-dark-green rounded-full font-tajawal font-bold text-sm mb-6">
              من نحن
            </div>
            <h1 className="text-5xl lg:text-6xl font-tajawal font-bold text-primary-dark-green mb-8">
              مختبر الفيروز للتحاليل الطبية
            </h1>
            <p className="text-xl text-gray-700 font-cairo leading-relaxed max-w-3xl mx-auto">
              تأسس مختبر الفيروز ليكون صرحاً طبياً يعتمد عليه في التشخيص المخبري، من خلال الالتزام المطلق بأعلى معايير الجودة العالمية وتبني أحدث التقنيات التكنولوجية في مجال التحليلات المرضية.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-light-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-dark-green/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />
        </section>

        {/* Mission & Vision */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-3 h-full bg-primary-light-green transform origin-top transition-transform group-hover:scale-y-100"></div>
                <div className="w-16 h-16 bg-secondary-soft-green rounded-2xl flex items-center justify-center text-primary-dark-green mb-8">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-tajawal font-bold text-gray-900 mb-6">رؤيتنا</h2>
                <p className="text-gray-600 font-cairo text-lg leading-relaxed">
                  أن نكون المختبر الطبي الرائد والخيار الأول والأنسب للمرضى والأطباء في العراق، من خلال تقديم خدمات مخبرية تشخيصية موثوقة ذات جودة فائقة تتماشى مع أعلى المواصفات والمعايير العالمية.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-3 h-full bg-primary-dark-green transform origin-top transition-transform group-hover:scale-y-100"></div>
                <div className="w-16 h-16 bg-secondary-soft-green rounded-2xl flex items-center justify-center text-primary-dark-green mb-8">
                  <Heart className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-tajawal font-bold text-gray-900 mb-6">رسالتنا</h2>
                <p className="text-gray-600 font-cairo text-lg leading-relaxed">
                  الارتقاء بمستوى الرعاية الصحية للمجتمع عبر توفير نتائج تحاليل عالية الدقة، وفي وقت قياسي، بالاستعانة بطاقم طبي عالي التأهيل والكفاءة وبوجود أحدث الأجهزة والمعدات التكنولوجية المتطورة.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Values / Certifications */}
        <section className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-tajawal font-bold text-gray-900 mb-6">قيمنا الأساسية واهتماماتنا</h2>
              <p className="text-gray-600 font-cairo text-lg max-w-2xl mx-auto">تشكل قيمنا الجوهرية أساس عملنا اليومي وطريقة تعاملنا مع المراجعين.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 text-primary-dark-green">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-tajawal font-bold text-gray-900 mb-3">الدقة والموثوقية</h3>
                <p className="text-gray-500 font-cairo text-sm text-balance">نلتزم بتطبيق برامج صارمة لضبط الجودة الداخلية والخارجية.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-tajawal font-bold text-gray-900 mb-3">النزاهة والأمانة</h3>
                <p className="text-gray-500 font-cairo text-sm text-balance">السرية التامة لجميع معلومات ونتائج المراجعين وحفظ الخصوصية.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-600">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-tajawal font-bold text-gray-900 mb-3">الاهتمام بالمريض</h3>
                <p className="text-gray-500 font-cairo text-sm text-balance">وضع المريض وراحته في مقدمة أولويات جميع أفراد طاقمنا.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-600">
                  <Microscope className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-tajawal font-bold text-gray-900 mb-3">التطور المستمر</h3>
                <p className="text-gray-500 font-cairo text-sm text-balance">التحديث الدائم للتقنيات وتطوير مهارات العاملين بشكل دوري.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
