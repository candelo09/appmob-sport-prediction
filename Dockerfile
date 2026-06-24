FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD ["npx", "expo", "start", "--web", "--host", "lan", "--port", "8082"]