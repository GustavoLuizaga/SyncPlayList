import { Server as SocketIOServer, Socket } from 'socket.io';

// Service que usara el socketio

// Cada usuario conectado, se guardara su userId y el socketId
const userSocketMap = new Map<string, string>();

// Variable global para almacenar la instancia de io
let ioInstance: SocketIOServer | null = null;

export const initSocketIO = (io: SocketIOServer) => {
    ioInstance = io; // Guardamos la instancia para usarla en otros servicios

    io.on('connection', (socket: Socket) => {
        console.log(`New client connected: ${socket.id}`);

        // Evento para asociar userId con socketId
        socket.on('register-user', (userId: string) => {
            userSocketMap.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        // Evento de desconexión (dentro del socket individual)
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            
            // Eliminar el usuario del mapa
            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    console.log(`User ${userId} removed from socket map`);
                    break;
                }
            }
        });

        // Más eventos del socket aquí
    });
};

// Función para obtener la instancia de io en otros servicios
export const getIO = (): SocketIOServer => {
    if (!ioInstance) {
        throw new Error('Socket.IO no está inicializado. Llama a initSocketIO primero.');
    }
    return ioInstance;
};

// Función helper para emitir eventos a un usuario específico
export const emitToUser = (userId: string, event: string, data: any) => {
    const socketId = userSocketMap.get(userId);
    if (socketId && ioInstance) {
        ioInstance.to(socketId).emit(event, data);
        return true;
    }
    return false;
};

// Función helper para emitir a todos los usuarios
export const emitToAll = (event: string, data: any) => {
    if (ioInstance) {
        ioInstance.emit(event, data);
        return true;
    }
    return false;
};

// Exportar el mapa para poder consultarlo si es necesario
export const getUserSocketMap = () => userSocketMap;
