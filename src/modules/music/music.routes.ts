import { Router } from 'express';

const MusicRoutes = Router();

MusicRoutes.get('/', (req, res) => {
    res.send('Music route');
});

export default MusicRoutes;