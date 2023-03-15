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

// Evento referente a conexão de um socket cliente com o servidor socket
io.on("connection", (socket: any) => {
    console.log(`${socket.id} is connected.`);

    // Evento de recebimento de imagens
    socket.on("images", (images: any) => {
        console.log(`Imagens recebidas de ${socket.id}`);
        
        // Evento emit que envia uma resposta ao socket cliente que recebeu as imagens com sucesso
        socket.emit("server_response", 'Imagens recebidas com sucesso');

        // TODO - criar emit que enviará para a DrowsyAPI
    });
});

// Servidor socket estará escutando a porta 3001
server.listen(3001);
