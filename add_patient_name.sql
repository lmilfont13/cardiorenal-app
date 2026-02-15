-- ============================================
-- 🔧 ADICIONAR CAMPO patient_name
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- Link: https://supabase.com/dashboard/project/_/sql/new
-- ============================================

-- 1. Adicionar coluna patient_name na tabela prevent_assessments
ALTER TABLE prevent_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- 2. Adicionar coluna patient_name na tabela kfre_assessments
ALTER TABLE kfre_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- 3. Verificar se as colunas foram adicionadas
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'prevent_assessments' 
  AND column_name = 'patient_name';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'kfre_assessments' 
  AND column_name = 'patient_name';

-- ============================================
-- RESULTADO ESPERADO:
-- ============================================
-- Você deve ver duas linhas:
-- column_name    | data_type
-- patient_name   | text
-- ============================================
