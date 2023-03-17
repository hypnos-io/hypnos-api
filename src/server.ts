const app = require("./index");
const { Server } = require("socket.io");
const http = require("http");
let imageData = "";

let client1: { emit: (arg0: string, arg1: string) => void; } | null = null;
let client2 = null;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8,
});

// This event refers to the connections between hypnos and the two clients
io.on("connection", (socket: any) => {
    console.log(`${socket.id} is connected.`);

    // This function is getting the images from the front end application and sending them to drowsy api
    socket.on("sendFrame", (data: any) => {
        console.log(`Imagens recebidas de ${socket.id}`);
        
        io.emit("server_to_drowsy", data);
    });
    
    // This function is used to get the status of the worker face from drowsy api
    socket.on("Status", (response: any) => {
        console.log(response)
    });

});

// listening 3001 port
server.listen(3001);
