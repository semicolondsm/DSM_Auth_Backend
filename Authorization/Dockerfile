FROM node:15.8.0-alpine3.10

WORKDIR /root

COPY . .

RUN npm install 
RUN npm audit fix
RUN npx tsc 
RUN npm run copyfile

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "./dist/server.js"]