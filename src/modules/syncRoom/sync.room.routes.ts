import { Router } from 'express';
import { verifySessionMiddleware } from '../../middleware/verify.sesion.middleware';
import { createSyncRoom } from './sync.room.controller';
    
const  SyncRoomRoutes = Router();

SyncRoomRoutes.use(verifySessionMiddleware);
SyncRoomRoutes.post('/', createSyncRoom);

export default SyncRoomRoutes