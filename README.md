# CardioRenal Risk Assessment

Aplicação web para avaliação de risco cardiovascular e renal, desenvolvida para profissionais de saúde.

![CardioRenal App](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 🎯 Sobre o Projeto

Sistema de avaliação de risco baseado em calculadoras médicas validadas cientificamente:

- **PREVENT**: Calculadora de risco cardiovascular em 10 anos
- **KFRE**: Kidney Failure Risk Equation (em desenvolvimento)

## ✨ Funcionalidades

- ✅ Calculadora PREVENT totalmente funcional
- ✅ Formulários com validação completa
- ✅ Interpretação clínica automática
- ✅ Recomendações personalizadas
- ✅ Interface responsiva e moderna
- ✅ Impressão de resultados
- ✅ Design baseado nas telas do Stitch

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React
- **Validação**: Zod Schema Validation

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/SEU-USUARIO/cardiorenal-app.git
cd cardiorenal-app
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
```

4. **Acesse no navegador**

```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
cardiorenal-app/
├── app/                          # Rotas e páginas (App Router)
│   ├── calculators/
│   │   └── prevent/             # Calculadora PREVENT
│   ├── results/                 # Página de resultados
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Landing page
├── components/
│   ├── ui/                      # Componentes reutilizáveis
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   └── layout/
│       └── navigation.tsx       # Navegação principal
├── lib/
│   ├── calculators/
│   │   └── prevent.ts           # Lógica da calculadora PREVENT
│   └── utils.ts                 # Utilitários
└── public/                      # Arquivos estáticos
```

## 🧮 Calculadora PREVENT

### Parâmetros de Entrada

- Idade (18-120 anos)
- Sexo (Masculino/Feminino)
- Pressão Arterial Sistólica (mmHg)
- Colesterol Total (mg/dL)
- HDL Colesterol (mg/dL)
- Diabetes Mellitus (Sim/Não)
- Tabagismo Atual (Sim/Não)
- Uso de Anti-hipertensivos (Sim/Não)

### Categorias de Risco

- **Baixo**: < 10%
- **Moderado**: 10-20%
- **Alto**: 20-30%
- **Muito Alto**: > 30%

### Interpretação

O sistema fornece:
- Score de risco percentual
- Categoria de risco
- Interpretação clínica detalhada
- Recomendações personalizadas

## 🎨 Design

O design foi baseado nas telas do Google Stitch, com foco em:

- Interface limpa e profissional
- Cores que indicam níveis de risco
- Navegação intuitiva
- Responsividade mobile-first

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Deploy automático!

### Outras Plataformas

O app é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker

## 🔒 Aviso Médico

> ⚠️ **IMPORTANTE**: Esta aplicação é uma ferramenta de auxílio à decisão clínica. Os resultados devem ser interpretados por profissional de saúde qualificado e não substituem avaliação clínica completa e individualizada.

## 📄 Licença

Este projeto é fornecido "como está" para fins educacionais e de demonstração.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**
