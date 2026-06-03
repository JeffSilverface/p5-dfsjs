# MDD Frontend

Application Next.js du projet MDD. Elle fournit l'interface utilisateur permettant de se connecter, consulter le fil d'articles, s'abonner a des themes, publier des articles, commenter et modifier son profil.

## Role Dans Le Projet

Le frontend consomme l'API NestJS situee dans `back/`.

URL locale par defaut : `http://localhost:3000`

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- React Query
- React Hook Form
- Zod
- Zustand
- Playwright

## Structure

```txt
front/
├── app/                  # Routes Next.js App Router
├── components/           # Composants UI
├── hooks/                # Hooks de donnees React Query
├── lib/                  # Client API, schemas, middleware
├── providers/            # Providers React
├── public/               # Assets statiques
├── store/                # Store Zustand
├── tests/                # Tests Playwright
└── types/                # Types TypeScript partages
```

## Configuration

Copier le fichier d'exemple :

```bash
cp front/.env.example front/.env
```

Variables disponibles :

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
TEST_USER_EMAIL="test@test.com"
TEST_USER_PASSWORD="Password1!"
```

`NEXT_PUBLIC_API_URL` pointe vers le backend NestJS. Les variables `TEST_USER_*` servent aux tests Playwright qui se connectent avec un utilisateur de test.

## Lancement

Depuis la racine :

```bash
pnpm --filter @p5-dfsjs/front dev
```

Depuis le dossier `front/` :

```bash
pnpm dev
```

## Scripts

| Commande | Description |
|---|---|
| `pnpm dev` | Lance Next.js en developpement |
| `pnpm build` | Build l'application |
| `pnpm start` | Lance l'application buildée |
| `pnpm lint` | Lance ESLint |
| `pnpm test` | Lance les tests Playwright |
| `pnpm test:ui` | Lance l'interface Playwright |

## Tests Playwright

Depuis la racine :

```bash
pnpm --filter @p5-dfsjs/front test
```

Les tests couvrent notamment :

- inscription
- connexion
- middleware et redirections
- posts
- posts mockes
- themes
- abonnements
- abonnements mockes
- profil
- securite API

Les tests e2e classiques utilisent le backend et la base de donnees. Les tests `*.mock.spec.ts` interceptent les appels reseau pour tester certains parcours frontend sans dependance directe a la base.

## Pages Principales

| Route | Description |
|---|---|
| `/` | Page d'accueil |
| `/login` | Connexion |
| `/register` | Inscription |
| `/feed` | Fil d'articles |
| `/topics` | Liste des themes |
| `/post/new` | Creation d'article |
| `/post/[id]` | Detail d'un article |
| `/profile` | Profil utilisateur |

## Authentification Cote Frontend

Le frontend s'appuie sur le cookie de session cree par le backend. Le middleware Next.js protege les routes privees et redirige les utilisateurs non authentifies vers l'accueil.
