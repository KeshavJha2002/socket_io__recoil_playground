import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import cors from 'cors';

const numbers = [1, 2, 3, 4, 5, 6, 7];

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.get('/', (req, res) => {
    res.send("hello world");
});

io.on('connection', (socket) => {
    console.log(`New connection : ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Lost connection : ${socket.id}`)
    });
    socket.on('greet', (message) => {
        console.log(`Message from ${socket.id} : ${message}`);
    });
    socket.emit('reply', "hi from server")
});


app.get('/api/numbers', (req, res) => {
    res.send(numbers);
})

server.listen(8000, () => {
    console.log("Server is running");
})