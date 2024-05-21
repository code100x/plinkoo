# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React.js app
RUN npm run build

# Expose the port the app will run on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]