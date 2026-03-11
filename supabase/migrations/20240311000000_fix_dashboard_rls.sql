-- Migration: fix_dashboard_rls_missing_policies
-- Description: Allow public and authenticated users to view tests and articles

-- Update tests policy to allow public access
DROP POLICY IF EXISTS "Allow authenticated select on tests" ON public.tests;
DROP POLICY IF EXISTS "Allow public select on tests" ON public.tests;
CREATE POLICY "Allow public select on tests" 
ON public.tests 
FOR SELECT 
TO anon, authenticated 
USING (deleted_at IS NULL);

-- Update articles policy to allow public access
DROP POLICY IF EXISTS "Allow authenticated select on articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public select on articles" ON public.articles;
CREATE POLICY "Allow public select on articles" 
ON public.articles 
FOR SELECT 
TO anon, authenticated 
USING (deleted_at IS NULL);

-- Allow public access to article_tests junction table
DROP POLICY IF EXISTS "Allow public select on article_tests" ON public.article_tests;
CREATE POLICY "Allow public select on article_tests" 
ON public.article_tests 
FOR SELECT 
TO anon, authenticated 
USING (true);
