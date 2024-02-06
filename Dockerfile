# Use Node.js base image with specified version
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server files to the app directory
COPY . .

# Expose port 3000 (assuming your server listens on this port)
EXPOSE 3000

# Command to run your Node.js server
CMD ["node", "main.js"]
