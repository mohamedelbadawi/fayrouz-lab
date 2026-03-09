import Link from "next/link";
import { Calendar, ChevronLeft, User } from "lucide-react";
import Image from "next/image";

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  author: string;
  imageUrl?: string;
}

export function ArticleCard({ id, title, summary, publishDate, author, imageUrl }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full group">
      {/* Image Area */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <span className="font-tajawal font-medium">صورة المقال</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs font-cairo text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary-light-green" />
            <span>{publishDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary-light-green" />
            <span>{author}</span>
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="font-tajawal font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-light-green transition-colors">
          {title}
        </h3>
        <p className="font-cairo text-sm text-gray-600 mb-6 line-clamp-3">
          {summary?.replace(/<[^>]*>?/gm, '')}
        </p>

        {/* Action */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <Link 
            href={`/articles/${id}`}
            className="flex items-center gap-1 text-primary-dark-green font-tajawal font-bold text-sm group-hover:gap-2 transition-all group-hover:text-primary-light-green"
          >
            اقرأ المزيد
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
