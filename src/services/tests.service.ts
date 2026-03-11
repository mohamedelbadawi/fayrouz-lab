import { createPublicClient } from "@/utils/supabase/server";
import { MedicalTest } from "@/types";
import { unstable_cache } from "next/cache";

interface GetTestsParams {
  query?: string;
  category?: string;
  includeDeleted?: boolean;
  limit?: number;
}

export const getTests = unstable_cache(
  async (params?: GetTestsParams): Promise<MedicalTest[]> => {
    const supabase = createPublicClient();
    let queryBuilder = supabase.from("tests").select("*").order("name");

    if (!params?.includeDeleted) {
      queryBuilder = queryBuilder.is("deleted_at", null);
    }

    if (params?.query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${params.query}%,description.ilike.%${params.query}%`);
    }

    if (params?.category && params.category !== "all") {
      queryBuilder = queryBuilder.eq("category", params.category);
    }

    if (params?.limit) {
      queryBuilder = queryBuilder.limit(params.limit);
    }

    const { data, error } = await queryBuilder;
    if (error) {
      console.error("Error fetching tests:", error);
      return [];
    }
    return data as MedicalTest[];
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
