FROM openresty/openresty:1.21.4.1-0-jammy

RUN opm --install-dir=/usr/local/openresty get knyar/nginx-lua-prometheus

COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

EXPOSE 9145
