FROM node:18-alpine

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source code
COPY . .

EXPOSE 5000

CMD ["npm", "start"]