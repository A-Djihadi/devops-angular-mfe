# Stage 1 : build Angular
FROM node:20-alpine AS builder
WORKDIR /app

COPY remote-app/package*.json ./
RUN npm ci --legacy-peer-deps

COPY remote-app/ ./
RUN npm run build

# Stage 2 : servir avec nginx
FROM nginx:1.25-alpine AS runtime

COPY --from=builder /app/dist/remote-app /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
