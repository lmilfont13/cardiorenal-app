# 🚀 Configurar Supabase na Vercel

## ✅ Você Já Fez

- ✅ Supabase configurado
- ✅ SQL executado
- ✅ Testado localmente (funcionando!)

## 📋 Agora: Configurar na Vercel

### Passo 1: Acessar Configurações da Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **"cardiorenal-app"**
3. Vá na aba **"Settings"** (no topo)
4. No menu lateral, clique em **"Environment Variables"**

### Passo 2: Adicionar Variáveis

Clique em **"Add New"** e adicione **DUAS** variáveis:

#### Variável 1:
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://ecnxaedmlalzcnplcxsr.supabase.co`
- **Environment**: Marque todas (Production, Preview, Development)
- Clique em **"Save"**

#### Variável 2:
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbnhhZWRtbGFsemNucGxjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTc3NDksImV4cCI6MjA4NjY3Mzc0OX0.U4GvC-FX5GZTws7w5pImAnl4abmYdn70x_EtjpcVviI`
- **Environment**: Marque todas (Production, Preview, Development)
- Clique em **"Save"**

### Passo 3: Fazer Redeploy

Após adicionar as variáveis:

1. Vá na aba **"Deployments"**
2. Clique nos **3 pontinhos (⋮)** do último deployment
3. Clique em **"Redeploy"**
4. Aguarde ~2 minutos

### Passo 4: Testar

1. Acesse a URL do seu site na Vercel
2. Faça uma avaliação PREVENT ou KFRE
3. Abra o console (F12)
4. Veja: "✅ Avaliação salva no Supabase!"
5. Confira no Supabase Dashboard → Table Editor

---

## 🎯 Resultado

Seu site estará 100% funcional com banco de dados na Vercel! 🎉

---

**Depois de configurar, me avise para eu atualizar a documentação final!**
