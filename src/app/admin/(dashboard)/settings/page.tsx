import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "./SettingsForm";

export default async function Settings() { 
  const supabase = await createClient();

  // Fetch the single settings row
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-tajawal font-bold text-gray-900 mb-2">إعدادات الموقع</h1>
        <p className="text-gray-500 font-cairo">إدارة بيانات التواصل، الروابط، وساعات العمل التي تظهر في صفحات الموقع.</p>
      </div>
      <SettingsForm initialData={settings} />
    </div>
  ); 
}
