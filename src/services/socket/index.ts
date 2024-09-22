// socketHandlers.ts
import { Server } from 'socket.io';

export function handleSocketEvents(io: Server) {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Handle joining a room
    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`${socket.id} joined room: ${room}`);
      socket.to(room).emit('message', `${socket.id} has joined the room.`);
    });

    // Handle sending a message
    socket.on('message', (message:any) => {
      console.log(`-----${message.senderId}--------${message.message}--------> `)
        io.timeout(5000).emit(`${message.senderId}`,message);
    });

    // Handle leaving a room
    socket.on('leaveRoom', (room: string) => {
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
