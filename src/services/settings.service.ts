import { createPublicClient } from "@/utils/supabase/server";
import { SiteSettings } from "@/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  
  if (error) {
    console.error("Error fetching site settings:", error);
    return {};
  }

  return data as SiteSettings;
}
