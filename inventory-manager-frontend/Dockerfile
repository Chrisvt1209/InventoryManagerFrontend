# STAGE 1: Build
# Use the latest LTS version of Node.js
FROM node:20-alpine AS build
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Define the command to run your app
RUN npm run build

# STAGE 2: Run
# Use the official Nginx image as the base image
FROM nginx:latest AS production

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

# Copy the build output from the build stage to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port your app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]