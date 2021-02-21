FROM nginx:alpine

COPY management /app/management
COPY ./docker/sit/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
