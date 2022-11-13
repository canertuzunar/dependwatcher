FROM node:alpine

WORKDIR /dependbot/app

RUN yarn install

COPY . .

CMD ["yarn", "start"]