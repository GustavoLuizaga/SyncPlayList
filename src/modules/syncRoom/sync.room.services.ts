import { IServiceResponse } from "../../types/service.response.interface";
import { ICreateRoomDto } from "./dtos/create.room.dto";
import prisma from "../../config/prisma.client";
import { io } from "../../config/socketio.config";
import { ISyncRoom } from "./dtos/interfaces/sync.room.interface";


export const createSyncRoomService = async (payload: ICreateRoomDto, userId: string): Promise<IServiceResponse<ISyncRoom>> => {

    try {
        const newRoom = await prisma.syncRoom.create({
            data: {
                room_name: "Room test",
                host: {
                    connect: { user_id: userId } 
                }
            }
        });

        const createdRoom: ISyncRoom = {
            room_id: newRoom.room_id,
            room_name: newRoom.room_name,
            is_active: newRoom.is_active,
            createdAt: newRoom.createdAt,
            user_host_id: newRoom.user_host_id
        };

        return {
            message: "Sync room created successfully",
            ok: true,
            data: createdRoom
        };
    } catch (error) {
        return {
            message: "Error creating sync room",
            ok: false
        };
    }
}