# 🗄️ Guia: Adicionar Banco de Dados ao CardioRenal App

## 📌 Escolha: Vercel Postgres + Prisma

Esta é a solução mais integrada e fácil para Next.js + Vercel.

---

## 🚀 Passo 1: Criar Banco de Dados na Vercel

### 1.1 Acesse o Dashboard da Vercel

1. Vá para: https://vercel.com/dashboard
2. Clique no seu projeto **"cardiorenal-app"**
3. Vá na aba **"Storage"**
4. Clique em **"Create Database"**

### 1.2 Escolha Postgres

1. Selecione **"Postgres"**
2. Dê um nome: `cardiorenal-db`
3. Escolha a região mais próxima (ex: `São Paulo`)
4. Clique em **"Create"**

### 1.3 Conecte ao Projeto

1. Após criar, clique em **"Connect Project"**
2. Selecione **"cardiorenal-app"**
3. A Vercel vai adicionar as variáveis de ambiente automaticamente

---

## 💻 Passo 2: Instalar Dependências Localmente

Abra o terminal no projeto e execute:

```powershell
# Instalar Prisma (ORM)
npm install prisma @prisma/client

# Instalar Vercel Postgres SDK
npm install @vercel/postgres
```

---

## 🔧 Passo 3: Configurar Prisma

### 3.1 Inicializar Prisma

```powershell
npx prisma init
```

Isso cria:
- 📁 `prisma/schema.prisma` - Definição do banco
- 📁 `.env` - Variáveis de ambiente

### 3.2 Configurar Variáveis de Ambiente

Edite o arquivo `.env` (criado automaticamente):

```env
# Copie a URL do banco da Vercel
# Vá em: Vercel Dashboard → Storage → cardiorenal-db → .env.local
# Copie a linha POSTGRES_PRISMA_URL

POSTGRES_PRISMA_URL="postgres://..."
```

**⚠️ IMPORTANTE**: Adicione `.env` ao `.gitignore` (já está por padrão)

---

## 📊 Passo 4: Definir Schema do Banco

Edite `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}

// Modelo de Usuário
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  crm         String?
  specialty   String?
  institution String?
  phone       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relação com avaliações
  preventAssessments PreventAssessment[]
  kfreAssessments    KfreAssessment[]
}

// Modelo de Avaliação PREVENT
model PreventAssessment {
  id                String   @id @default(cuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  
  // Dados do paciente
  patientAge        Int
  patientGender     String
  
  // Dados clínicos
  systolicBP        Int
  totalCholesterol  Int
  hdlCholesterol    Int
  hasDiabetes       Boolean
  isSmoker          Boolean
  onBPMedication    Boolean
  
  // Resultados
  riskScore         Float
  riskCategory      String
  
  createdAt         DateTime @default(now())
}

// Modelo de Avaliação KFRE
model KfreAssessment {
  id                String   @id @default(cuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  
  // Dados do paciente
  patientAge        Int
  patientGender     String
  
  // Dados clínicos
  egfr              Float
  acr               Float
  
  // Resultados
  risk2Year         Float
  risk5Year         Float
  kidneyStage       String
  riskCategory      String
  
  createdAt         DateTime @default(now())
}
```

---

## 🔄 Passo 5: Criar Tabelas no Banco

Execute os comandos:

```powershell
# Criar migração
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate
```

---

## 📝 Passo 6: Usar no Código

### 6.1 Criar Cliente Prisma

Crie `lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 6.2 Exemplo: Salvar Avaliação PREVENT

Edite `app/calculators/prevent/page.tsx`:

```typescript
// Adicione no topo
import { prisma } from '@/lib/prisma'

// No onSubmit, após calcular:
const onSubmit = async (data: PreventFormData) => {
  const result = calculatePreventRisk(data)
  
  // Salvar no banco
  try {
    await prisma.preventAssessment.create({
      data: {
        userId: "temp-user-id", // TODO: Usar ID do usuário autenticado
        patientAge: data.age,
        patientGender: data.gender,
        systolicBP: data.systolicBP,
        totalCholesterol: data.totalCholesterol,
        hdlCholesterol: data.hdlCholesterol,
        hasDiabetes: data.hasDiabetes,
        isSmoker: data.isSmoker,
        onBPMedication: data.onBPMedication,
        riskScore: result.score,
        riskCategory: result.category,
      },
    })
  } catch (error) {
    console.error("Erro ao salvar:", error)
  }
  
  // Continuar com navegação...
  sessionStorage.setItem("preventResult", JSON.stringify(result))
  router.push("/results")
}
```

---

## 🔐 Passo 7: Adicionar Autenticação (Opcional)

Para ter usuários reais, use **NextAuth.js**:

```powershell
npm install next-auth @auth/prisma-adapter
```

Documentação: https://next-auth.js.org/

---

## 📊 Passo 8: Visualizar Dados

### Opção 1: Prisma Studio (Local)

```powershell
npx prisma studio
```

Abre interface visual em `http://localhost:5555`

### Opção 2: Vercel Dashboard

Vá em: **Storage → cardiorenal-db → Data**

---

## 🚀 Passo 9: Deploy

Quando fizer push para GitHub:

```powershell
git add .
git commit -m "feat: add database with Prisma"
git push
```

A Vercel vai:
1. ✅ Detectar Prisma automaticamente
2. ✅ Rodar `prisma generate`
3. ✅ Conectar ao banco
4. ✅ Deploy!

---

## 📋 Checklist Completo

- [ ] Criar banco Postgres na Vercel
- [ ] Conectar ao projeto
- [ ] Instalar Prisma (`npm install prisma @prisma/client`)
- [ ] Inicializar Prisma (`npx prisma init`)
- [ ] Configurar `.env` com URL do banco
- [ ] Definir schema em `prisma/schema.prisma`
- [ ] Criar migração (`npx prisma migrate dev`)
- [ ] Gerar cliente (`npx prisma generate`)
- [ ] Criar `lib/prisma.ts`
- [ ] Atualizar formulários para salvar dados
- [ ] Testar localmente
- [ ] Fazer push para GitHub
- [ ] Verificar deploy na Vercel

---

## 💰 Custos

**Vercel Postgres - Plano Gratuito:**
- ✅ 256 MB de armazenamento
- ✅ 60 horas de computação/mês
- ✅ Suficiente para MVP e testes

**Quando crescer:**
- Pro: $20/mês (512 MB)
- Enterprise: Customizado

---

## 🆘 Problemas Comuns

### "Cannot find module '@prisma/client'"

```powershell
npx prisma generate
```

### "Environment variable not found: POSTGRES_PRISMA_URL"

Verifique se o `.env` está configurado corretamente.

### Erro no deploy da Vercel

Certifique-se de que as variáveis de ambiente estão configuradas em:
**Vercel Dashboard → Settings → Environment Variables**

---

## 📚 Recursos

- **Prisma Docs**: https://www.prisma.io/docs
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **NextAuth.js**: https://next-auth.js.org/

---

**Quer que eu implemente isso para você agora?** 🚀

Posso:
1. ✅ Instalar as dependências
2. ✅ Configurar o Prisma
3. ✅ Criar o schema
4. ✅ Atualizar os formulários para salvar dados

Basta você criar o banco na Vercel primeiro e me passar a URL de conexão!
