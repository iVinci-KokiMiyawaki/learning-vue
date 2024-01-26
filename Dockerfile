# Node.jsの公式イメージをベースにする
FROM node:latest

# アプリケーションのソースコードを格納するディレクトリを指定
WORKDIR /app

# パッケージ依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Vueアプリケーションをビルド
RUN npm run build

# アプリケーションを実行するためのポートを公開
EXPOSE 8080

# アプリケーションを起動
CMD ["npm", "run", "serve"]