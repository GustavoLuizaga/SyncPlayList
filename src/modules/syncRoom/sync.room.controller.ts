import { Request, Response } from "express";
import { createSyncRoomService, joinSyncRoomService } from "./sync.room.services";

export const createSyncRoom = async(req: Request, res: Response) => {

    const data = req.body;
    const userId = req.session.user_id;
   
    const result = await createSyncRoomService(data, userId);

    if (result.ok) {
        return res.status(201).json(result);
    }

    return res.status(500).json(result);
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
