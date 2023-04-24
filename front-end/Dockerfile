FROM node:18.13.0 as build

WORKDIR /app
COPY package*.json ./

RUN npm install 
RUN npm install vite@4.2.2
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
