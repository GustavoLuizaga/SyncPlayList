import { Request, Response } from "express";
import { createSyncRoomService } from "./sync.room.services";

export const createSyncRoom = async(req: Request, res: Response) => {

    const data = req.body;
    const userId = req.session.user_id;
   
    const result = await createSyncRoomService(data, userId);

    if (result.ok) {
        return res.status(201).json(result);
    }

    return res.status(500).json(result);


}