

# Base image with Node.js
#FROM node:latest
FROM node:16-alpine

# Install FFmpeg
# RUN apt-get update && apt-get install -y ffmpeg
RUN apk update && apk add ffmpeg

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose any necessary ports (if applicable)
EXPOSE 3000 5001

# Start the application
CMD [ "npm", "start" ]

# FROM node:16-alpine
# WORKDIR /app
# ADD . .
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "start"]