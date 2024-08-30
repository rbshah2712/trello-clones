import express from 'express'; 
import {createServer} from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';

const app = express(); 
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
    res.send('App is UP AND RUNNING');
});

io.on('connection',() => {
    console.log("connect");
});

mongoose.connect('mongodb+srv://rsanghvi2712:3KLWtT9mkXbyYlrU@cluster0.owsw8yh.mongodb.net/').then(() => {
    console.log('connected to mongodb');
    httpServer.listen(4001, () => {
        console.log('API is listening to port 4001');
    });
});


