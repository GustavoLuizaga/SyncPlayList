import { Router } from 'express';
import { verifySessionMiddleware } from '../../middleware/verify.sesion.middleware';
import { createSyncRoom, joinSyncRoom } from './sync.room.controller';
import prisma from '../../config/prisma.client';
import { io } from '../../config/socketio.config';
    
const  SyncRoomRoutes = Router();

SyncRoomRoutes.use(verifySessionMiddleware);

SyncRoomRoutes.post('/', createSyncRoom);
SyncRoomRoutes.post('/join/:roomId', joinSyncRoom);

export default SyncRoomRoutes