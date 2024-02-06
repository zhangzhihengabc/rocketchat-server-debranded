FROM node:latest
COPY . /app
USER rocketchat

WORKDIR /app/bundle

# needs a mongoinstance - defaults to container linking with alias 'db'
ENV DEPLOY_METHOD=docker-official \
  MONGO_URL=mongodb://db:27017/meteor \
  HOME=/tmp \
  PORT=3000 \
  ROOT_URL=http://localhost:3000 \
  Accounts_AvatarStorePath=/app/uploads

EXPOSE 3000

CMD ["node", "main.js"]
