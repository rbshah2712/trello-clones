import express from 'express'; 
import {createServer} from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import * as usersController from "./controller/users";
import bodyParser from 'body-parser';
import authMiddleware from './middleware/auth';

const app = express(); 
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", (req, res) => {
    res.send('App is UP AND RUNNING');
});

app.post('/api/users', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/user', authMiddleware,usersController.currentUser    );

io.on('connection',() => {
    console.log("connect");
});

mongoose.connect('mongodb+srv://rsanghvi2712:3KLWtT9mkXbyYlrU@cluster0.owsw8yh.mongodb.net/').then(() => {
    console.log('connected to mongodb');
    httpServer.listen(4001, () => {
        console.log('API is listening to port 4001');
    });
});


