# 環境設定

## Backend

### 構成

- Node.js
- Express
- Prisma
- TypeScript

### 初期設定

```bash
$ docker-compose build

# Prismaの生成コマンド
$ docker compose run --rm backend npx prisma generate

$ docker-compose up

$ docker compose run --rm backend npx prisma db push

$ docker compose run --rm backend npx prisma db seed
```

## Frontend

### 構成

- Vue3
  - Pinia
  - Tailwind CSS
- Vite
- ESLint
- Prettier

## DB

### 構成

- PostgreSQL
