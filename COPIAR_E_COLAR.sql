🔧 COPIE E COLE NO SUPABASE SQL EDITOR
============================================

Link direto: https://supabase.com/dashboard/project/_/sql/new

COLE ESTE SQL E CLIQUE EM "RUN":
============================================

-- 1. Criar tabela de usuários
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

-- 2. Criar tabela prevent_assessments
CREATE TABLE IF NOT EXISTS prevent_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  patient_name TEXT,
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

-- 3. Criar tabela kfre_assessments
CREATE TABLE IF NOT EXISTS kfre_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  patient_name TEXT,
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

-- 4. Criar índices
CREATE INDEX IF NOT EXISTS idx_prevent_user ON prevent_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_prevent_created ON prevent_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_kfre_user ON kfre_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_kfre_created ON kfre_assessments(created_at);

-- 5. Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prevent_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kfre_assessments ENABLE ROW LEVEL SECURITY;

-- 6. Criar políticas
DROP POLICY IF EXISTS "Enable all for users" ON users;
DROP POLICY IF EXISTS "Enable all for prevent" ON prevent_assessments;
DROP POLICY IF EXISTS "Enable all for kfre" ON kfre_assessments;

CREATE POLICY "Enable all for users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all for prevent" ON prevent_assessments FOR ALL USING (true);
CREATE POLICY "Enable all for kfre" ON kfre_assessments FOR ALL USING (true);

============================================
RESULTADO ESPERADO: "Success. No rows returned"
============================================
