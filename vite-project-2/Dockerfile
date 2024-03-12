# Building the applicaiton for production
FROM node:20-buster-slim AS build

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/app/.npm \
  npm set cache /app/.npm && \
  npm install

COPY . .

RUN npm run build

FROM nginx:1-alpine-slim AS prod

COPY --from=build /app/dist /usr/share/nginx/html


# Run the application for development mode
FROM node:20-buster-slim AS dev

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/app/.npm \
  npm set cache /app/.npm && \
  npm install
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]