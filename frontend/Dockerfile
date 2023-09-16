FROM node:16.20.1-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm build

FROM node:16.20.1-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
ENTRYPOINT ["serve", "-s", "build"]