# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /MicroLearning

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install apt-get install -y postgresql

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application listens on
EXPOSE 3000 
EXPOSE 5432

# Define the command to run your application
CMD npx prisma generate --schema=./src/prisma/schema.prisma && npx prisma migrate dev --schema=./src/prisma/schema.prisma && node ./src/index.js 

