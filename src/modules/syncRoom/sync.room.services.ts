import { IServiceResponse } from "../../types/service.response.interface";
import { ICreateRoomDto } from "./dtos/create.room.dto";
import prisma from "../../config/prisma.client";
import { ISyncRoom } from "./interfaces/sync.room.interface";
import { mapSyncRoomsToInterface, mapSyncRoomToInterface } from "./mapper/sync.room.mapper.to.interface";




export const getSyncRoomByUserIdService = async (userId: string): Promise<IServiceResponse<ISyncRoom[]>> => {
    try {
        const rooms = await prisma.syncRoom.findMany({
            where: { user_host_id: userId }
        });
        if (!rooms) {
            return {
                message: "No rooms found for user",
                ok: false
            };
        }

        const mappedRooms: ISyncRoom[] = mapSyncRoomsToInterface(rooms);

        return {
            message: "Rooms retrieved successfully",
            ok: true,
            data: mappedRooms
        };

    } catch (error) {
        return {
            message: "Error retrieving rooms for user",
            ok: false
        };
    }
}

export const createSyncRoomService = async (payload: ICreateRoomDto, userId: string): Promise<IServiceResponse<ISyncRoom>> => {

    try {
        const newRoom = await prisma.syncRoom.create({
            data: {
                room_name: payload.room_name,
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

export const deleteSyncRoomService = async (roomId: string, userId: string): Promise<IServiceResponse<void>> => {
    try {
        const room = await prisma.syncRoom.findUnique({
            where: { room_id: roomId , user_host_id: userId }
        });
        if(!room) {
            return {
                message: "Sync room not found or you are not the host",
                ok: false
            };
        }

        await prisma.syncRoom.delete({
            where: { room_id: roomId }
        });

        return {
            message: "Sync room deleted successfully",
            ok: true
        };

    } catch (error) {
        return {
            message: "Error deleting sync room",
            ok: false
        };
    }
}

export const getSyncRoomByIdService = async (roomId: string): Promise<IServiceResponse<ISyncRoom>> => {
    try {
        const room = await prisma.syncRoom.findUnique({
            where: { room_id: roomId }
        });

        if (!room) {
            return {
                message: "Sync room not found",
                ok: false
            };
        }
        const mappedRoom: ISyncRoom = mapSyncRoomToInterface(room);
        
        return {
            message: "Sync room retrieved successfully",
            ok: true,
            data: mappedRoom
        };
    } catch (error) {
        return {
            message: "Error retrieving sync room",
            ok: false
        };
    }

}

export const getSyncAllRoomsService = async (): Promise<IServiceResponse<ISyncRoom[]>> => {
    try {

        const rooms = await prisma.syncRoom.findMany();

        if (!rooms) {
            return {
                message: "No rooms found",
                ok: false
            };
        }

        const mappedRooms: ISyncRoom[] = mapSyncRoomsToInterface(rooms);

        return {
            message: "Rooms retrieved successfully",
            ok: true,
            data: mappedRooms
        };

    } catch (error) {
        return {
            message: "Error retrieving rooms",
            ok: false
        };

    }

}

//TODO: implementar types
export const joinSyncRoomService = async (roomId: string, userId: string): Promise<IServiceResponse<any>> => {
    try {
        const room = await prisma.syncRoom.findUnique({
            where: { room_id: roomId },
            include: {
                host: {
                    select: {
                        user_id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        if (!room) {
            return {
                message: "room not found",
                ok: false,
                statusCode: 404
            };
        }

        if (!room.is_active) {
            return {
                message: "room is not active",
                ok: false,
                statusCode: 400
            };
        }

        const user = await prisma.user.findUnique({
            where: { user_id: userId },
            select: {
                user_id: true,
                username: true,
                email: true
            }
        });

        if (!user) {
            return {
                message: "User not found",
                ok: false,
                statusCode: 404
            };
        }

        const existingParticipant = await prisma.syncRoomParticipant.findUnique({
            where: {
                room_id_user_participant_id: {
                    room_id: roomId,
                    user_participant_id: userId
                }
            }
        });

        if (existingParticipant) {
            return {
                message: "user already in room",
                ok: true,
                data: {
                    roomId: room.room_id,
                    roomName: room.room_name,
                    host: room.host,
                    user: user,
                    alreadyJoined: true
                }
            };
        }

        await prisma.syncRoomParticipant.create({
            data: {
                room_id: roomId,
                user_participant_id: userId
            }
        });

        return {
            message: `User ${user.username} joined room ${room.room_name} successfully`,
            ok: true,
            data: {
                roomId: room.room_id,
                roomName: room.room_name,
                host: room.host,
                user: user,
                joinedAt: new Date(),
                message: "User joined successfully",
            }
        };

    } catch (error) {
        console.error("Error in joinSyncRoomService:", error);
        return {
            message: "Error al unirse a la sala",
            ok: false,
            statusCode: 500
        };
    }
}
