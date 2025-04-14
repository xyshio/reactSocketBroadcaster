const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ 
    path: "./config.env"
});

const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUtils");
const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

function randmizer(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

const socketIOMiddleware = (req, res, next) => {
    req.io = io;
    next();
}

// CORS
app.use(cors());

app.use('/api/v1/emit', socketIOMiddleware, (req, res) => {
    req.io.emit("skipilog", `SKIPI EMIT xyshio from the server! ${req.originalUrl}`);
    res.send(`EMIT ! Send from: ${JSON.stringify([{"message": "Hello from the server!"}])} `);
    // res.status(200).json({ message: "Hello from the server!" });
});

app.use('/api/v1/broadcast', socketIOMiddleware, (req, res) => {
    const radd = randmizer(10);
    req.io.emit("broadcast", `Emitting broadcast from backend! ${radd}`);
    //res.send(`Sending broadcast from backend! ${radd}`);
    // res.status(200).json({ message: "Hello from the server!" });    
});

// LISTEN
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port} ... `);
});