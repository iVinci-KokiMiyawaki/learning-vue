FROM node:20.11.0

WORKDIR /workspace/frontend

COPY ../frontend/ ./

RUN npm install

# コンテナ起動時に実行するコマンド
CMD [ "npm", "run", "dev" ]