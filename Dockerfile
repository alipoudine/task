FROM node:19-alpine3.16 as builder

RUN  apk add curl bash

RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /home/node

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . /home/node/

RUN yarn build

RUN /usr/local/bin/node-prune

RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/

FROM node:19-alpine3.16

WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/yarn.lock /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/.env /home/node/dist/


CMD ["node", "dist/main.js"]
