# Guia de Deploy no GitHub e Vercel

## 📋 Pré-requisitos

- Conta no GitHub (https://github.com)
- Conta no Vercel (https://vercel.com) - opcional

## 🚀 Passo 1: Criar Repositório no GitHub

### Opção A: Via Interface Web (Recomendado)

1. **Acesse GitHub**
   - Vá para https://github.com
   - Faça login na sua conta

2. **Criar Novo Repositório**
   - Clique no botão **"+"** no canto superior direito
   - Selecione **"New repository"**

3. **Configurar Repositório**
   - **Repository name**: `cardiorenal-app`
   - **Description**: `CardioRenal Risk Assessment - PREVENT and KFRE Calculators`
   - **Visibility**: Public ou Private (sua escolha)
   - **⚠️ IMPORTANTE**: NÃO marque nenhuma das opções:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   
4. **Criar**
   - Clique em **"Create repository"**

5. **Copiar URL**
   - Na página que abrir, copie a URL do repositório
   - Exemplo: `https://github.com/SEU-USUARIO/cardiorenal-app.git`

### Opção B: Via GitHub CLI (Avançado)

```powershell
# Instalar GitHub CLI se não tiver
winget install GitHub.cli

# Login
gh auth login

# Criar repositório
gh repo create cardiorenal-app --public --source=. --remote=origin
```

## 🔗 Passo 2: Conectar Repositório Local ao GitHub

Após criar o repositório no GitHub, execute no terminal:

```powershell
# Navegar para o projeto
cd C:\Users\Luciano\.gemini\antigravity\scratch\cardiorenal-app

# Adicionar remote (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/cardiorenal-app.git

# Verificar remote
git remote -v

# Fazer push
git push -u origin master
```

### Se der erro de autenticação:

**Windows:**
```powershell
# O Git vai pedir suas credenciais
# Use seu username do GitHub e um Personal Access Token como senha
```

**Para criar Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Marque: `repo` (Full control of private repositories)
4. Copie o token e use como senha

## ☁️ Passo 3: Deploy na Vercel (Opcional)

### 3.1 Criar Conta na Vercel

1. Acesse https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize a Vercel a acessar seus repositórios

### 3.2 Importar Projeto

1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Encontre `cardiorenal-app` na lista
3. Clique em **"Import"**

### 3.3 Configurar Deploy

- **Framework Preset**: Next.js (detectado automaticamente)
- **Root Directory**: `./`
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `.next` (padrão)
- **Install Command**: `npm install` (padrão)

**Environment Variables**: Nenhuma necessária por enquanto

### 3.4 Deploy

1. Clique em **"Deploy"**
2. Aguarde ~2-3 minutos
3. ✅ Seu app estará online!

### 3.5 Acessar App

Após o deploy, você receberá uma URL como:
```
https://cardiorenal-app.vercel.app
```

## 🔄 Atualizações Futuras

### Para atualizar o código:

```powershell
# Fazer alterações no código
# ...

# Adicionar mudanças
git add .

# Commit
git commit -m "feat: descrição da mudança"

# Push
git push
```

**A Vercel fará deploy automático a cada push!** 🎉

## 📝 Comandos Úteis

```powershell
# Ver status do Git
git status

# Ver histórico de commits
git log --oneline

# Ver branches
git branch

# Criar nova branch
git checkout -b nome-da-branch

# Voltar para master
git checkout master

# Ver remotes
git remote -v
```

## ⚠️ Troubleshooting

### Erro: "remote origin already exists"

```powershell
# Remover remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/SEU-USUARIO/cardiorenal-app.git
```

### Erro: "failed to push some refs"

```powershell
# Fazer pull primeiro
git pull origin master --allow-unrelated-histories

# Depois push
git push -u origin master
```

### Erro de autenticação

- Use Personal Access Token em vez de senha
- Ou configure SSH keys

## 🎯 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Remote adicionado ao projeto local
- [ ] Código enviado para GitHub (`git push`)
- [ ] Projeto importado na Vercel (opcional)
- [ ] Deploy realizado com sucesso
- [ ] App acessível via URL pública

## 🔗 Links Úteis

- **GitHub Docs**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Pronto!** Seu app CardioRenal está no GitHub e (opcionalmente) online na Vercel! 🚀
