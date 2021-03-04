FROM node:15.8.0-alpine3.10

WORKDIR /root

COPY . .

RUN npm install 
RUN npx tsc 
RUN npm run copyfile

ENV NODE_ENV production

EXPOSE 8080

CMD ["node", "./dist/server.js"]