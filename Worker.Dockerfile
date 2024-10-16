FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN rm -rf src

RUN npx prisma generate

CMD [ "npm", "run", "worker" ]