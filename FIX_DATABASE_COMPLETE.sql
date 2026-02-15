-- ============================================
-- SCRIPT COMPLETO - EXECUTAR NO SUPABASE
-- ============================================
-- Este script cria as tabelas se não existirem
-- e adiciona a coluna patient_name

-- 1. Criar tabela de usuários (se não existir)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  crm TEXT,
  specialty TEXT,
  institution TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela prevent_assessments (se não existir)
CREATE TABLE IF NOT EXISTS prevent_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  patient_age INTEGER NOT NULL,
  patient_gender TEXT NOT NULL,
  systolic_bp INTEGER NOT NULL,
  total_cholesterol INTEGER NOT NULL,
  hdl_cholesterol INTEGER NOT NULL,
  has_diabetes BOOLEAN NOT NULL,
  is_smoker BOOLEAN NOT NULL,
  on_bp_medication BOOLEAN NOT NULL,
  risk_score DECIMAL(5,2) NOT NULL,
  risk_category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar tabela kfre_assessments (se não existir)
CREATE TABLE IF NOT EXISTS kfre_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  patient_age INTEGER NOT NULL,
  patient_gender TEXT NOT NULL,
  egfr DECIMAL(5,2) NOT NULL,
  acr DECIMAL(10,2) NOT NULL,
  risk_2_year DECIMAL(5,2) NOT NULL,
  risk_5_year DECIMAL(5,2) NOT NULL,
  kidney_stage TEXT NOT NULL,
  risk_category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Adicionar coluna patient_name (se não existir)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'prevent_assessments' 
    AND column_name = 'patient_name'
  ) THEN
    ALTER TABLE prevent_assessments ADD COLUMN patient_name TEXT;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'kfre_assessments' 
    AND column_name = 'patient_name'
  ) THEN
    ALTER TABLE kfre_assessments ADD COLUMN patient_name TEXT;
  END IF;
END $$;

-- 5. Criar índices (se não existirem)
CREATE INDEX IF NOT EXISTS idx_prevent_user ON prevent_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_prevent_created ON prevent_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_kfre_user ON kfre_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_kfre_created ON kfre_assessments(created_at);

-- 6. Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prevent_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kfre_assessments ENABLE ROW LEVEL SECURITY;

-- 7. Criar políticas (se não existirem)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Enable all for users'
  ) THEN
    CREATE POLICY "Enable all for users" ON users FOR ALL USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'prevent_assessments' AND policyname = 'Enable all for prevent'
  ) THEN
    CREATE POLICY "Enable all for prevent" ON prevent_assessments FOR ALL USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'kfre_assessments' AND policyname = 'Enable all for kfre'
  ) THEN
    CREATE POLICY "Enable all for kfre" ON kfre_assessments FOR ALL USING (true);
  END IF;
END $$;

-- 8. Adicionar comentários
COMMENT ON COLUMN prevent_assessments.patient_name IS 'Nome do paciente avaliado';
COMMENT ON COLUMN kfre_assessments.patient_name IS 'Nome do paciente avaliado';

-- ============================================
-- FIM DO SCRIPT - Deve mostrar "Success"
-- ============================================
