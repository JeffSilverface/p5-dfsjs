# MDD - Monde de Dev

MDD est un reseau social pour developpeurs. L'application permet de creer un compte, se connecter, s'abonner a des themes de programmation, publier des articles et echanger via des commentaires.

Depot GitHub : [JeffSilverface/p5-dfsjs](https://github.com/JeffSilverface/p5-dfsjs)

## Fonctionnalites

- Inscription et connexion utilisateur
- Session utilisateur avec cookie HTTP-only
- Modification du profil
- Liste des themes disponibles
- Abonnement et desabonnement a des themes
- Fil d'articles
- Creation d'articles
- Consultation d'un article et de ses commentaires
- Ajout de commentaires
- Protection des routes cote frontend et backend

## Stack Technique

| Partie          | Technologies                                                           |
| --------------- | ---------------------------------------------------------------------- |
| Frontend        | Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, React Query |
| Backend         | NestJS 11, TypeScript, Passport, express-session                       |
| Base de donnees | PostgreSQL 17                                                          |
| ORM             | Prisma                                                                 |
| Validation      | Zod                                                                    |
| Tests           | Jest, Supertest, Playwright                                            |
| Outillage       | pnpm workspace, Docker Compose                                         |

## Structure Du Projet

```txt
p5-dfsjs/
├── front/                 # Application Next.js
│   ├── app/               # App Router
│   ├── components/        # Composants UI
│   ├── hooks/             # Hooks React Query
│   ├── lib/               # API client, schemas, middlewares
│   └── tests/             # Tests Playwright
├── back/                  # API NestJS
│   ├── prisma/            # Schema, migrations, seed
│   └── src/
│       ├── common/        # Guards, decorators, filters
│       ├── features/      # Auth, posts, topics, comments
│       └── scripts/       # Scripts de test
├── docker-compose.yml     # PostgreSQL local
├── pnpm-workspace.yaml
└── package.json
```

## Prerequis

- Node.js 20 ou superieur
- pnpm 9 ou superieur
- Docker et Docker Compose

## Installation

```bash
git clone https://github.com/JeffSilverface/p5-dfsjs.git
cd p5-dfsjs
pnpm install
```

## Configuration

Creer un fichier `.env` a la racine du projet.

Exemple de configuration locale :

```env
# PostgreSQL Docker
POSTGRES_USER=mdd_user
POSTGRES_PASSWORD=mdd_password
POSTGRES_DB=mdd_db

# Backend
DATABASE_URL="postgresql://mdd_user:mdd_password@localhost:5432/mdd_db?schema=public"
SESSION_SECRET="change-me-in-local-dev"
FRONTEND_URL="http://localhost:3000"
PORT=3001

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Tests e2e
TEST_USER_EMAIL="test@test.com"
TEST_USER_PASSWORD="Password1!"
TEST_USER_USERNAME="testuser"
```

## Base De Donnees

Lancer PostgreSQL avec Docker Compose :

```bash
pnpm docker:up
```

Generer le client Prisma et appliquer les migrations :

```bash
cd /back
pnpm prisma generate
pnpm prisma migrate deploy
```

Remplir la base avec des donnees de demo :

```bash
cd /back
pnpm prisma db seed
```

## Lancement En Developpement

Depuis la racine du projet :

```bash
pnpm dev
```

Cette commande lance :

- PostgreSQL via Docker Compose
- le backend NestJS sur `http://localhost:3001`
- le frontend Next.js sur `http://localhost:3000`

## Scripts Utiles

| Commande                                | Description                             |
| --------------------------------------- | --------------------------------------- |
| `pnpm dev`                              | Lance Docker, le frontend et le backend |
| `pnpm build`                            | Build le frontend et le backend         |
| `pnpm lint`                             | Lance le lint sur les workspaces        |
| `pnpm docker:up`                        | Lance PostgreSQL                        |
| `pnpm docker:down`                      | Arrete les conteneurs Docker            |
| `pnpm --filter @p5-dfsjs/back test`     | Lance les tests backend                 |
| `pnpm --filter @p5-dfsjs/back test:cov` | Genere la couverture backend            |
| `pnpm --filter @p5-dfsjs/front test`    | Lance les tests Playwright              |

## Tests

### Backend

Les tests backend utilisent Jest et Supertest.

```bash
cd /back
pnpm test
pnpm test:cov
```

La couverture exclut les fichiers de bootstrap et de configuration comme `main.ts`, les `*.module.ts` et les scripts de maintenance.

### Frontend

Les tests frontend utilisent Playwright.

```bash
cd /front
pnpm test
```

Les tests couvrent notamment :

- l'inscription et la connexion
- les redirections du middleware
- les posts
- les themes
- les abonnements
- le profil
- les controles de securite API

Certains tests Playwright utilisent une API mockee afin de verifier les parcours frontend sans dependre directement de la base de donnees.

## Modele De Donnees

Le modele Prisma repose sur les entites principales suivantes :

- `User` : utilisateur inscrit
- `Topic` : theme de programmation
- `Article` : article publie par un utilisateur
- `Comment` : commentaire associe a un article
- `Subscription` : abonnement d'un utilisateur a un theme

Les abonnements sont proteges par une cle composee `userId/topicId`, ce qui evite les doublons.

## Securite

- Mot de passe hash avec bcrypt
- Sessions stockees cote serveur avec `express-session`
- Cookie HTTP-only
- CORS configure pour le frontend
- Protection des routes backend via guards NestJS
- Protection des pages frontend via middleware Next.js
- Validation des entrees avec Zod
- Tests API verifiant les acces non authentifies

## Licence

Projet realise dans un cadre de formation.
