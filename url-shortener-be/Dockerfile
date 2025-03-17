# Stage 1: Development Build Stage
FROM node:20.17.0-alpine AS development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:20.17.0-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG APP_PORT
ENV APP_PORT=${APP_PORT}

ARG APP_PACKAGE_JSON_PATH
ENV APP_PACKAGE_JSON_PATH=${APP_PACKAGE_JSON_PATH}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SHORTEN_BASE_URL
ENV SHORTEN_BASE_URL=${SHORTEN_BASE_URL}

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

ARG JWT_EXPIRATION
ENV JWT_EXPIRATION=${JWT_EXPIRATION}

ARG CLIENT_URL
ENV CLIENT_URL=${CLIENT_URL}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]