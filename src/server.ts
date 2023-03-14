const app = require("./index");
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8,
});

io.on("connection", (socket: any) => {
    console.log(`${socket.id} is connected.`);

    socket.on("images", (images: any) => {
        console.log(`Imagens recebidas de ${socket.id}`);

        socket.emit("server_response", `Imagens recebidas com sucesso`);
    });
});

server.listen(3001);
