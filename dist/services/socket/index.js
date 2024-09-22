"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketEvents = void 0;
function handleSocketEvents(io) {
    const chatNamespace = io.of('/chat');
    chatNamespace.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);
        // Handle joining a room
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`${socket.id} joined room: ${room}`);
            socket.to(room).emit('message', `${socket.id} has joined the room.`);
        });
        // Handle sending a message
        socket.on('message', (message) => {
            console.log(`-----${message.senderId}--------${message.message}--------> `);
            io.emit(`${message.senderId}`, message);
        });
        // Handle leaving a room
        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            console.log(`${socket.id} left room: ${room}`);
            socket.to(room).emit('message', `${socket.id} has left the room.`);
        });
        // Handle client disconnect
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
exports.handleSocketEvents = handleSocketEvents;
