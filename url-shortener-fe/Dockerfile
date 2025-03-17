# Stage 1: Development Build Stage
FROM node:20.17.0-alpine AS development

WORKDIR /usr/src/app

ARG VITE_NODE_ENV=production
ENV VITE_NODE_ENV=${VITE_NODE_ENV}

ARG VITE_SERVER_API_URL
ENV VITE_SERVER_API_URL=${VITE_SERVER_API_URL}

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine AS production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=development /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
