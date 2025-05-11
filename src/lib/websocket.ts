import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';

export type NextApiResponseWithSocket = NextApiResponse & {
    socket: {
        server: NetServer & {
            io?: SocketIOServer;
        };
    };
};

export const initSocket = (res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        const io = new SocketIOServer(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('join-room', (roomId: string) => {
                socket.join(roomId);
                console.log(`Client ${socket.id} joined room: ${roomId}`);
            });

            socket.on('leave-room', (roomId: string) => {
                socket.leave(roomId);
                console.log(`Client ${socket.id} left room: ${roomId}`);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        res.socket.server.io = io;
    }
    return res.socket.server.io;
}; 