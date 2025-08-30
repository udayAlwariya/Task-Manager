FROM node:22-alpine as build
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]