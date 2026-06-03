# MDD Backend

API NestJS du projet MDD. Elle gere l'authentification, les sessions, les utilisateurs, les themes, les abonnements, les articles et les commentaires.

## Role Dans Le Projet

Le backend expose une API HTTP consommee par l'application Next.js situee dans `front/`.

URL locale par defaut : `http://localhost:3001`

## Stack

- NestJS 11
- TypeScript
- Prisma
- PostgreSQL
- Passport local
- express-session
- connect-pg-simple
- bcrypt
- Zod
- Jest et Supertest

## Structure

```txt
back/
├── prisma/
│   ├── schema.prisma       # Modele de donnees
│   ├── migrations/         # Migrations Prisma
│   └── seed.ts             # Donnees de demonstration
├── src/
│   ├── common/             # Guards, decorators, filters
│   ├── features/
│   │   ├── auth/           # Inscription, connexion, profil, session
│   │   ├── comments/       # Commentaires d'articles
│   │   ├── posts/          # Articles
│   │   └── topics/         # Themes et abonnements
│   ├── prisma/             # PrismaService
│   ├── scripts/            # Scripts utilitaires pour les tests e2e
│   ├── app.module.ts
│   └── main.ts
└── package.json
```

## Configuration

Copier le fichier d'exemple :

```bash
cp back/.env.example back/.env
```

Variables attendues :

```env
PORT=3001
DATABASE_URL="postgresql://mdd_user:mdd_password@localhost:5432/mdd_db?schema=public"
SESSION_SECRET="change-me-in-local-dev"
FRONTEND_URL="http://localhost:3000"
```

Si le backend est lance depuis la racine avec `pnpm dev`, les variables peuvent aussi etre fournies par l'environnement du shell.

## Base De Donnees

Depuis la racine du projet :

```bash
pnpm docker:up
pnpm prisma generate
pnpm prisma migrate deploy
pnpm prisma db seed
```

## Lancement

Depuis le dossier `back/` :

```bash
pnpm dev
```

## Scripts

| Commande          | Description                              |
| ----------------- | ---------------------------------------- |
| `pnpm dev`        | Lance le backend avec nodemon            |
| `pnpm build`      | Compile l'API NestJS                     |
| `pnpm start`      | Lance NestJS                             |
| `pnpm start:prod` | Lance la version compilee                |
| `pnpm lint`       | Lance ESLint avec correction automatique |
| `pnpm test`       | Lance les tests Jest                     |
| `pnpm test:watch` | Lance Jest en mode watch                 |
| `pnpm test:cov`   | Genere la couverture de tests            |

## Tests

```bash
pnpm test
pnpm test:cov
```

La couverture exclut les fichiers qui ne portent pas de logique metier directe :

- `main.ts`
- `*.module.ts`
- `src/scripts/**`

## Endpoints Principaux

| Domaine  | Endpoints                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------- |
| Auth     | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `PATCH /auth/profile` |
| Posts    | `GET /posts`, `GET /posts/:id`, `POST /posts`                                                         |
| Topics   | `GET /topics`, `POST /topics/:id/subscribe`, `DELETE /topics/:id/subscribe`                           |
| Comments | `GET /posts/:id/comments`, `POST /posts/:id/comments`                                                 |

## Securite

- Sessions serveur avec cookie HTTP-only
- Stockage des sessions en PostgreSQL via `connect-pg-simple`
- Hash des mots de passe avec bcrypt
- Guard global NestJS pour proteger les routes privees
- Decorateur `@Public()` pour les routes publiques
- CORS limite a `FRONTEND_URL`
- Validation Zod des donnees entrantes
