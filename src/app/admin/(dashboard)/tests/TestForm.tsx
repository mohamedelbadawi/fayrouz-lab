"use client";

import { Save } from "lucide-react";
import Link from "next/link";
import { useTransition, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Spinner } from "@/components/ui/Spinner";
import { MultiSelect, Option } from "@/components/ui/MultiSelect";

type ActionResponse = { error?: string; success?: boolean };

interface TestFormProps {
  initialData?: any;
  action: (formData: FormData) => Promise<ActionResponse>;
  articles?: Option[];
  initialLinkedArticles?: string[];
}

export function TestForm({ initialData, action, articles = [], initialLinkedArticles = [] }: TestFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return !value.trim() ? "حقل الاسم مطلوب" : "";
      case "price": {
        if (!value.trim()) return "حقل السعر مطلوب";
        const numeric = Number(value.replace(/,/g, ""));
        if (isNaN(numeric) || numeric < 0) return "السعر يجب أن يكون رقماً صحيحاً";
        return "";
      }
      case "result_time":
        return !value.trim() ? "حقل وقت النتيجة مطلوب" : "";
      default:
        return "";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error !== errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (errors[name]) {
      const error = validateField(name, value);
      if (error !== errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleSubmit = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    for (const key of ["name", "price", "result_time"]) {
      const error = validateField(key, formData.get(key) as string || "");
      if (error) newErrors[key] = error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("يرجى مراجعة الحقول وتصحيح الأخطاء قبل الحفظ");
      return;
    }

    startTransition(async () => {
      try {
        const res = await action(formData);
        if (res?.error) {
          toast.error(res.error);
        } else if (res?.success) {
          toast.success(initialData ? "تم تعديل الفحص بنجاح!" : "تمت إضافة الفحص بنجاح!");
          router.push("/admin/tests");
        }
      } catch (e: any) {
        toast.error(e.message || "حدث خطأ ما");
      }
    });
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <Spinner className="w-12 h-12 text-primary-dark-green" />
            <p className="text-gray-900 font-tajawal font-bold text-lg">جاري حفظ البيانات...</p>
          </div>
        </div>
      )}
      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${isPending ? 'pointer-events-none opacity-60' : ''}`}>
        <form action={handleSubmit} className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="name" className="block text-sm font-bold font-tajawal text-gray-900">اسم الفحص</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              defaultValue={initialData?.name}
              required
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all`}
              placeholder="مثال: فحص صورة الدم الكاملة (CBC)"
            />
            {errors.name && <p className="text-red-500 text-xs font-cairo mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="block text-sm font-bold font-tajawal text-gray-900">وصف الفحص</label>
            <RichTextEditor 
              name="description" 
              defaultValue={initialData?.description}
              placeholder="أدخل وصفاً تفصيلياً للفحص وفوائده، يمكنك إضافة الجداول للقيم الطبيعية والصور التوضيحية..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-bold font-tajawal text-gray-900">التصنيف</label>
            <select 
              id="category" 
              name="category" 
              defaultValue={initialData?.category || "blood"}
              required
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all appearance-none"
            >
              <option value="blood">أمراض الدم</option>
              <option value="organs">وظائف الأعضاء</option>
              <option value="vitamins">الفيتامينات</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="sample_type" className="block text-sm font-bold font-tajawal text-gray-900">نوع العينة</label>
            <select 
              id="sample_type" 
              name="sample_type" 
              defaultValue={initialData?.sample_type || "دم"}
              required
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all appearance-none"
            >
              <option value="دم">دم</option>
              <option value="إدرار">إدرار</option>
              <option value="خروج">خروج</option>
              <option value="مسحة">مسحة</option>
              <option value="سوائل الجسم">سوائل الجسم</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="result_time" className="block text-sm font-bold font-tajawal text-gray-900">وقت النتيجة</label>
            <input 
              type="text" 
              id="result_time" 
              name="result_time" 
              defaultValue={initialData?.result_time}
              required
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full bg-gray-50 border ${errors.result_time ? 'border-red-500' : 'border-gray-200'} text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all`}
              placeholder="مثال: ساعة واحدة"
            />
            {errors.result_time && <p className="text-red-500 text-xs font-cairo mt-1">{errors.result_time}</p>}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
            <label htmlFor="price" className="block text-sm font-bold font-tajawal text-gray-900">السعر (جنيه مصري)</label>
            <input 
              type="text" 
              id="price" 
              name="price"
              defaultValue={initialData?.price}
              required
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full bg-gray-50 border ${errors.price ? 'border-red-500' : 'border-gray-200'} text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo transition-all`}
              placeholder="مثال: 15,000"
            />
            {errors.price && <p className="text-red-500 text-xs font-cairo mt-1">{errors.price}</p>}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="block text-sm font-bold font-tajawal text-gray-900">المقالات المرتبطة بالفحص</label>
            <MultiSelect
              name="linked_articles"
              options={articles}
              defaultValue={initialLinkedArticles}
              placeholder="اختر المقالات..."
            />
            <p className="text-xs text-gray-500 font-cairo mt-1">
              اختر المقالات الطبية التي تشرح أو ترتبط بهذا التحليل.
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link 
            href="/admin/tests" 
            className="px-6 py-3 rounded-xl bg-gray-50 text-gray-700 font-tajawal font-bold hover:bg-gray-100 transition-colors"
          >
            إلغاء
          </Link>
          <button 
            type="submit" 
            disabled={isPending}
            className="px-8 py-3 rounded-xl bg-primary-dark-green text-white font-tajawal font-bold hover:bg-[#154618] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
        </form>
      </div>
    </>
  );
}
