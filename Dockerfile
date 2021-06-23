# Build
FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn
COPY public public
COPY src src
COPY tsconfig.json ./
RUN yarn build

# Nginx
FROM nginx:stable-alpine
EXPOSE 80 443
COPY --from=builder /app/build /usr/share/nginx/html