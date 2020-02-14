FROM node:12-alpine

RUN npm install react-scripts@3.0.1 -g --silent

RUN mkdir /app
WORKDIR /app

COPY ./src /app/src
COPY ["package.json", "yarn.lock", "./"]
ENV NODE_PATH=/app/node_modules
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install
CMD yarn start
