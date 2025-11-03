import { Request, Response } from "express";
import { uploadMusic } from "./music.services";


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
        const musicData = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            duration: parseInt(req.body.duration, 10),
            artist: req.body.artist,
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