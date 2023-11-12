# Use an official Node.js runtime as a parent image
FROM node:18.18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY ./air-app/package*.json ./
RUN npm install

# Bundle your app source
#COPY air-app .

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]
