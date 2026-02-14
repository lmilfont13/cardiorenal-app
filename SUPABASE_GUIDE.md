# 🗄️ Guia: Integrar Supabase ao CardioRenal App

## 🚀 Passo 1: Criar Projeto no Supabase

1. Acesse: https://supabase.com/dashboard
2. Clique em **"New Project"**
3. Configure:
   - **Name**: `cardiorenal-app`
   - **Database Password**: (crie uma senha forte e salve!)
   - **Region**: South America (São Paulo)
4. Clique em **"Create new project"**
5. Aguarde ~2 minutos para o projeto ser criado

---

## 🔑 Passo 2: Obter Credenciais

1. No dashboard do projeto, vá em **"Settings"** → **"API"**
2. Copie:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 💻 Passo 3: Instalar Dependências

Execute no terminal:

```powershell
npm install @supabase/supabase-js
```

---

## 🔧 Passo 4: Configurar Variáveis de Ambiente

Crie/edite o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**⚠️ IMPORTANTE**: 
- Use `.env.local` (não `.env`)
- Adicione ao `.gitignore` (já está por padrão)

---

## 📊 Passo 5: Criar Tabelas no Supabase

### 5.1 Acesse o SQL Editor

No dashboard: **"SQL Editor"** → **"New query"**

### 5.2 Execute este SQL:

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
  
  -- Dados do paciente
  patient_age INTEGER NOT NULL,
  patient_gender TEXT NOT NULL,
  
  -- Dados clínicos
  systolic_bp INTEGER NOT NULL,
  total_cholesterol INTEGER NOT NULL,
  hdl_cholesterol INTEGER NOT NULL,
  has_diabetes BOOLEAN NOT NULL,
  is_smoker BOOLEAN NOT NULL,
  on_bp_medication BOOLEAN NOT NULL,
  
  -- Resultados
  risk_score DECIMAL(5,2) NOT NULL,
  risk_category TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Avaliações KFRE
CREATE TABLE kfre_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  
  -- Dados do paciente
  patient_age INTEGER NOT NULL,
  patient_gender TEXT NOT NULL,
  
  -- Dados clínicos
  egfr DECIMAL(5,2) NOT NULL,
  acr DECIMAL(10,2) NOT NULL,
  
  -- Resultados
  risk_2_year DECIMAL(5,2) NOT NULL,
  risk_5_year DECIMAL(5,2) NOT NULL,
  kidney_stage TEXT NOT NULL,
  risk_category TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_prevent_user ON prevent_assessments(user_id);
CREATE INDEX idx_prevent_created ON prevent_assessments(created_at);
CREATE INDEX idx_kfre_user ON kfre_assessments(user_id);
CREATE INDEX idx_kfre_created ON kfre_assessments(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prevent_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kfre_assessments ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (temporárias - permitir tudo por enquanto)
CREATE POLICY "Enable all for users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all for prevent" ON prevent_assessments FOR ALL USING (true);
CREATE POLICY "Enable all for kfre" ON kfre_assessments FOR ALL USING (true);
```

Clique em **"Run"** para executar.

---

## 📝 Passo 6: Criar Cliente Supabase

Será criado automaticamente em: `lib/supabase.ts`

---

## 🔄 Passo 7: Atualizar Código

Os formulários serão atualizados para salvar no Supabase automaticamente.

---

## 🎯 Funcionalidades que Teremos

✅ **Salvar avaliações PREVENT**
✅ **Salvar avaliações KFRE**
✅ **Histórico de avaliações**
✅ **Perfil de usuário**
✅ **Estatísticas**

---

## 🔐 Passo 8: Autenticação (Opcional - Futuro)

Supabase tem autenticação integrada:

```typescript
// Login com email
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Login com Google, GitHub, etc.
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})
```

---

## 📊 Visualizar Dados

**Table Editor**: Dashboard → **"Table Editor"**

Você pode:
- Ver todos os registros
- Editar manualmente
- Filtrar e buscar
- Exportar CSV

---

## 🚀 Deploy na Vercel

### Adicionar Variáveis de Ambiente

1. Vercel Dashboard → **cardiorenal-app** → **Settings** → **Environment Variables**
2. Adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Clique em **"Save"**

O próximo deploy vai usar o Supabase automaticamente!

---

## 💰 Custos

**Supabase - Plano Gratuito:**
- ✅ 500 MB de banco de dados
- ✅ 1 GB de armazenamento de arquivos
- ✅ 2 GB de largura de banda
- ✅ 50,000 usuários autenticados
- ✅ Suficiente para MVP!

---

## 📚 Recursos

- **Supabase Docs**: https://supabase.com/docs
- **Supabase JS Client**: https://supabase.com/docs/reference/javascript
- **Dashboard**: https://supabase.com/dashboard

---

**Pronto para começar?** 🚀

Vou instalar o Supabase e configurar tudo para você!
