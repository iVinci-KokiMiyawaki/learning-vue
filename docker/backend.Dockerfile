FROM node:20.11.0

WORKDIR /workspace/backend

COPY ../backend/ ./

COPY package*.json ./

RUN npm install

# コンテナ起動時に実行するコマンド
CMD [ "npm", "run", "dev" ]


# FROM node:20-alpine

# USER node

# WORKDIR /workspace/backend

# RUN mkdir node_modules

# COPY --chown=node:node package*.json ./

# RUN npm install

# CMD [ "npm", "run", "dev" ]