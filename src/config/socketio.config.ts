import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';;
import ENV from './env.config';

const userSocketMap = new Map<string, string>();

const serverSocketIO = http.createServer();

export const io = new SocketIOServer(serverSocketIO, {
    cors: {
        origin: '*', // All domains allowed
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

export const initSocketIO = () => {
    io.on('connection', (socket: Socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('register-user', (userId: string) => {
            userSocketMap.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        socket.on('test_env_recived', (data) => {
            console.log('test data', data);
        });

       
        socket.on('send_message', (data: any) => {
            console.log('data any', data);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
    
            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    console.log(`User ${userId} removed from socket map`);
                    break;
                }
            }
        });
    });

    serverSocketIO.listen(Number(ENV.PORT_SOCKETIO), () => {
        console.log(`Socket.IO Server running on http://localhost:${ENV.PORT_SOCKETIO}`);
    });
};

// Función helper para emitir eventos a un usuario específico
export const emitToUser = (userId: string, event: string, data: any) => {
    const socketId = userSocketMap.get(userId);
    if (socketId) {
        io.to(socketId).emit(event, data);
        return true;
    }
    return false;
};

// Función helper para emitir a todos los usuarios
export const emitToAll = (event: string, data: any) => {
    io.emit(event, data);
    return true;
};


// Exportar el mapa para poder consultarlo si es necesario
export const getUserSocketMap = () => userSocketMap;
