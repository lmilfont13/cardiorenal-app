# 🔧 CORRIGIR ERRO NO BANCO DE DADOS

## 🚨 Possíveis Causas do Erro

1. **Tabelas ainda não existem** no Supabase
2. **Script SQL anterior incompleto**
3. **Permissões insuficientes**

## ✅ SOLUÇÃO: Execute o Script Completo

### Passo 1: Acesse o Supabase

1. Vá em: https://supabase.com/dashboard
2. Selecione seu projeto
3. Menu lateral → **SQL Editor**
4. Clique em **"New Query"**

### Passo 2: Execute o Script Completo

Cole e execute o arquivo **`FIX_DATABASE_COMPLETE.sql`** que está no projeto.

OU copie e cole este SQL:

```sql
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

-- 3. Criar tabela kfre_assessments (se não existir)
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

-- 6. Criar políticas simples (permitir tudo)
DROP POLICY IF EXISTS "Enable all for users" ON users;
DROP POLICY IF EXISTS "Enable all for prevent" ON prevent_assessments;
DROP POLICY IF EXISTS "Enable all for kfre" ON kfre_assessments;

CREATE POLICY "Enable all for users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all for prevent" ON prevent_assessments FOR ALL USING (true);
CREATE POLICY "Enable all for kfre" ON kfre_assessments FOR ALL USING (true);
```

### Passo 3: Clique em RUN

Deve aparecer: **"Success. No rows returned"** ✅

### Passo 4: Verificar

Vá em **Table Editor** e você deve ver 3 tabelas:
- ✅ `users`
- ✅ `prevent_assessments` (com coluna `patient_name`)
- ✅ `kfre_assessments` (com coluna `patient_name`)

## 🎯 Após Executar

Seu banco estará 100% configurado e pronto para usar!

Teste acessando: http://localhost:3000 (se estiver rodando local)  
Ou seu site na Vercel em produção.

---

## ⚠️ Se Ainda Der Erro

Me envie a mensagem de erro **exata** que apareceu e vou corrigir imediatamente!
