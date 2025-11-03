import { Router } from 'express';
import multer from 'multer';
import { saveMusic,getAllMusic } from './music.controller';

const MusicRoutes = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB máximo
    },
});


MusicRoutes.get('/', getAllMusic);

MusicRoutes.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'music', maxCount: 1 }]), saveMusic);

export default MusicRoutes;