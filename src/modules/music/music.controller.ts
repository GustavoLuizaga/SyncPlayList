import { Request, Response } from "express";
import { uploadMusic } from "./music.services";


export const saveMusic = async (req: Request, res: Response) => {
    try {
        const musicData = req.body;
        const result = await uploadMusic(musicData);
        
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