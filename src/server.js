const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const moment = require('moment');

const Message = require('../src/models/message');
const connect = require('../src/database');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

console.log(__dirname);

app.use(express.static(path.join(__dirname,'../', 'public')));
app.set('views', path.join(__dirname, '../','public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('sendMessage', data => {
        connect.then(_db => {
            const message = new Message();
            message.message = data.message;
            message.author = data.author;
            message.createdAt = moment(new Date(), "MM-DD-YYYY HH:mm:ss");

            message.save().then(() => console.log('Data successfully inserted'));

        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => console.log(`Server running on port 3000`));