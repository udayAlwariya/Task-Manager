FROM node:22-alpine

WORKDIR /app

# Copy only package.json first for better caching
COPY package.json package-lock.json ./

RUN npm ci

# Copy project files
COPY . .

# Expose React dev server port (CRA=3000, Vite=5173, Next=3000)
EXPOSE 3000

# Run dev server (make sure your dev script binds to 0.0.0.0)
CMD ["npm", "run", "dev"]