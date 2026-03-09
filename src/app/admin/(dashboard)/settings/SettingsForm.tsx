"use client";

import { useState, useTransition, Fragment } from "react";
import toast from "react-hot-toast";
import { updateSettings } from "./actions";
import { Spinner } from "@/components/ui/Spinner";
import { Save } from "lucide-react";

export function SettingsForm({ initialData }: { initialData: any }) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateSettings(formData);
      
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("تم حفظ إعدادات الموقع بنجاح!");
      }
    });
  }

  return (
    <Fragment>
      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-auto">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <Spinner />
            <p className="text-gray-900 font-bold font-tajawal">جاري حفظ الإعدادات...</p>
          </div>
        </div>
      )}

      <form action={handleSubmit} className={`space-y-8 ${isPending ? 'pointer-events-none opacity-60' : ''}`}>
        
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-tajawal font-bold text-primary-dark-green border-b border-gray-100 pb-4">معلومات التواصل</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-bold font-tajawal text-gray-900">رقم الهاتف</label>
              <input type="text" id="phone" name="phone" defaultValue={initialData?.phone || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo" dir="ltr" placeholder="+964..." />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold font-tajawal text-gray-900">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" defaultValue={initialData?.email || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo" dir="ltr" placeholder="info@example.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-bold font-tajawal text-gray-900">الموقع (الدولة/المدينة)</label>
              <input type="text" id="location" name="location" defaultValue={initialData?.location || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo" placeholder="مثال: العراق" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="block text-sm font-bold font-tajawal text-gray-900">العنوان التفصيلي</label>
              <input type="text" id="address" name="address" defaultValue={initialData?.address || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo" placeholder="مثال: بغداد، المنصور، شارع 14 رمضان..." />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="working_hours" className="block text-sm font-bold font-tajawal text-gray-900">ساعات العمل</label>
              <textarea 
                id="working_hours" 
                name="working_hours" 
                defaultValue={initialData?.working_hours || ""} 
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo" 
                placeholder={"السبت - الخميس: 8 صباحاً - 10 مساءً\nالجمعة: مغلق"}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="map_link" className="block text-sm font-bold font-tajawal text-gray-900">رابط خريطة جوجل (Google Maps Link)</label>
              <input type="url" id="map_link" name="map_link" defaultValue={initialData?.map_link || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo text-left" dir="ltr" placeholder="https://maps.google.com/..." />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-tajawal font-bold text-primary-dark-green border-b border-gray-100 pb-4">منصات التواصل الاجتماعي</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="facebook_url" className="block text-sm font-bold font-tajawal text-gray-900">رابط فيسبوك</label>
              <input type="url" id="facebook_url" name="facebook_url" defaultValue={initialData?.facebook_url || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo text-left" dir="ltr" placeholder="https://facebook.com/..." />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="instagram_url" className="block text-sm font-bold font-tajawal text-gray-900">رابط انستغرام</label>
              <input type="url" id="instagram_url" name="instagram_url" defaultValue={initialData?.instagram_url || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo text-left" dir="ltr" placeholder="https://instagram.com/..." />
            </div>

            <div className="space-y-2">
              <label htmlFor="twitter_url" className="block text-sm font-bold font-tajawal text-gray-900">رابط منصة إكس (تويتر)</label>
              <input type="url" id="twitter_url" name="twitter_url" defaultValue={initialData?.twitter_url || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-light-green/20 focus:border-primary-light-green block p-4 font-cairo text-left" dir="ltr" placeholder="https://x.com/..." />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary-dark-green text-white font-tajawal font-bold px-8 py-4 rounded-xl hover:bg-[#154618] transition-colors flex items-center justify-center gap-2 min-w-[200px]"
          >
            <Save className="w-5 h-5" />
            حفظ الإعدادات
          </button>
        </div>

      </form>
    </Fragment>
  );
}
