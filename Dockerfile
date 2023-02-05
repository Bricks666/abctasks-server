FROM node:18-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN npm install
COPY ./prisma /app/prisma
RUN npx prisma generate
COPY . /app
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 5000
USER node
CMD ["npm", "run", "start:prod"]
