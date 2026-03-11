import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { getSiteSettings } from "@/services/settings.service";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-tajawal font-bold text-gray-900 mb-6">تواصل معنا</h1>
            <p className="text-gray-600 font-cairo text-lg max-w-2xl mx-auto">
              فريقنا متواجد دائماً للرد على استفساراتكم وحجز مواعيدكم وتقديم أفضل خدمات الرعاية الصحية المخبرية.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5 group hover:border-primary-light-green transition-colors">
                <div className="w-12 h-12 bg-secondary-soft-green rounded-xl flex items-center justify-center text-primary-dark-green shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-tajawal font-bold text-xl text-gray-900 mb-2">موقعنا</h3>
                  <p className="font-cairo text-gray-600 leading-relaxed text-sm">
                    {settings?.location_address || 'شارع فلسطين، مقابل مستشفى النور، بغداد، العراق'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5 group hover:border-primary-light-green transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-tajawal font-bold text-xl text-gray-900 mb-2">هاتفنا</h3>
                  <p className="font-cairo text-gray-600 leading-relaxed text-sm whitespace-pre-wrap" dir="ltr">
                    {settings?.contact_phone || '+964 780 123 4567'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5 group hover:border-primary-light-green transition-colors">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-tajawal font-bold text-xl text-gray-900 mb-2">البريد الإلكتروني</h3>
                  <p className="font-cairo text-gray-600 leading-relaxed text-sm break-all">
                    {settings?.contact_email || 'info@elfayrouz-lab.com'}
                  </p>
                </div>
              </div>

              <div className="bg-primary-dark-green p-8 rounded-3xl shadow-md text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-primary-light-green" />
                  <h3 className="font-tajawal font-bold text-xl">ساعات العمل</h3>
                </div>
                <ul className="space-y-4 font-cairo text-gray-200">
                  <span className="whitespace-pre-wrap leading-relaxed">
                    {settings?.working_hours}
                  </span>
                </ul>
                <div className="mt-6 pt-4 border-t border-white/10 text-primary-light-green font-medium text-center">
                  متاحون لخدمتكم طوال الأسبوع
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-12 h-full">
                <h2 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">أرسل لنا رسالة</h2>
                <p className="font-cairo text-gray-500 mb-8">سنقوم بالرد عليك في أقرب وقت ممكن بمجرد مراجعة رسالتك.</p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-tajawal font-bold text-sm text-gray-700">الاسم الكامل</label>
                      <input
                        type="text"
                        placeholder="أحمد محمد"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-4 font-cairo transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-tajawal font-bold text-sm text-gray-700">البريد الإلكتروني</label>
                      <input
                        type="email"
                        placeholder="ahmed@example.com"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-4 font-cairo transition-all dir-ltr text-left"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-tajawal font-bold text-sm text-gray-700">رقم الهاتف</label>
                    <input
                      type="tel"
                      placeholder="07XX XXX XXXX"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-4 font-cairo transition-all dir-ltr text-left"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-tajawal font-bold text-sm text-gray-700">الرسالة أو الاستفسار</label>
                    <textarea
                      placeholder="كيف يمكننا مساعدتك؟"
                      rows={5}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-4 font-cairo transition-all resize-y"
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-primary-dark-green hover:bg-[#154618] text-white font-tajawal font-bold text-lg p-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5 ltr:rotate-180" />
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 h-[400px] relative overflow-hidden">
            {settings?.location_map_url ? (
              <iframe
                src={settings.location_map_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 rounded-2xl w-full h-full"
              ></iframe>
            ) : (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
                <span className="font-tajawal font-medium text-xl">خريطة جوجل للموقع الطبي</span>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
