import { createPublicClient } from "@/utils/supabase/server";
import { MedicalTest } from "@/types";
import { unstable_cache } from "next/cache";

interface GetTestsParams {
  query?: string;
  category?: string;
  includeDeleted?: boolean;
  limit?: number;
  page?: number;
  pageSize?: number;
}

export const getTests = unstable_cache(
  async (params?: GetTestsParams): Promise<{ data: MedicalTest[], totalCount: number }> => {
    const supabase = createPublicClient();
    let queryBuilder = supabase
      .from("tests")
      .select("*", { count: "exact" })
      .order("name");

    if (!params?.includeDeleted) {
      queryBuilder = queryBuilder.is("deleted_at", null);
    }

    if (params?.query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${params.query}%,description.ilike.%${params.query}%`);
    }

    if (params?.category && params.category !== "all") {
      queryBuilder = queryBuilder.eq("category", params.category);
    }

    if (params?.page && params.pageSize) {
      const from = (params.page - 1) * params.pageSize;
      const to = from + params.pageSize - 1;
      queryBuilder = queryBuilder.range(from, to);
    } else if (params?.limit) {
      queryBuilder = queryBuilder.limit(params.limit);
    }

    const { data, error, count } = await queryBuilder;
    if (error) {
      console.error("Error fetching tests:", error);
      return { data: [], totalCount: 0 };
    }
    return { 
      data: (data as MedicalTest[]) || [], 
      totalCount: count || 0 
    };
  },
  ['tests'],
  { tags: ['tests'], revalidate: 3600 }
);

export const getTestById = unstable_cache(
  async (id: string): Promise<MedicalTest | null> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("tests").select("*").eq("id", id).single();
    if (error) {
      console.error(`Error fetching test ${id}:`, error);
      return null;
    }
    return data as MedicalTest;
  },
  ['test-by-id'],
  { tags: ['tests'], revalidate: 3600 }
);
