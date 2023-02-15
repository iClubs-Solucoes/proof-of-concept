FROM node:16-alpine3.14

ADD ["./package.json", "/package.json"]

RUN yarn install --ignore-engines --production=true
RUN find ./node_modules -mtime +10950 -exec touch {} +

ADD ["./dist", "/dist"]
RUN chmod 777 /dist
RUN chmod 777 /dist/*
RUN chmod 777 /package.json

CMD [ "node", "./dist/index.js" ]