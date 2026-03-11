"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 font-tajawal py-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary-dark-green transition-colors disabled:opacity-50"
        title="السابق"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors ${
            currentPage === page
              ? "bg-primary-dark-green text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary-dark-green transition-colors disabled:opacity-50"
        title="التالي"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    </div>
  );
}
