# Use Node.js 18 on Alpine Linux
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Update npm to version 9
RUN npm install -g npm@9

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the application's port
EXPOSE 80

# Start the application
CMD ["npm", "run", "start"]
