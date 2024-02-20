FROM node:20-alpine

USER node

WORKDIR /home/node/app

COPY --chown=node:node frontend/package*.json ./

RUN npm install

COPY --chown=node:node frontend/ .

CMD ["npm", "run", "dev"]