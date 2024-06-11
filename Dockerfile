FROM node:17-alpine

COPY package*.json ./
RUN npm install

COPY dingify.js /dingify.js

CMD ["node", "--experimental-fetch", "/dingify.js"]
