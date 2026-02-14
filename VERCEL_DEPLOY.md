# 🚀 Deploy CardioRenal na Vercel - Guia Passo a Passo

## ✅ Seu Código Já Está no GitHub!

**Repositório**: https://github.com/lmilfont13/cardiorenal-app

Agora vamos colocar online em 5 minutos!

---

## 📋 Passo 1: Acesse a Vercel

Abra no seu navegador:

```
https://vercel.com/signup
```

---

## 📋 Passo 2: Faça Login com GitHub

1. Na página da Vercel, clique no botão:
   
   **"Continue with GitHub"** (botão preto com logo do GitHub)

2. Você será redirecionado para o GitHub
3. Autorize a Vercel a acessar seus repositórios
4. Clique em **"Authorize Vercel"**

---

## 📋 Passo 3: Import do Projeto

Após fazer login, você verá o dashboard da Vercel:

1. Clique em **"Add New..."** (botão azul no canto superior direito)
2. Selecione **"Project"**
3. Você verá uma lista dos seus repositórios do GitHub
4. Procure por **"cardiorenal-app"**
5. Clique em **"Import"** ao lado dele

---

## 📋 Passo 4: Configure o Deploy (Automático!)

A Vercel vai detectar automaticamente que é um projeto Next.js:

**Configurações detectadas:**
- ✅ Framework Preset: **Next.js**
- ✅ Root Directory: `./`
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**⚠️ IMPORTANTE: NÃO MUDE NADA!**

Apenas role para baixo e clique em:

**"Deploy"** (botão azul grande)

---

## 📋 Passo 5: Aguarde o Deploy

Você verá uma tela com:

- 🔄 Building... (construindo o projeto)
- 📦 Installing dependencies...
- ⚡ Compiling...
- ✅ Success!

**Tempo estimado**: 2-3 minutos

---

## 🎉 Passo 6: Acesse Seu App!

Quando terminar, você verá:

- 🎊 Confetes na tela
- ✅ "Congratulations!"
- 🔗 Uma URL pública

Sua URL será algo como:

```
https://cardiorenal-app.vercel.app
```

ou

```
https://cardiorenal-app-lmilfont13.vercel.app
```

**Clique na URL para ver seu app online!** 🚀

---

## 🔄 Atualizações Automáticas

A partir de agora, **qualquer push no GitHub** fará deploy automático!

```powershell
# Fazer mudanças no código
git add .
git commit -m "feat: nova funcionalidade"
git push

# Deploy automático na Vercel! 🎉
```

---

## 📱 Recursos Grátis da Vercel

- ✅ HTTPS automático
- ✅ Deploy automático a cada push
- ✅ Preview de cada branch
- ✅ Analytics básico
- ✅ Domínio .vercel.app grátis
- ✅ Domínio personalizado (se você tiver)

---

## 🆘 Problemas Comuns

### "Repository not found"
- Certifique-se de que autorizou a Vercel a acessar seus repositórios
- Vá em: GitHub → Settings → Applications → Vercel → Configure
- Marque "All repositories" ou selecione "cardiorenal-app"

### "Build failed"
- Verifique os logs de erro
- Geralmente é problema de dependências
- O projeto já funciona localmente, então deve funcionar na Vercel

### "Cannot find module"
- Certifique-se de que todos os arquivos foram commitados
- Execute: `git status` para ver se há arquivos não commitados

---

## 📞 Precisa de Ajuda?

Se tiver qualquer problema, me avise e eu te ajudo a resolver!

---

**Resumo Rápido**:
1. https://vercel.com/signup
2. Login com GitHub
3. Import "cardiorenal-app"
4. Deploy
5. Pronto! 🎉
