
#Dockerfile for the server

# Use the official image as a parent image

FROM node:18

# Set the working directory

WORKDIR /usr/src/app

# Copy the file from your host to your current location

COPY package*.json ./

# Run the command inside your image filesystem

RUN npm install

# Inform Docker that the container listens on the specified network ports at runtime

EXPOSE 3000

# Run the specified command within the container

CMD [ "npm", "dev" ]

