FROM node:14.17.0-alpine3.12

WORKDIR /app

COPY . .

RUN yarn install --production

CMD ["node","src/index.js"]


