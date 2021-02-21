FROM nginx:alpine

COPY approval /app/approval
COPY ./docker/dev/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
