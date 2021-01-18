#Dockerfile for Customer Management
FROM node:12.13.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

CMD node app.js

EXPOSE 8081



 