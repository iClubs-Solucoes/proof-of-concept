# FROM node:12.22.12
FROM node:lts-alpine3.14
ADD ./src /src
ADD ./package.json /package.json
ADD ./tsconfig.json /tsconfig.json
RUN npm i
RUN npx tsc
RUN rm -rf ./src
RUN rm -rf ./node_modules
RUN mv ./build ./src
RUN chmod 777 /src
RUN chmod 777 /src/*
RUN chmod 777 /package.json
RUN npm i -P