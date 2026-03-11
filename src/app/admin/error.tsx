"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Error Caught:", error);
  }, [error]);

  return (
    <div className="p-8 bg-white rounded-2xl border border-red-100 shadow-sm flex flex-col items-center justify-center text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-tajawal font-bold text-gray-900">خطأ في لوحة التحكم</h2>
        <p className="text-gray-500 font-cairo max-w-sm mx-auto text-sm">
          لم نتمكن من عرض هذه الصفحة أو جلب البيانات. يرجى المحاولة مرة أخرى أو مراجعة الاتصال.
        </p>
      </div>
      <button
        onClick={reset}
        className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-tajawal font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
      >
        <RefreshCcw className="w-4 h-4" />
        إعادة التحميل
      </button>
    </div>
  );
}
