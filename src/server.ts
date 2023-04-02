const app = require("./index");
const { Server } = require("socket.io");
const http = require("http");
let imageData = "";

let client1 = null;
let client2 = null;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8,
});

io.on("connection", (socket: { id: any; on: (arg0: string, arg1: { (data: any): void; (response: any): void; }) => void; }) => {
  console.log(`${socket.id} is connected.`);

  socket.on("process-image", (data: any) => {
    console.log(`Imagens recebidas de ${socket.id}`);
    io.emit("server_to_drowsy", data);
  });

  socket.on("notify-status", (response: any) => {
    console.log(response)
  });
});

module.exports = { server, io };
