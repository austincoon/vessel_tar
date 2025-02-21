# ./frontend/Dockerfile
FROM node:18

WORKDIR /app

# Copy only package files to install dependencies
COPY package*.json ./
RUN npm install

# Expose React's dev server port
EXPOSE 3000

# For file-watching in many Docker environments
ENV CHOKIDAR_USEPOLLING=true

# Run React in dev mode
CMD ["npm", "start"]
