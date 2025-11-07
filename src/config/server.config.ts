import express from 'express';
import AppRoutes from './server.router.config';

//TODO: Configurar el cors para que el frontend pueda consumir la API y usar las cookies para autenticación

const app = express();

app.use(express.json());
app.use('/', AppRoutes);


export default app;