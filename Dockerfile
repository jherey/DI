FROM node:10-alphine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
