# http-to-websocket-proxy

Проксирует HTTP запросы в websocket

Приложение принимает GET и POST запросы по адресу http://[Ваш IP адрес]:8081/external и дублирует запрос в websocket сервер, к которому можно подключиться ws://[Ваш IP адрес]:8081

### Установка

Приложению требуется [Node.js](https://nodejs.org/) v6+ для запуска.

Установите зависимости и запустите сервер.

```sh
$ cd http-to-websocket-proxy
$ npm install -d
$ node server.js
```

Для проксирования при помощи nginx используйте следующий конфиг. Вебсокет так же работает.

```
upstream my_upstream {
    server 127.0.0.1:8081;
    keepalive 64;
}
server {
    listen 80;
    server_name _default;
    error_log /var/log/nginx/proxy.log;
    access_log /var/log/nginx/proxy_access.log;
    gzip on;
    gzip_proxied any;
    location /external {
    	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    	proxy_set_header X-Real-IP $remote_addr;
    	proxy_set_header Host $http_host;
    	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "upgrade";
    	proxy_pass http://my_upstream;
	proxy_redirect off;
	proxy_read_timeout 240s;
    }
}
```