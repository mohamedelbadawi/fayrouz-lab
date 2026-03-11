"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addArticleAction(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const featured_image = formData.get("featured_image") as string;
  const linkedTests = formData.getAll("linked_tests") as string[];

  const { data: newArticle, error } = await supabase.from("articles").insert({
    title,
    summary,
    content,
    author,
    featured_image,
    publish_date: new Date().toISOString(),
  }).select().single();

  if (error) {
    console.error("Error inserting article:", error);
    return { error: error.message };
  }

  if (linkedTests && linkedTests.length > 0) {
    const testLinks = linkedTests.map(testId => ({
      article_id: newArticle.id,
      test_id: testId
    }));
    
    const { error: linkError } = await supabase.from("article_tests").insert(testLinks);
    if (linkError) {
      console.error("Error linking tests to article:", linkError);
    }
  }

  (revalidateTag as any)("articles");
  revalidatePath("/admin/articles", "page");
  revalidatePath("/articles", "page");
  revalidatePath("/", "page");
  redirect("/admin/articles");
}

export async function editArticleAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const featured_image = formData.get("featured_image") as string;
  const linkedTests = formData.getAll("linked_tests") as string[];

  const { error: updateError } = await supabase
    .from("articles")
    .update({
      title,
      summary,
      content,
      author,
      featured_image,
    })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating article:", updateError);
    return { error: updateError.message };
  }

  // Delete existing links
  const { error: deleteError } = await supabase
    .from("article_tests")
    .delete()
    .eq("article_id", id);

  if (deleteError) {
    console.error("Error deleting old article tests:", deleteError);
  }

  // Insert new links
  if (linkedTests && linkedTests.length > 0) {
    const testLinks = linkedTests.map(testId => ({
      article_id: id,
      test_id: testId
    }));
    
    const { error: linkError } = await supabase.from("article_tests").insert(testLinks);
    if (linkError) {
      console.error("Error linking tests to article:", linkError);
    }
  }

  (revalidateTag as any)("articles");
  revalidatePath("/admin/articles", "page");
  revalidatePath("/articles", "page");
  revalidatePath("/", "page");
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("articles")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  (revalidateTag as any)("articles");
  revalidatePath("/admin/articles", "page");
  revalidatePath("/articles", "page");
  revalidatePath("/", "page");

  return { success: true };
}

export async function restoreArticleAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("articles")
    .update({ deleted_at: null })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  (revalidateTag as any)("articles");
  revalidatePath("/admin/articles", "page");
  revalidatePath("/articles", "page");
  revalidatePath("/", "page");

  return { success: true };
}
