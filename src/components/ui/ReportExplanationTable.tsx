interface Indicator {
  indicator: string;
  meaning: string;
  normalRange: string;
}

interface ReportExplanationTableProps {
  indicators: Indicator[];
  explanationText?: string;
}

export function ReportExplanationTable({ indicators, explanationText }: ReportExplanationTableProps) {
  if (!indicators || indicators.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-2xl font-tajawal font-bold text-primary-dark-green mb-6 flex items-center gap-3">
        <span className="w-2 h-8 bg-primary-light-green rounded-full block"></span>
        كيف تقرأ نتيجة التحليل؟
      </h3>

      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <table className="w-full text-right font-cairo">
          <thead>
            <tr className="bg-secondary-soft-green text-primary-dark-green border-b border-gray-100">
              <th className="px-6 py-4 font-bold text-sm">المؤشر</th>
              <th className="px-6 py-4 font-bold text-sm">ماذا يعني</th>
              <th className="px-6 py-4 font-bold text-sm">المعدل الطبيعي</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {indicators.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-900" dir="ltr">
                  <span className="bg-gray-100 px-2 flex-grow-0 py-1 rounded-md">{item.indicator}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 leading-relaxed">
                  {item.meaning}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium" dir="ltr">
                  {item.normalRange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {explanationText && (
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 font-cairo text-sm text-blue-900 leading-relaxed">
          <p>{explanationText}</p>
        </div>
      )}
    </div>
  );
}
