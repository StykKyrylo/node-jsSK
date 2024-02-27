const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

server.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);
        socket.emit('message', generateMessage('Admin', `${user.username} has joined!`));

        io.to(user.room).emit('roomData', {
            users: getUsersInRoom(user.room)
        });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const privateMessageMatch = message.match(/^@(\w+):\s*(.*)/); // Check if message is a private message

        if (privateMessageMatch) {
            const recipientName = privateMessageMatch[1];
            const messageContent = privateMessageMatch[2];

            const recipient = getUsersInRoom(user.room).find(user => user.username === recipientName);
            if (recipient) {
                // Send the private message to the recipient only
                io.to(recipient.id).emit('message', generateMessage(`(Private) ${user.username}`, messageContent));
                socket.emit('message', generateMessage(`To @${recipientName}`, messageContent)); // Confirm to sender that message was sent
            } else {
                socket.emit('message', generateMessage('Admin', `User ${recipientName} not found.`)); // If recipient not found, inform the sender
            }
        } else {
            // Broadcast message to the room
            io.to(user.room).emit('message', generateMessage(user.username, message));
        }
        callback();
    });

    socket.on("userIsTyping", (name) => {
        socket.broadcast.emit("userIsTyping", name);
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
            io.to(user.room).emit('roomData', {
                users: getUsersInRoom(user.room)
            });
        }
    });
});
