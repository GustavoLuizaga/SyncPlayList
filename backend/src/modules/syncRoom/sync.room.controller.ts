import { Request, Response } from "express";
import { createSyncRoomService,deleteSyncRoomService, joinSyncRoomService, getSyncAllRoomsService, getSyncRoomByIdService, getSyncRoomByUserIdService } from "./sync.room.services";


export const createSyncRoom = async(req: Request, res: Response) => {

    const data = req.body;
    const userId = req.session.user_id;
   
    const result = await createSyncRoomService(data, userId);

    if (result.ok) {
        return res.status(201).json(result);
    }

    return res.status(500).json(result);
}

export const deleteSyncRoom = async(req: Request, res: Response) => {

    const { roomId } = req.params;
    const userId = req.session.user_id;
    const result = await deleteSyncRoomService(roomId, userId);

    if (result.ok) {
        return res.status(200).json(result);
    }

    return res.status(400).json(result);
}

export const getAllSyncRooms = async(req: Request, res: Response) => {

    const result = await getSyncAllRoomsService();
    if (!result.ok) {
        return res.status(404).json(result);
    }

    return res.status(200).json(result);
}

export const getSyncRoomById = async(req: Request, res: Response) => {
    const { roomId } = req.params;
    const result = await getSyncRoomByIdService(roomId);

    if (result.ok) {
        return res.status(200).json(result);
    }

    return res.status(404).json(result);
}

export const getSyncRoomByUserId = async(req: Request, res: Response) => {

    const userId = req.session.user_id;
    const result = await getSyncRoomByUserIdService(userId);

    if (!result.ok) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

export const joinSyncRoom = async(req: Request, res: Response) => {
    const { roomId } = req.params;
    const userId = req.session.user_id;

    const result = await joinSyncRoomService(roomId, userId);

    if (result.ok) {
        return res.status(200).json(result);
    }

    return res.status(result.statusCode || 500).json(result);
}
