# 🔧 Executar este SQL no Supabase AGORA

## ⚡ Acesso Rápido

**Link direto**: https://supabase.com/dashboard/project/_/sql/new

## 📝 SQL para Copiar e Colar

```sql
-- Adicionar coluna patient_name nas tabelas de avaliações

-- Tabela PREVENT
ALTER TABLE prevent_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- Tabela KFRE  
ALTER TABLE kfre_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- Adicionar comentários
COMMENT ON COLUMN prevent_assessments.patient_name IS 'Nome do paciente avaliado';
COMMENT ON COLUMN kfre_assessments.patient_name IS 'Nome do paciente avaliado';
```

## ✅ Como Executar

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: **cardiorenal**
3. Menu lateral → **SQL Editor**
4. Clique em **"New Query"**
5. Cole o SQL acima
6. Clique em **"RUN"** (ou Ctrl+Enter)
7. Deve aparecer: **"Success. No rows returned"** ✅

## 🎯 Depois de Executar

Você já pode testar localmente:
- Acesse: http://localhost:3000
- Vá em qualquer calculadora (PREVENT ou KFRE)
- O primeiro campo agora é **"Nome Completo do Paciente"**
- Preencha e submeta
- Verifique no Supabase que o nome foi salvo!

---

**Após testar e confirmar que funciona, você pode fazer o deploy para produção:**

```bash
git add .
git commit -m "feat: add patient name field to assessments"
git push
```
