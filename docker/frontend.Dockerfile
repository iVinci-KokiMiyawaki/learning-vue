FROM node:20-alpine

USER node

WORKDIR /workspace/frontend

RUN mkdir node_modules

COPY --chown=node:node package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]