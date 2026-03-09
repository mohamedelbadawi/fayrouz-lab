"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

export function FrontTestsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const currentCategory = searchParams.get("category") || "all";

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      createQueryString("q", searchTerm);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between">
      <div className="relative w-full lg:w-1/2">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          placeholder="ابحث عن اسم الفحص أو الرمز الطبي..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary-light-green focus:border-primary-light-green block pr-12 p-4 font-cairo transition-all"
        />
      </div>
      
      <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
        <button 
          onClick={() => createQueryString("category", "all")}
          className={`whitespace-nowrap flex items-center gap-2 px-6 py-3 font-tajawal rounded-xl transition-colors shrink-0 ${
            currentCategory === "all" 
              ? "bg-secondary-soft-green text-primary-dark-green font-bold border-2 border-primary-light-green/20" 
              : "bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium border border-gray-200"
          }`}
        >
          <Filter className="w-4 h-4" />
          الكل
        </button>
        <button 
          onClick={() => createQueryString("category", "blood")}
          className={`whitespace-nowrap px-6 py-3 font-tajawal rounded-xl transition-colors shrink-0 ${
            currentCategory === "blood" 
              ? "bg-secondary-soft-green text-primary-dark-green font-bold border-2 border-primary-light-green/20" 
              : "bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium border border-gray-200"
          }`}
        >
          أمراض الدم
        </button>
        <button 
          onClick={() => createQueryString("category", "organs")}
          className={`whitespace-nowrap px-6 py-3 font-tajawal rounded-xl transition-colors shrink-0 ${
            currentCategory === "organs" 
              ? "bg-secondary-soft-green text-primary-dark-green font-bold border-2 border-primary-light-green/20" 
              : "bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium border border-gray-200"
          }`}
        >
          وظائف الأعضاء
        </button>
        <button 
          onClick={() => createQueryString("category", "vitamins")}
          className={`whitespace-nowrap px-6 py-3 font-tajawal rounded-xl transition-colors shrink-0 ${
            currentCategory === "vitamins" 
              ? "bg-secondary-soft-green text-primary-dark-green font-bold border-2 border-primary-light-green/20" 
              : "bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium border border-gray-200"
          }`}
        >
          الفيتامينات
        </button>
      </div>
    </div>
  );
}
