"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  // Extract fields
  const location = formData.get("location") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const working_hours = formData.get("working_hours") as string;
  const map_link = formData.get("map_link") as string;
  const facebook_url = formData.get("facebook_url") as string;
  const twitter_url = formData.get("twitter_url") as string;
  const instagram_url = formData.get("instagram_url") as string;

  const { error } = await supabase
    .from("site_settings")
    .upsert({
      id: 1, // Fixed ID for global settings
      location,
      address,
      phone,
      email,
      working_hours,
      map_link,
      facebook_url,
      twitter_url,
      instagram_url,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error("Error updating settings:", error);
    return { error: "حدث خطأ أثناء حفظ الإعدادات." };
  }

  // Revalidate layout/paths so changes reflect everywhere (navbar, footer, etc)
  revalidatePath("/", "layout");

  return { success: true };
}
