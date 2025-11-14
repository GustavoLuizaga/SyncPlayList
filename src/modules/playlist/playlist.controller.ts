import { Request, Response } from 'express';
import { createPlaylistService, getPlaylistsByRoomService,getMusicByPlaylistService, addMusicToPlaylistService, removeMusicFromPlaylistService, deletePlaylistService, getPlaylistByIdService } from './playlist.services';

export const createPlaylist = async (req: Request, res: Response) => {

    const { roomId } = req.params;
    const result = await createPlaylistService(roomId);

    if (result.ok) {
        return res.status(201).json(result);
    }
    return res.status(500).json(result);
};

export const deletePlaylist = async (req: Request, res: Response) => {

    const { playlistId } = req.params;
    const result = await deletePlaylistService(playlistId);
    if (!result.ok) {
        return res.status(404).json(result);
    }
    return res.status(200).json(result);
}

export const getPlaylistById = async (req: Request, res: Response) => {

    const { playlistId } = req.params;
    const result = await getPlaylistByIdService(playlistId);
    if (!result.ok) {
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
};

export const getPlaylistsByRoom = async (req: Request, res: Response) => {

    const { roomId } = req.params;
    const result = await getPlaylistsByRoomService(roomId);
    if (!result.ok) {
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
};

export const getMusicByPlaylist = async (req: Request, res: Response) => {

    const { playlistId } = req.params;
    const result = await getMusicByPlaylistService(playlistId);
    
    if (!result.ok) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);

};

export const addMusicToPlaylist = async (req: Request, res: Response) => {
    
    const { playlistId, musicId } = req.params;
    const result = await addMusicToPlaylistService(playlistId, musicId);

    if (result.ok) {
        return res.status(200).json(result);
    }

    return res.status(500).json(result);
};


export const removeMusicFromPlaylist = async (req: Request, res: Response) => {
  
    const { playlistId, musicId } = req.params;
    const result = await removeMusicFromPlaylistService(playlistId, musicId);
  
    if (!result.ok) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);

};