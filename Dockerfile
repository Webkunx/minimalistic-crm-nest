FROM node:14

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

RUN npm run start:prod