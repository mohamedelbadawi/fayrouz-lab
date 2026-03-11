"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-tajawal font-bold text-gray-900">عذرًا، حدث خطأ غير متوقع</h2>
        <p className="text-gray-500 font-cairo max-w-md mx-auto">
          نعتذر عن هذا الخلل. لقد حدث خطأ أثناء معالجة طلبك المنشود. يرجى المحاولة مرة أخرى لاحقًا.
        </p>
      </div>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl bg-primary-dark-green text-white font-tajawal font-bold hover:bg-[#154618] transition-all flex items-center gap-2 shadow-sm"
      >
        <RefreshCcw className="w-4 h-4" />
        حاول مرة أخرى
      </button>
    </div>
  );
}
