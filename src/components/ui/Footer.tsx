import Link from "next/link";
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export async function Footer() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <footer className="bg-[#0a230c] text-white pt-16 pb-8 border-t-4 border-primary-light-green">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Branding & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-white font-tajawal font-bold text-3xl flex flex-col leading-none">
                <span>مختبر</span>
                <span className="text-primary-light-green">الفيروز</span>
              </div>
            </Link>
            <p className="text-gray-300 font-cairo text-sm leading-relaxed">
              مختبر الفيروز للتحاليل الطبية يقدم أحدث وأدق الفحوصات المخبرية باستخدام تكنولوجيا متطورة لضمان صحتك وصحة عائلتك.
            </p>
            <div className="flex gap-4">
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light-green transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.twitter_url && (
                <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light-green transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light-green transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-tajawal font-bold mb-6 text-primary-light-green">روابط سريعة</h3>
            <ul className="space-y-4 font-cairo">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light-green"></span>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light-green"></span>
                  عن المختبر
                </Link>
              </li>
              <li>
                <Link href="/tests" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light-green"></span>
                  دليل الفحوصات
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light-green"></span>
                  المقالات الطبية
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light-green"></span>
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-tajawal font-bold mb-6 text-primary-light-green">معلومات التواصل</h3>
            <ul className="space-y-4 font-cairo text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-light-green mt-1 flex-shrink-0" />
                <span>{settings?.address || 'العراق'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-light-green flex-shrink-0" />
                <span dir="ltr">{settings?.phone || '+964 000 0000'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-light-green flex-shrink-0" />
                <span>{settings?.email || 'info@elfayrouz-lab.com'}</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-xl font-tajawal font-bold mb-6 text-primary-light-green">ساعات العمل</h3>
            <ul className="space-y-4 font-cairo text-gray-300">
              <li className="flex flex-col gap-2 border-b border-white/10 pb-2">
                <span className="whitespace-pre-wrap leading-relaxed">{settings?.working_hours || 'السبت - الخميس: 8 صباحاً - 10 مساءً'}</span>
              </li>
              <li className="pt-2 text-primary-light-green font-medium">
                متاحون لخدمتكم طوال الأسبوع
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-cairo text-sm text-gray-400">
          <p>© {new Date().getFullYear()} مختبر الفيروز للتحاليل الطبية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
