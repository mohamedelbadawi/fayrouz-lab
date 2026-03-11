"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addTestAction(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const sample_type = formData.get("sample_type") as string;
  const price = formData.get("price") as string;
  const result_time = formData.get("result_time") as string;
  const linkedArticles = formData.getAll("linked_articles") as string[];

  if (!name || !category || !price || !result_time || !sample_type) {
    return { error: "يرجى تعبئة جميع الحقول المطلوبة." };
  }

  const { data: newTest, error } = await supabase.from("tests").insert({
    name,
    description,
    category,
    sample_type,
    price: price.replace(/,/g, ""),
    result_time,
  }).select().single();

  if (error) {
    console.error("Error inserting test:", error);
    return { error: error.message };
  }

  if (linkedArticles && linkedArticles.length > 0) {
    const articleLinks = linkedArticles.map(articleId => ({
      test_id: newTest.id,
      article_id: articleId
    }));
    
    const { error: linkError } = await supabase.from("article_tests").insert(articleLinks);
    if (linkError) {
      console.error("Error linking articles to test:", linkError);
    }
  }

  (revalidateTag as any)("tests");
  revalidatePath("/admin/tests", "page");
  revalidatePath("/tests", "page");
  revalidatePath("/", "page");
  return { success: true };
}

export async function editTestAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const sample_type = formData.get("sample_type") as string;
  const price = formData.get("price") as string;
  const result_time = formData.get("result_time") as string;
  const linkedArticles = formData.getAll("linked_articles") as string[];

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

  // Delete existing links
  const { error: deleteError } = await supabase
    .from("article_tests")
    .delete()
    .eq("test_id", id);

  if (deleteError) {
    console.error("Error deleting old test articles:", deleteError);
  }

  // Insert new links
  if (linkedArticles && linkedArticles.length > 0) {
    const articleLinks = linkedArticles.map(articleId => ({
      test_id: id,
      article_id: articleId
    }));
    
    const { error: linkError } = await supabase.from("article_tests").insert(articleLinks);
    if (linkError) {
      console.error("Error linking articles to test:", linkError);
    }
  }

  (revalidateTag as any)("tests");
  revalidatePath("/admin/tests", "page");
  revalidatePath("/tests", "page");
  revalidatePath("/", "page");
  return { success: true };
}

export async function deleteTestAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tests")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  (revalidateTag as any)("tests");
  revalidatePath("/admin/tests", "page");
  revalidatePath("/tests", "page");
  revalidatePath("/", "page");

  return { success: true };
}

export async function restoreTestAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tests")
    .update({ deleted_at: null })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  (revalidateTag as any)("tests");
  revalidatePath("/admin/tests", "page");
  revalidatePath("/tests", "page");
  revalidatePath("/", "page");

  return { success: true };
}
