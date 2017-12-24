FROM node:carbon

WORKDIR /user/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9020
CMD [ "npm", "start" ]