# Rock Exploration

API para cadastro e gerenciamento de bandas locais do estado de Pernambuco. O objetivo é reunir informações sobre bandas em um só lugar, facilitando a visibilidade e a organização para eventos e fãs.

## 🚀 Tecnologias Utilizadas no Backend

- **Next.js 14.2.28**
- **TypeScript**
- **Prisma ORM 6**
- **PostgreSQL (via Docker)**
- **Zod (validação)**
- **Bcrypt (hash de senhas)**
- **JWT (autenticação)**

## 📄 Funcionalidades

- Cadastro de usuários (bandas)
- Criação de formulário com dados da banda:
  - Nome da banda ( Garantia de nome de banda único )
  - Estilo musical
  - Release
  - Lista de músicas (setlist)
  - Integrantes (nome e instrumento )
  - Contato ( Cadastra email e 2 numeros para contato )
  - Link da imagem ( Cadastra uma imagem da banda, a logo e o mapa de palco )
- Validação do tempo total das músicas (mínimo 40min, máximo 60min)
- Busca do formulário da banda por ID do usuário

## 📦 Instalação

1. Clone o projeto:

```bash

   git clone (https://github.com/J27mendes/rock-exploration.git)
```

## 📌 Endpoints

### POST`/api/users/signup`

### POST `/api/users/login`

### UPDATE & DELETE `/api/users/me`

### POST `/api/users/bandform`

### UPDATE `/api/users/bandform`

### GET `/api/users/bandform`

### DELETE `/api/users/bandform`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 Licença

MIT © [Jessé Mendes]
