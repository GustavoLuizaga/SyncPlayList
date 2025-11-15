import { ISyncRoom } from "../interfaces/sync.room.interface";

export const mapSyncRoomToInterface = (room: any): ISyncRoom => {
    return {
        room_id: room.room_id,
        room_name: room.room_name,
        is_active: room.is_active,
        createdAt: room.createdAt,
        user_host_id: room.user_host_id
    };
};

export const mapSyncRoomsToInterface = (rooms: any[]): ISyncRoom[] => {
    return rooms.map(room => mapSyncRoomToInterface(room));
};

