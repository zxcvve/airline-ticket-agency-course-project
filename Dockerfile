# Use an official Node.js runtime as a parent image
FROM node:20.9.0-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies and build
COPY . .
RUN npm install && npm run build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "start"]
