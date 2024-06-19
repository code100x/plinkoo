FROM node:20-alpine

WORKDIR /app

COPY package* ./

RUN npm i
RUN npm i typescript

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]