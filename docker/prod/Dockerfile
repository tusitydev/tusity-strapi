FROM node:18-alpine

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev dumb-init

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node
COPY ./package.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install --unsafe-perm

WORKDIR /home/node/app
COPY ./ .

RUN npm run build

EXPOSE 1337

CMD ["dumb-init", "npm", "run", "start"]
