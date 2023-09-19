FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json .
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN npm ci
COPY ./prisma /app/prisma
RUN npx prisma generate
COPY . /app
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm i prisma
RUN npm ci --omit=dev --ignore-scripts
RUN npm rebuild
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
COPY --from=builder /app/dist ./
EXPOSE 5000
USER node
CMD ["npm", "run", "start:prod"]
