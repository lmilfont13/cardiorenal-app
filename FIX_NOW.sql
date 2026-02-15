-- COPIE ESTAS 2 LINHAS E COLE NO SUPABASE SQL EDITOR
-- Depois clique em RUN

ALTER TABLE prevent_assessments ADD COLUMN IF NOT EXISTS patient_name TEXT;
ALTER TABLE kfre_assessments ADD COLUMN IF NOT EXISTS patient_name TEXT;
