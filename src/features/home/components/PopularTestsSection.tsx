import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TestCard } from "@/features/tests/components/TestCard";
import { MedicalTest } from "@/types";

interface PopularTestsSectionProps {
  popularTests: MedicalTest[] | null;
}

export function PopularTestsSection({ popularTests }: PopularTestsSectionProps) {
  return (
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
              description={test.description ?? ""}
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
  );
}
