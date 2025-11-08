import { IServiceResponse } from "../../types/service.response.interface";
import { ICreateRoomDto } from "./dtos/create.room.dto";
import prisma from "../../config/prisma.client";
import { io } from "../../config/socketio.config";
import { ISyncRoom } from "./interfaces/sync.room.interface";


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

export const joinSyncRoomService = async (roomId: string, userId: string): Promise<IServiceResponse<any>> => {
    try {
        // Verificar si la sala existe
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
                message: "La sala no existe",
                ok: false,
                statusCode: 404
            };
        }

        if (!room.is_active) {
            return {
                message: "La sala no está activa",
                ok: false,
                statusCode: 400
            };
        }

        // Verificar si el usuario existe
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
                message: "Usuario no encontrado",
                ok: false,
                statusCode: 404
            };
        }

        // Verificar si el usuario ya está en la sala
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
                message: "El usuario ya está en la sala",
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

        // Agregar al usuario como participante
        await prisma.syncRoomParticipant.create({
            data: {
                room_id: roomId,
                user_participant_id: userId
            }
        });

        return {
            message: `Usuario ${user.username} unido a la sala ${room.room_name} exitosamente`,
            ok: true,
            data: {
                roomId: room.room_id,
                roomName: room.room_name,
                host: room.host,
                user: user,
                joinedAt: new Date(),
                message: "Ahora puedes usar Socket.IO para interactuar con la sala. Emite el evento 'join_room' con { roomId, userId }"
            }
        };

    } catch (error) {
        console.error("Error en joinSyncRoomTestService:", error);
        return {
            message: "Error al unirse a la sala",
            ok: false,
            statusCode: 500
        };
    }
}
