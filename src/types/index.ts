export type TestCategory = 'blood' | 'organs' | 'vitamins' | 'all';

export interface MedicalTest {
  id: string;
  name: string;
  description: string | null;
  price: number;
  result_time: string;
  category: TestCategory;
  sample_type: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Article {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  featured_image: string | null;
  author: string | null;
  publish_date: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface SiteSettings {
  contact_phone?: string;
  contact_email?: string;
  location_address?: string;
  location_map_url?: string;
  working_hours?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
  social_whatsapp?: string;
}
