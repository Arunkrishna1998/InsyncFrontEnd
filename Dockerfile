FROM node:18.16-alpine
WORKDIR /node_front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build