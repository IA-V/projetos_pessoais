FROM node:22-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npx prisma init

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]