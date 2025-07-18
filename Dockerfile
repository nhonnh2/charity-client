# Stage 1: Build
FROM node:18-alpine AS builder

# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++ git libc6-compat

# Set python to python3 for node-gyp
ENV PYTHON=/usr/bin/python3

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["yarn", "start"]