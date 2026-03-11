import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Spinner className="w-12 h-12 text-primary-dark-green" />
      <p className="text-gray-500 font-cairo animate-pulse">جاري التحميل...</p>
    </div>
  );
}
