# syntax=docker/dockerfile:1

FROM node:14.17.4

ENV NODE_ENV=production
ENV DB_CONNECT = mongodb://mongo:27017/url-shortner

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "app.js" ]


