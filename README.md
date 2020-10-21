# http-to-websocket-proxy

Проксирует HTTP запросы в websocket

Приложение принимает GET и POST запросы по адресу http://[Ваш IP адрес]:8081/external и дублирует запрос в websocket сервер, к которому можно подключиться ws://[Ваш IP адрес]:8081

### Установка

Приложению требуется [Node.js](https://nodejs.org/) v6+ to run.

Установите зависимости и запустите сервер.

```sh
$ cd http-to-websocket-proxy
$ npm install -d
$ node server.js
```