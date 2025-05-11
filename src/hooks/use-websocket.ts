import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSocket = (roomId: string) => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io({
            path: '/api/socket',
            addTrailingSlash: false,
        });

        // Join room
        socketRef.current.emit('join-room', roomId);

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.emit('leave-room', roomId);
                socketRef.current.disconnect();
            }
        };
    }, [roomId]);

    const sendMessage = (event: string, data: any) => {
        if (socketRef.current) {
            socketRef.current.emit(event, data);
        }
    };

    const subscribe = (event: string, callback: (data: any) => void) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    };

    const unsubscribe = (event: string) => {
        if (socketRef.current) {
            socketRef.current.off(event);
        }
    };

    return {
        sendMessage,
        subscribe,
        unsubscribe,
    };
}; 