-- Migration: fix_dashboard_rls_missing_policies
-- Description: Allow authenticated users to view tests and articles (fixes empty dashboard)

-- Allow authenticated users to view tests
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'tests' AND policyname = 'Allow authenticated select on tests'
    ) THEN
        CREATE POLICY "Allow authenticated select on tests" 
        ON public.tests 
        FOR SELECT 
        TO authenticated 
        USING (true);
    END IF;
END $$;

-- Allow authenticated users to view articles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'articles' AND policyname = 'Allow authenticated select on articles'
    ) THEN
        CREATE POLICY "Allow authenticated select on articles" 
        ON public.articles 
        FOR SELECT 
        TO authenticated 
        USING (true);
    END IF;
END $$;
