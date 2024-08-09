FROM node:20-alpine

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]