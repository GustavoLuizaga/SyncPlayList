import { Router } from 'express';
import upload from '../../middleware/multerStorageMiddleware';
import { saveMusic, getAllMusic, getMusicById, removeMusicById,addLike,removeLike} from './music.controller';
import { verifySessionMiddleware } from '../../middleware/verify.sesion.middleware';
const MusicRoutes = Router();

MusicRoutes.use(verifySessionMiddleware);

MusicRoutes.get('/', getAllMusic);
MusicRoutes.get('/:id', getMusicById);

MusicRoutes.delete('/:id', removeMusicById);

MusicRoutes.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'music', maxCount: 1 }]), saveMusic);

MusicRoutes.post('/:musicId/like', addLike);
MusicRoutes.delete('/:musicId/like', removeLike);


export default MusicRoutes;