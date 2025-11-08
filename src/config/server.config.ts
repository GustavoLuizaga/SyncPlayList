import express from 'express';
import cors from 'cors';
import AppRoutes from './server.router.config';

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/', AppRoutes);


export default app;