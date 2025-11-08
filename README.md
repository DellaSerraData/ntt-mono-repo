# NTT Monorepo

Uma estrutura de monorepo organizada para desenvolvimento de aplicações web (Angular) e APIs (NestJS), otimizada para deploy no Vercel.

## 🏗️ Estrutura

```
.
├── apps/
│   ├── web/           # Aplicação Angular (Frontend)
│   └── api/           # Aplicação NestJS (Backend)
├── package.json       # Configuração do monorepo e workspaces
├── tsconfig.base.json # Configuração TypeScript compartilhada
├── .prettierrc       # Configuração Prettier
├── .editorconfig     # Configurações do editor
└── .gitignore        # Ignorar arquivos do Git
```

## 🚀 Objetivos

- **Organização**: Monorepo com web (Angular) e api (NestJS)
- **Deploy**: Preparado para dois projetos independentes na Vercel (Root Directory por app)
- **Padronização**: Scripts, lint/format e estrutura consistente entre apps
- **Workspaces**: Gerenciamento eficiente de dependências com npm workspaces

## 🛠️ Tecnologias

- **Frontend**: Angular 17 (SPA com roteamento e SCSS)
- **Backend**: NestJS 11 (framework Node.js)
- **ORM**: Prisma (com Supabase)
- **Linting**: ESLint
- **Formatting**: Prettier
- **TypeScript**: Configuração base compartilhada

## 📋 Pré-requisitos

- Node.js >= 18
- npm ou pnpm
- Git
- Conta no GitHub/GitLab
- Projeto Supabase (Postgres) - para desenvolvimento da API
- Conta na Vercel

## 🔧 Instalação e Desenvolvimento

### 1. Clonar o repositório
```bash
git clone <seu-repositorio>
cd ntt-monorepo
```

### 2. Instalar dependências
```bash
# Instalar dependências do monorepo
npm install

# Instalar dependências dos workspaces (opcional, workspaces fazem isso automaticamente)
npm run -w apps/web install
npm run -w apps/api install
```

### 3. Desenvolvimento

#### Executar aplicação web (Angular)
```bash
npm run -w apps/web start
# ou
cd apps/web && npm start
```

#### Executar API (NestJS)
```bash
npm run dev
# ou
npm run -w apps/api start:dev
```

#### Build de ambos os projetos
```bash
npm run build
```

## 📝 Scripts Disponíveis

### Raiz do monorepo
- `npm run build` - Build de ambos os projetos
- `npm run dev` - Executa API em modo desenvolvimento
- `npm run format` - Formatação com Prettier
- `npm run lint` - Linting com ESLint

### Angular (apps/web)
- `npm start` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run watch` - Build com watch mode
- `npm test` - Executar testes

### NestJS (apps/api)
- `npm start` - Executar aplicação
- `npm run start:dev` - Executar em modo desenvolvimento
- `npm run start:prod` - Executar build de produção
- `npm test` - Testes unitários
- `npm run test:e2e` - Testes end-to-end

## 🌐 Configuração para Vercel

### Deploy da Aplicação Web (Angular)
1. Acesse [Vercel](https://vercel.com)
2. Importe o repositório
3. Configure o projeto:
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/web`

### Deploy da API (NestJS)
1. Na mesma conta Vercel, crie um novo projeto
2. Configure:
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## 🔧 Variáveis de Ambiente

### Aplicação Web (apps/web)
- `API_BASE_URL` - URL da API em produção

### API (apps/api)
- `DATABASE_URL` - URL do banco de dados Supabase
- `DIRECT_URL` - URL direta do Supabase
- `WEB_ORIGIN` - URL da aplicação web para CORS

## 🏷️ Convenções

### Commits
Utilize Conventional Commits:
- `chore:` - Mudanças de configuração
- `web:` - Mudanças no frontend
- `api:` - Mudanças no backend
- `db:` - Mudanças no banco de dados
- `infra:` - Mudanças de infraestrutura
- `docs:` - Documentação

### Estrutura de Pastas
- **Features por domínio** dentro de cada app
- **Separation of Concerns** clara entre web e api

### Configurações Compartilhadas
- **TypeScript**: `tsconfig.base.json`
- **Editor**: `.editorconfig`
- **Formatting**: `.prettierrc`
- **Linting**: `eslint.config.mjs`

## ✅ Validações

Execute estas verificações para garantir que tudo está funcionando:

```bash
# Build do Angular
npm run -w apps/web build

# Build da API
npm run -w apps/api build

# Verificar workspaces
npm ls -w

# Status do Git
git status
```

## 🚀 Próximos Passos

1. **Configurar Prisma** na API
2. **Configurar Supabase** como banco de dados
3. **Implementar autenticação** (JWT)
4. **Configurar CI/CD** no GitHub Actions
5. **Adicionar testes** de integração
6. **Configurar monitoramento** de performance

## 📚 Recursos Adicionais

- [Angular Documentation](https://angular.io/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces)

---

**Desenvolvido com ❤️ usando Angular + NestJS + Vercel**