import { Request, Response } from "express";
import { uploadMusic,findAllMusic, findByIdMusic, deleteMusicById, likeMusic, unlikeMusic, musicUserLikesService } from "./music.services";


export const saveMusic = async (req: Request, res: Response) => {
    try {
        if (!req.files || typeof req.files !== 'object') {
            return res.status(400).json({
                message: 'No se recibieron archivos',
                status: 400,
                ok: false,
            });
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const musicImage = files['image']?.[0];
        const musicFile = files['music']?.[0];

        if (musicFile.size > 15 * 1024 * 1024) { // 15MB limit
            return res.status(400).json({
                message: 'Music file must be less than 15MB',
                status: 400,
                ok: false,
            });
        } 

        if (musicImage.size > 5 * 1024 * 1024) { // 5MB limit
            return res.status(400).json({
                message: 'Music image must be less than 5MB',
                status: 400,
                ok: false,
            });
        }

        if (!musicImage) {
            return res.status(400).json({
                message: 'La imagen de la música es requerida',
                status: 400,
                ok: false,
            });
        }

        if (!musicFile) {
            return res.status(400).json({
                message: 'El archivo de música es requerido',
                status: 400,
                ok: false,
            });
        }
      
        let genres: number[] = [];
        if (req.body.genres) {
            if (typeof req.body.genres === 'string') {
                try {
                    genres = JSON.parse(req.body.genres);
                } catch {
                    genres = [parseInt(req.body.genres, 10)];
                }
            }
            else if (Array.isArray(req.body.genres)) {
                genres = req.body.genres.map((g: string) => parseInt(g, 10));
            }
        }

        const musicData = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            duration: parseInt(req.body.duration, 10),
            artist: req.body.artist,
            genres: genres
        };

        const result = await uploadMusic(musicData, musicImage, musicFile);

        if (!result.ok) {
            return res.status(500).json({
                message: result.message,
                status: 500,
                ok: false,
            });
        }

        res.status(201).json({
            message: result.message,
            status: 201,
            data: result.data,
            ok: true,
        });
    } catch (error) {
        console.error('Error in saveMusic:', error);

        res.status(500).json({
            message: 'Internal server error',
            status: 500,
            ok: false,
        });
    }
};

export const getAllMusic = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query;
        const result = await findAllMusic(queryParams);

        if (!result.ok) {
            return res.status(404).json({
                message: result.message,
                status: 404,
                ok: false,
            });
        }

        res.status(200).json({
            message: result.message,
            status: 200,
            ok: true,
            data: result.data,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: 500,
            ok: false,
        });
    }
};

export const getMusicById = async (req: Request, res: Response) => {
    try {
        const musicId = req.params.id;
        const result = await findByIdMusic(musicId);
        if (!result.ok) {
            return res.status(404).json({
                message: result.message,
                status: 404,
                ok: false,
            });
        }

        res.status(200).json({
            message: result.message,
            status: 200,
            ok: true,
            data: result.data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: 500,
            ok: false,
        });
    }
};

export const removeMusicById = async (req: Request, res: Response) => {
    try {
        const musicId = req.params.id;
        const result = await deleteMusicById(musicId);
        if (!result.ok) {
            return res.status(404).json({
                message: result.message,
                status: 404,
                ok: false,
            });
        }

        res.status(200).json({
            message: result.message,
            status: 200,
            ok: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: 500,
            ok: false,
        });
    }
};


export const addLike = async (req: Request, res: Response) => {

    const { musicId } = req.params;

    const userId = req.session.user_id; 

    const result = await likeMusic(musicId, userId);
    
    if (!result.ok) {
        return res.status(400).json(result);
    }
    
    return res.status(201).json(result);
};

export const removeLike = async (req: Request, res: Response) => {
    
    const { musicId } = req.params;
    
    const userId = req.session!.user_id; 

    const result = await unlikeMusic(musicId, userId);
    
    if (!result.ok) {
        return res.status(404).json(result);
    }
    
    return res.status(200).json(result);
};

export const musicUserLikes = async (req: Request, res: Response) => {
    
    const userId = req.session.user_id;

    const result = await musicUserLikesService(userId);

    if (!result.ok) {
        return res.status(404).json(result);
    }

    return res.status(200).json(result);
};