# Use the official Node.js image as a base
FROM node:23.4

# Set Working Directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y git && \
  rm -rf /var/lib/apt/lists/*;

# Clone Source
RUN git clone --depth=1 https://github.com/Kurumi-Tokito/pass-mn.git -b master /app

# Install & Build React Project
RUN yarn install

# Expose the port
EXPOSE 3000

# Start the React application
CMD ["yarn", "start"]
