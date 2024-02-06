FROM node:latest
COPY . /app


WORKDIR /app/bundle


EXPOSE 3000

CMD ["node", "main.js"]
