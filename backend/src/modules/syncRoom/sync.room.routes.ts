import { Router } from 'express';
import { verifySessionMiddleware } from '../../middleware/verify.sesion.middleware';
import { createSyncRoom, joinSyncRoom, getAllSyncRooms, getSyncRoomById, getSyncRoomByUserId, deleteSyncRoom} from './sync.room.controller';
import { userRoleValidation } from '../../middleware/userRole.middleware'
const  SyncRoomRoutes = Router();

SyncRoomRoutes.use(verifySessionMiddleware);

SyncRoomRoutes.post('/', createSyncRoom);

SyncRoomRoutes.get('/', userRoleValidation('admin'),getAllSyncRooms);

SyncRoomRoutes.get('/user', getSyncRoomByUserId);

SyncRoomRoutes.post('/join/:roomId', joinSyncRoom);

SyncRoomRoutes.get('/:roomId', getSyncRoomById);

SyncRoomRoutes.delete('/:roomId', deleteSyncRoom);


export default SyncRoomRoutes