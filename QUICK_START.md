# Guia Rápido - Como Usar o App

## 🚀 Iniciar o Aplicativo

1. **Abra o terminal** na pasta do projeto:
   ```powershell
   cd C:\Users\Luciano\.gemini\antigravity\scratch\cardiorenal-app
   ```

2. **Inicie o servidor** (se ainda não estiver rodando):
   ```powershell
   npm run dev
   ```

3. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

## 📱 Navegação

### Página Inicial (Landing Page)
- **Hero Section**: Apresentação do app
- **Calculadoras**: PREVENT e KFRE (em breve)
- **Planos**: Gratuito, Básico e Premium
- **Botão "Iniciar Avaliação"**: Vai direto para a calculadora PREVENT

### Menu de Navegação
- **Home**: Volta para a landing page
- **Calculadoras**: Acessa a calculadora PREVENT
- **Resultados**: Mostra os últimos resultados calculados
- **Perfil**: (placeholder - em desenvolvimento)

## 🧮 Usar a Calculadora PREVENT

### Passo 1: Preencher Dados Demográficos
- **Idade**: Digite a idade do paciente (18-120 anos)
- **Sexo**: Selecione Masculino ou Feminino

### Passo 2: Dados Clínicos
- **Pressão Arterial Sistólica**: Em mmHg (ex: 130)
- **Colesterol Total**: Em mg/dL (ex: 200)
- **HDL Colesterol**: Em mg/dL (ex: 50)

### Passo 3: Fatores de Risco
Marque as caixas se aplicável:
- ☐ Diabetes Mellitus
- ☐ Tabagismo Atual
- ☐ Em uso de anti-hipertensivos

### Passo 4: Calcular
- Clique em **"Calcular Risco"**
- Você será redirecionado para a página de resultados

## 📊 Entender os Resultados

### Score de Risco
- Exibido em **porcentagem** (0-100%)
- Representa o risco de evento cardiovascular em **10 anos**

### Categorias de Risco
- 🟢 **Baixo**: < 10%
- 🟡 **Moderado**: 10-20%
- 🟠 **Alto**: 20-30%
- 🔴 **Muito Alto**: > 30%

### Interpretação Clínica
- Texto explicativo sobre o nível de risco
- Orientações gerais baseadas na categoria

### Dados do Paciente
- Resumo de todos os dados inseridos
- Fatores de risco destacados em badges coloridos

### Recomendações
- Lista numerada de orientações clínicas
- Personalizadas baseadas no perfil do paciente
- Incluem modificações de estilo de vida e considerações terapêuticas

## 🖨️ Imprimir Resultados

1. Na página de resultados, clique em **"Imprimir Resultado"**
2. O navegador abrirá a janela de impressão
3. Você pode:
   - Imprimir em papel
   - Salvar como PDF
   - Enviar para impressora

## 🔄 Nova Avaliação

1. Clique em **"Nova Avaliação"** na página de resultados
2. Ou use o menu **"Calculadoras"** no topo
3. O formulário será resetado para novo paciente

## 💡 Dicas

### Validação de Formulário
- Campos obrigatórios são validados automaticamente
- Mensagens de erro aparecem em vermelho abaixo dos campos
- Valores fora do intervalo aceitável são rejeitados

### Navegação Rápida
- Use o menu superior para navegar entre páginas
- O item ativo aparece com sublinhado azul

### Responsividade
- O app funciona em desktop, tablet e mobile
- Layout se adapta automaticamente ao tamanho da tela

## 🐛 Solução de Problemas

### O servidor não inicia
```powershell
# Reinstale as dependências
npm install

# Tente novamente
npm run dev
```

### Erro de compilação
```powershell
# Limpe o cache do Next.js
rm -rf .next

# Reinicie o servidor
npm run dev
```

### Página em branco
- Verifique o console do navegador (F12)
- Certifique-se de que está acessando `http://localhost:3000`
- Tente recarregar a página (Ctrl+R)

## 📝 Próximos Passos

### Para Desenvolvimento
1. Adicionar autenticação de usuários
2. Implementar banco de dados para salvar histórico
3. Adicionar calculadora KFRE
4. Criar dashboard do profissional
5. Implementar exportação de PDF

### Para Deploy
1. Criar repositório no GitHub
2. Fazer push do código
3. Conectar com Vercel
4. Deploy automático!

## 🔗 Links Úteis

- **Localhost**: http://localhost:3000
- **Documentação Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com

---

**Dúvidas?** Consulte o README.md principal do projeto!
