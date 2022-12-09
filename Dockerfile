FROM node:18-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN apk add --no-cache --virtual builds-deps build-base python3
RUN npm i --omit=dev --ignore-scripts && npm i -D @nestjs/cli
COPY . /app
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
EXPOSE 5000
USER node
CMD ["node", "main.js"]
