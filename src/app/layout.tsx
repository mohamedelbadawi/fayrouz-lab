import type { Metadata } from "next";
import { Cairo, Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "مختبر الفيروز للتحاليل الطبية | El Fayrouz Lab",
    template: "%s | مختبر الفيروز",
  },
  description: "المختبر الرائد للتحاليل الطبية، دقة وسرعة في النتائج. نقدم كافة أنواع الفحوصات الطبية بأحدث التقنيات.",
  keywords: ["تحاليل طبية", "مختبر الفيروز", "تحليل دم", "فحوصات شاملة", "معمل تحاليل"],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "مختبر الفيروز",
    title: "مختبر الفيروز للتحاليل الطبية",
    description: "المختبر الرائد للتحاليل الطبية، دقة وسرعة في النتائج. نقدم كافة أنواع الفحوصات الطبية بأحدث التقنيات.",
  },
  twitter: {
    card: "summary_large_image",
    title: "مختبر الفيروز للتحاليل الطبية",
    description: "المختبر الرائد للتحاليل الطبية، دقة وسرعة في النتائج.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${tajawal.variable} ${plexArabic.variable} antialiased font-sans`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
