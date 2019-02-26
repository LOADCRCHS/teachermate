var WebSocket = require('faye-websocket'),
    http      = require('http');

var server = http.createServer();

server.on('upgrade', function(request, socket, body) {
    if (WebSocket.isWebSocket(request)) {
        var ws = new WebSocket(request, socket, body);
        console.log("request come...");
        ws.on('message', function(event) {
            console.log("message receive...")
            ws.send(event.data);
        });

        ws.on('close', function(event) {
            console.log('close', event.code, event.reason);
            ws = null;
        });

        setInterval(() => {ws.send("data");}, 2000); // 定时器，每间隔 2s 发送一个 "data"
    }
});

server.listen(8000);
console.log("server start...")