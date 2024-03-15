FROM node:20
LABEL author="Suhyun Park <me@shiftpsh.com>"

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

COPY . .

RUN yarn install --pure-lockfile --non-interactive
RUN yarn build

WORKDIR /usr/src/app
ENV NODE_ENV production
RUN npx prisma generate
RUN yarn build

CMD [ "yarn", "start:prod" ]