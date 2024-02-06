FROM node:latest
COPY . /app
USER rocketchat

WORKDIR /app/bundle


EXPOSE 3000

CMD ["node", "main.js"]
