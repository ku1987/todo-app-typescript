FROM node:14

COPY package*.json ./

RUN npm install

RUN npm install -g knex

COPY . .

RUN ls
RUN pwd

ENV DB_PORT=5432
ENV DB_HOST=db
ENV DB_USER=todoapp
ENV DB_PASS=todoapp
ENV DB_NAME=todoapp

EXPOSE 3002

CMD ["npm", "start"]
