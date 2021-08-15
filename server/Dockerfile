FROM node:14

COPY package*.json ./

RUN npm install

RUN npm install -g knex

COPY . .

RUN ls
RUN pwd

ENV DB_PORT=5432
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_NAME=${DB_NAME}

EXPOSE 3002

CMD ["npm", "start"]
