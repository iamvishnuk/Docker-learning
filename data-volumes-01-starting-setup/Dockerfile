FROM node

ARG DEFAULT_PORT=8080

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]