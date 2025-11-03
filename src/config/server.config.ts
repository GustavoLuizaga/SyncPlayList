import express from 'express';
import AppRoutes from './server.router.config';


const app = express();

app.use(express.json());
app.use('/', AppRoutes);


export default app;