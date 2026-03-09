"use client";

import { useRef, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

interface CoverImageUploaderProps {
  name: string;
  defaultValue?: string;
}

export function CoverImageUploader({ name, defaultValue }: CoverImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload-article-image", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حدث خطأ أثناء الرفع");
      } else {
        setImageUrl(data.url);
      }
    } catch {
      setError("تعذّر الاتصال بالخادم، حاول مجدداً");
    } finally {
      setUploading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function clearImage() {
    setImageUrl("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      {/* Hidden field carrying the URL for the server action */}
      <input type="hidden" name={name} value={imageUrl} />

      {imageUrl ? (
        /* ── Preview ── */
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="صورة الغلاف"
            className="w-full h-52 object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-white text-gray-900 font-tajawal font-bold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors shadow"
            >
              <Upload className="w-4 h-4" />
              تغيير الصورة
            </button>
            <button
              type="button"
              onClick={clearImage}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-tajawal font-bold text-sm flex items-center gap-2 hover:bg-red-600 transition-colors shadow"
            >
              <X className="w-4 h-4" />
              حذف
            </button>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          role="button"
          tabIndex={0}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`
            w-full h-52 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all
            ${dragging
              ? "border-primary-light-green bg-secondary-soft-green scale-[1.01]"
              : "border-gray-200 bg-gray-50 hover:border-primary-light-green hover:bg-secondary-soft-green"
            }
            ${uploading ? "cursor-not-allowed opacity-70" : ""}
          `}
        >
          {uploading ? (
            <>
              <Spinner className="w-10 h-10 text-primary-dark-green" />
              <p className="text-sm font-cairo text-gray-500">جارٍ رفع الصورة...</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-primary-dark-green/10 flex items-center justify-center">
                <ImageIcon className="w-7 h-7 text-primary-dark-green" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold font-tajawal text-gray-700">
                  اسحب الصورة هنا أو{" "}
                  <span className="text-primary-dark-green underline underline-offset-2">اضغط للاختيار</span>
                </p>
                <p className="text-xs font-cairo text-gray-400 mt-1">
                  JPG, PNG, WEBP, GIF – الحجم الأقصى 5 ميغابايت
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 font-cairo flex items-center gap-1">
          <X className="w-4 h-4 flex-shrink-0" />
          {error}
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
