FROM node:18.4.0-alpine3.15 as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json   /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY tsconfig.json  /usr/src/app/tsconfig.json
COPY src            /usr/src/app/src

RUN npm install

EXPOSE 4000
CMD [ "npm", "start" ]