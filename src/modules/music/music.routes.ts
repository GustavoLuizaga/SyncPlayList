import { Router } from 'express';
import { saveMusic } from './music.controller';

const MusicRoutes = Router();

MusicRoutes.get('/', (req, res) => {
    res.send('Music route');
});

MusicRoutes.post('/upload', saveMusic);

export default MusicRoutes;