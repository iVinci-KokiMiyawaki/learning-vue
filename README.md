# 環境設定

## Backend

### 構成

- Node.js
- Express
- Prisma
- TypeScript

### 初期設定

#### Prisma

```bash
# Dockerコンテナのビルドを行います。
# docker-compose.ymlに定義されたサービスのイメージがビルドされます。
$ docker-compose build

# Prismaのクライアントを生成します。
# このコマンドはPrismaスキーマからPrismaクライアントを生成し、
# データベースとのやり取りを行うためのコードを生成します。
# --rmフラグは、コマンド実行後にコンテナを自動的に削除します。
$ docker compose run --rm backend npx prisma generate

# Dockerコンテナを起動します。
# docker-compose.ymlに定義されたサービスが起動されます。
$ docker-compose up

# データベーススキーマの変更をデータベースに反映します。
# Prismaスキーマファイルの変更をデータベースにプッシュし、
# スキーマの変更やマイグレーションを適用します。
$ docker compose run --rm backend npx prisma db push

# データベースシーディングを実行します。
# Prismaのシードスクリプトを実行し、データベースに初期データを投入します。
$ docker compose run --rm backend npx prisma db seed
```

#### Supabase

```bash
# ./backend

# Supabaseローカル環境を起動します。
# これにより、Supabaseのサービス（データベース、認証など）がローカルで動作します。
$ npx supabase start

# ローカル環境のSupabaseのデータベースURLを.envファイルにコピーします。
# その後、ルートディレクトリでPrismaのマイグレーションを実行し、
# データベーススキーマを初期化します。
$ npx prisma migrate dev --name init

# Supabaseのマイグレーションファイルを生成します。
# これにより、ローカルのデータベース変更をSupabaseのマイグレーション形式で保存します。
$ npx supabase db diff -f init

# Supabaseのリモートサービスにログインします。
# ブラウザが開いて、Supabaseアカウントでの認証が必要になります。
$ npx supabase login

# ローカルのデータベースをリモートのSupabaseプロジェクトにリンクします。
# リンクするためには、SupabaseプロジェクトのIDとパスワードの入力が必要です。
$ npx supabase link --project-ref [project_id]

# ローカルのデータベース変更をリモートのSupabaseプロジェクトに反映します。
# これにより、ローカルでの変更がSupabaseのリモートデータベースに適用されます。
$ npx supabase db push
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
