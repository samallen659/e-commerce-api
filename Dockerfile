FROM node:20.2.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./
COPY src ./

EXPOSE 8080

CMD ["/bin/bash","-c","./startup.sh"]

