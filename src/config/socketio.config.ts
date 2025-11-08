import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';;
import ENV from './env.config';
import { registerSyncRoomEvents } from '../modules/syncRoom/socketEvents/socket.events';

const userSocketMap = new Map<string, string>();

const serverSocketIO = http.createServer();

export const io = new SocketIOServer(serverSocketIO, {
    cors: {
        origin: ENV.FRONTEND_URL, 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    },
    transports: ['websocket', 'polling'], 
    allowEIO3: true 
});

export const initSocketIO = () => {
  io.on("connection", (socket: Socket) => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    // Evento para registrar usuario
    socket.on('register-user', (userId: string) => {
      userSocketMap.set(userId, socket.id);
      console.log(`Usuario ${userId} registrado con socket ${socket.id}`);
    });

    // Registrar eventos de SyncRoom
    registerSyncRoomEvents(socket, io);

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
      
      // Eliminar usuario del mapa
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          console.log(` Usuario ${userId} eliminado del mapa`);
          break;
        }
      }
    });
  });

  serverSocketIO.listen(Number(ENV.PORT_SOCKETIO), () => {
    console.log(`Socket.IO corriendo en http://localhost:${ENV.PORT_SOCKETIO}`);
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
