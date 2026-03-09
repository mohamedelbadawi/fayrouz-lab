import Link from "next/link";
import { Clock, Beaker, ChevronLeft } from "lucide-react";

interface TestCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  resultTime: string;
  category: string;
}

export function TestCard({ id, name, description, price, resultTime, category }: TestCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full group">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-secondary-soft-green text-primary-dark-green text-xs font-tajawal font-bold rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-tajawal font-bold text-gray-900 mb-2 group-hover:text-primary-light-green transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 font-cairo line-clamp-2 text-sm mb-6">
          {description?.replace(/<[^>]*>?/gm, '')}
        </p>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 mb-6 font-cairo text-sm text-gray-600 border-t border-gray-50 pt-4">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-primary-light-green" />
          <span>{resultTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Beaker className="w-4 h-4 text-primary-light-green" />
          <span>عينة دم</span>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="flex items-center justify-between mt-auto">
        <div className="text-primary-dark-green font-tajawal font-bold text-lg">
          {price} <span className="text-sm font-normal">ج.م</span>
        </div>
        <Link 
          href={`/tests/${id}`}
          className="flex items-center gap-1 text-primary-light-green font-tajawal font-medium text-sm group-hover:gap-2 transition-all mr-auto"
        >
          التفاصيل
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
