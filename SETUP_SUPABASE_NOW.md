# 🚀 Configuração Supabase - Passo a Passo

## 📋 Etapa 1: Criar Projeto (VOCÊ FAZ)

1. **Acesse**: https://supabase.com/dashboard
2. **Login** com sua conta
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: `cardiorenal-app`
   - **Database Password**: (crie uma senha forte e **SALVE**)
   - **Region**: `South America (São Paulo)`
5. Clique em **"Create new project"**
6. **Aguarde ~2 minutos** (vai aparecer uma barra de progresso)

---

## 📋 Etapa 2: Obter Credenciais (VOCÊ FAZ)

Após o projeto ser criado:

1. No menu lateral, clique em **⚙️ Settings**
2. Clique em **API**
3. **Copie e me envie**:
   - **Project URL** (exemplo: `https://abcdefgh.supabase.co`)
   - **anon public** key (uma string longa começando com `eyJ...`)

**Cole aqui no chat essas duas informações!**

---

## 📋 Etapa 3: Criar Tabelas (VOCÊ FAZ)

1. No menu lateral, clique em **🗄️ SQL Editor**
2. Clique em **"New query"**
3. **Copie e cole** este SQL:

```sql
-- Tabela de Usuários
CREATE TABLE users (
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

-- Tabela de Avaliações PREVENT
CREATE TABLE prevent_assessments (
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

-- Tabela de Avaliações KFRE
CREATE TABLE kfre_assessments (
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

-- Índices
CREATE INDEX idx_prevent_user ON prevent_assessments(user_id);
CREATE INDEX idx_prevent_created ON prevent_assessments(created_at);
CREATE INDEX idx_kfre_user ON kfre_assessments(user_id);
CREATE INDEX idx_kfre_created ON kfre_assessments(created_at);

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prevent_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kfre_assessments ENABLE ROW LEVEL SECURITY;

-- Políticas (permitir tudo por enquanto)
CREATE POLICY "Enable all for users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all for prevent" ON prevent_assessments FOR ALL USING (true);
CREATE POLICY "Enable all for kfre" ON kfre_assessments FOR ALL USING (true);
```

4. Clique em **"Run"** (botão verde no canto inferior direito)
5. Deve aparecer **"Success. No rows returned"**

---

## ✅ Depois de Fazer Isso

**Me envie as credenciais** (URL e anon key) que eu configuro o resto automaticamente! 🚀
