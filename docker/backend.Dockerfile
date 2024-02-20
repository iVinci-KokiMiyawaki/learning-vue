FROM node:20-alpine

USER node

WORKDIR /home/node/app

COPY --chown=node:node backend/package*.json ./

RUN npm install

COPY --chown=node:node backend/ .

RUN npx prisma generate

CMD ["npm", "run", "dev"]