FROM node:20-bullseye

WORKDIR /app

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "npm", "start" ]