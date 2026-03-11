import { createPublicClient } from "@/utils/supabase/server";
import { Article, MedicalTest } from "@/types";
import { unstable_cache } from "next/cache";

interface GetArticlesParams {
  query?: string;
  dateStr?: string;
  includeDeleted?: boolean;
  page?: number;
  pageSize?: number;
}

export const getArticles = unstable_cache(
  async (params?: GetArticlesParams): Promise<{ data: Article[], totalCount: number }> => {
    const supabase = createPublicClient();
    let queryBuilder = supabase
      .from("articles")
      .select("*", { count: "exact" })
      .order("publish_date", { ascending: false });

    if (!params?.includeDeleted) {
      queryBuilder = queryBuilder.is("deleted_at", null);
    }

    if (params?.query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${params.query}%,author.ilike.%${params.query}%`);
    }

    if (params?.dateStr) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let startDate: Date | undefined;
      if (params.dateStr === "today") {
        startDate = new Date(today);
      } else if (params.dateStr === "week") {
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
      } else if (params.dateStr === "month") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      }

      if (startDate) {
        queryBuilder = queryBuilder.gte("publish_date", startDate.toISOString());
      }
    }

    if (params?.page && params.pageSize) {
      const from = (params.page - 1) * params.pageSize;
      const to = from + params.pageSize - 1;
      queryBuilder = queryBuilder.range(from, to);
    }

    const { data, error, count } = await queryBuilder;
    if (error) {
      console.error("Error fetching articles:", error);
      return { data: [], totalCount: 0 };
    }
    return { 
      data: (data as Article[]) || [], 
      totalCount: count || 0 
    };
  },
  ['articles'],
  { tags: ['articles'], revalidate: 3600 }
);

export const getArticleById = unstable_cache(
  async (id: string): Promise<Article | null> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("articles").select("*").eq("id", id).single();
    if (error) {
      console.error(`Error fetching article ${id}:`, error);
      return null;
    }
    return data as Article;
  },
  ['article-by-id'],
  { tags: ['articles'], revalidate: 3600 }
);

export const getRelatedTestsForArticle = unstable_cache(
  async (articleId: string): Promise<MedicalTest[]> => {
    const supabase = createPublicClient();
    const { data: linkedTestsRaw, error } = await supabase
      .from("article_tests")
      .select("test_id, tests(id, name, price, result_time, category)")
      .eq("article_id", articleId);

    if (error) {
      console.error(`Error fetching related tests for article ${articleId}:`, error);
      return [];
    }

    const linkedTests = (linkedTestsRaw ?? [])
      .map((row: any) => row.tests as unknown as MedicalTest)
      .filter(Boolean);
    return linkedTests;
  },
  ['related-tests'],
  { tags: ['articles', 'tests'], revalidate: 3600 }
);

export const getRecentArticles = unstable_cache(
  async (excludeId?: string, limit: number = 2): Promise<Article[]> => {
    const supabase = createPublicClient();
    let queryBuilder = supabase
      .from("articles")
      .select("id, title, summary, author, publish_date, featured_image")
      .is("deleted_at", null)
      .order("publish_date", { ascending: false })
      .limit(limit);

    if (excludeId) {
      queryBuilder = queryBuilder.neq("id", excludeId);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error("Error fetching recent articles:", error);
      return [];
    }
    return data as Article[];
  },
  ['recent-articles'],
  { tags: ['articles'], revalidate: 3600 }
);
