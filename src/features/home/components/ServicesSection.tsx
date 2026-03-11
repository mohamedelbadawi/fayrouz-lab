import { ShieldCheck, Clock, User } from "lucide-react";

export function ServicesSection() {
  return (
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
  );
}
