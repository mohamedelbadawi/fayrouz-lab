"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File | null;

    if (!file) {
      return { error: "No file provided" };
    }

    // Validate type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return { error: "نوع الملف غير مدعوم. الأنواع المسموح بها: JPG, PNG, WEBP, GIF" };
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { error: "حجم الصورة يتجاوز الحد المسموح به (5 ميغابايت)" };
    }

    const supabase = await createClient();

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const filename = `cover-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { error: "فشل رفع الصورة، يرجى المحاولة مرة أخرى" };
    }

    const { data: urlData } = supabase.storage
      .from("article-images")
      .getPublicUrl(filename);

    return { url: urlData.publicUrl };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "خطأ غير متوقع" };
  }
}
