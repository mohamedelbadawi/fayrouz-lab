"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

export function TestsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for the search input so it updates immediately
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  // Debounce the search term to avoid spamming the URL
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      createQueryString("q", searchTerm);
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Update query params function
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="البحث باسم الفحص أو الوصف..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-1 focus:ring-primary-light-green focus:border-primary-light-green block pr-10 p-3 font-cairo"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-4 w-full md:w-auto">
        <select 
          defaultValue={searchParams.get("category") || ""}
          onChange={(e) => createQueryString("category", e.target.value)}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-1 focus:ring-primary-light-green focus:border-primary-light-green block p-3 font-cairo w-full md:w-48 appearance-none"
        >
          <option value="">جميع التصنيفات</option>
          <option value="blood">أمراض الدم</option>
          <option value="organs">وظائف الأعضاء</option>
          <option value="vitamins">الفيتامينات</option>
        </select>
        <button 
          type="button"
          onClick={() => {
            setSearchTerm("");
            router.push(pathname); // Clear all filters
          }}
          className="bg-gray-50 text-gray-600 p-3 rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-red-500 transition-colors shrink-0 outline-none focus:ring-2 focus:ring-gray-200"
          title="مسح التصفية"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
