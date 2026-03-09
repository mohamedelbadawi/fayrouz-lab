"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTest(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const sample_type = formData.get("sample_type") as string;
  const price = formData.get("price") as string;
  const result_time = formData.get("result_time") as string;

  if (!name || !category || !price || !result_time || !sample_type) {
    return { error: "يرجى تعبئة جميع الحقول المطلوبة." };
  }

  const { error } = await supabase.from("tests").insert({
    name,
    description,
    category,
    sample_type,
    price: price.replace(/,/g, ""),
    result_time,
  });

  if (error) {
    console.error("Error inserting test:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/tests");
  revalidatePath("/tests");
  revalidatePath("/");
  return { success: true };
}

export async function editTest(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const sample_type = formData.get("sample_type") as string;
  const price = formData.get("price") as string;
  const result_time = formData.get("result_time") as string;

  if (!name || !category || !price || !result_time || !sample_type) {
    return { error: "يرجى تعبئة جميع الحقول المطلوبة." };
  }

  const { error } = await supabase
    .from("tests")
    .update({
      name,
      description,
      category,
      sample_type,
      price: price.replace(/,/g, ""),
      result_time,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating test:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/tests");
  revalidatePath("/tests");
  revalidatePath("/");
  return { success: true };
}
