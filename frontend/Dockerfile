FROM node:22-alpine AS frontend-build
WORKDIR /task-manager/frontend
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
