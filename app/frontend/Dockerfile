# syntax=docker/dockerfile:1

# NODE
FROM node:alpine3.17 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM development AS build
RUN npm run build

# NGINX
FROM nginx:1.22.0-alpine
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]