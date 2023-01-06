FROM node:14-alpine
WORKDIR /app
COPY . .

RUN apk add python3
RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
