'use strict';

const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const bodyParser = require('body-parser');

const port = 8081;
const host = '127.0.0.1';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(bodyParser.json());

wss.on('connection', (ws) => {
    console.log('establish websocket connection');
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
});

app.get('/external', (req, res) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(req.query));
        }
    });
    res.sendStatus(200);
});
app.post('/external', (req, res) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.sendStatus(200);
});

server.listen(port, host, () => console.log('http server is listening on http://'+host+':'+port));