const socketIO = require("socket.io");

exports.sio = (server) => {
    return socketIO(server, {
        transports: ["polling"],
        cors: {
            origin: "*",
        },
    });
}

exports.connection = (io) => {
    io.on("connection", (socket) => {
        console.log("A backend is connected");
        socket.on("message", (message) => { 
            console.log(`message from ${socket.id}: ${message}`);
        });
        
        socket.on("broadcast", (message) => { 
            console.log(`emitting broadcast message from => ${socket.id}: ${message}`);
        });

        socket.on("disconnect", () => {
            console.log(`socket ${socket.id} disconnected`);
        });
    });
}
