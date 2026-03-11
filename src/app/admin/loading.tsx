import { Spinner } from "@/components/ui/Spinner";

export default function AdminLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-gray-50/50 rounded-2xl border border-gray-100">
      <Spinner className="w-10 h-10 text-primary-dark-green" />
      <p className="text-gray-500 font-cairo animate-pulse">جاري تحميل لوحة التحكم...</p>
    </div>
  );
}
