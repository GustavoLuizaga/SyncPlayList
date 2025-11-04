import { Router } from 'express';
import upload from '../../middleware/multerStorageMiddleware';
import { saveMusic, getAllMusic, getMusicById, removeMusicById} from './music.controller';

const MusicRoutes = Router();

MusicRoutes.get('/', getAllMusic);
MusicRoutes.get('/:id', getMusicById);

MusicRoutes.delete('/:id', removeMusicById);

MusicRoutes.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'music', maxCount: 1 }]), saveMusic);

export default MusicRoutes;