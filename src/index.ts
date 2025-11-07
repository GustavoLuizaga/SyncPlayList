import Server from './config/server.config'
import ENV from './config/env.config';
import { initSocketIO } from './config/socketio.config';

async function start() {
    try {
        
        initSocketIO();

        // Servidor Express (escucha en puerto 3000)
        Server.listen(ENV.PORT, () => {
            console.log(`REST API Server running on http://localhost:${ENV.PORT}`);
        });

    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

start();