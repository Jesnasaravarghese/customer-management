#Dockerfile for Customer Management
FROM node:12.13.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD node index.js

EXPOSE 8081

Build Docker 