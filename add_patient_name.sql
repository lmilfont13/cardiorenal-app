-- Adicionar coluna patient_name nas tabelas de avaliações
-- Execute este script no Supabase SQL Editor

-- Adicionar coluna na tabela prevent_assessments
ALTER TABLE prevent_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- Adicionar coluna na tabela kfre_assessments
ALTER TABLE kfre_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- Comentários nas colunas
COMMENT ON COLUMN prevent_assessments.patient_name IS 'Nome do paciente avaliado';
COMMENT ON COLUMN kfre_assessments.patient_name IS 'Nome do paciente avaliado';
