const express = require('express');
const helmet = require('helmet');
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;
const devices = new Map();
let deviceCount = 0;

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'wasm-unsafe-eval'", "'inline-speculation-rules'", "https://cdnjs.cloudflare.com"],
            "style-src": ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            "connect-src": ["'self'"],
            "img-src": ["'self'", "data:", "https://*.tile.openstreetmap.org", "https://cdnjs.cloudflare.com"],
            "font-src": ["'self'", "https://cdnjs.cloudflare.com"],
        },
    },
}));

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    deviceCount += 1;
    devices.set(socket.id, `Device ${deviceCount}`);

    socket.on("send-location", function(data){
        io.emit("receive-location", {
            id: socket.id,
            label: devices.get(socket.id),
            ...data,
        });
    });

    socket.on("disconnect", function(){
        devices.delete(socket.id);
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", function (req, res) {
    res.status(200).json({ status: "ok" });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
