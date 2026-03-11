"use client";

import { useTransition } from "react";
import { revalidateAllAction } from "@/actions/users";
import toast from "react-hot-toast";
import { RefreshCcw } from "lucide-react";

export function RefreshCacheButton() {
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      const result = await revalidateAllAction();
      if (result.success) {
        toast.success("تم تحديث البيانات العلنية بنجاح!");
      } else {
        toast.error(result.error || "حدث خطأ أثناء التحديث");
      }
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="p-4 border border-orange-100 bg-orange-50/50 hover:bg-orange-50 rounded-xl flex items-center gap-3 transition-colors group disabled:opacity-50"
      title="تحديث البيانات المعروضة للجمهور"
    >
      <div className={`w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 ${isPending ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}>
        <RefreshCcw className="w-5 h-5" />
      </div>
      <div className="text-right">
        <span className="block font-tajawal font-bold text-orange-900">تحديث الكاش العام</span>
        <span className="block text-[10px] font-cairo text-orange-600/70">تحديث البيانات للجمهور</span>
      </div>
    </button>
  );
}
