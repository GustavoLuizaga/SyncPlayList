import Server from './config/server.config'
import ENV from './config/env.config';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { initSocketIO } from './config/socketio.config';

async function start() {
    try {
        const serverExpress = http.createServer(Server);

        const io = new SocketIOServer(serverExpress, {
            cors: {
                origin: '*', // En producción, especifica los dominios permitidos
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true
            }
        });

        // Inicializar Socket.IO
        initSocketIO(io);
        console.log(`Socket.IO initialized`);

        // Un solo servidor escuchando en un puerto
        serverExpress.listen(ENV.PORT, () => {
            console.log(`Server is running on http://localhost:${ENV.PORT}`);
            console.log(`Socket.IO is running on the same port`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

start();