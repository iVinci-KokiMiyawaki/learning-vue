FROM node:20.11.0

WORKDIR /workspace/backend

COPY ../backend/ ./

COPY package*.json ./

RUN npm install

# コンテナ起動時に実行するコマンド
CMD [ "npm", "run", "dev" ]