import { Socket } from "socket.io";
import prisma from "../../../config/prisma.client";

export const registerSyncRoomEvents = (socket: Socket, io: any) => {
  
  socket.on("join_room", async ({ roomId, userId }) => {
    try {
      const room = await prisma.syncRoom.findUnique({ 
        where: { room_id: roomId } 
      });

      if (!room) {
        socket.emit("error", "La sala no existe");
        return;
      }

      // Usuario obtiene información adicional
      const user = await prisma.user.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          username: true,
          email: true
        }
      });

      socket.join(roomId);

      console.log(`Usuario ${user?.username} (${userId}) se unió a la sala ${room.room_name} (${roomId})`);
      console.log(`Socket ${socket.id} ahora está en la sala ${roomId}`);

      // Notificar a todos en la sala (excepto al que se unió)
      socket.to(roomId).emit("user_joined", { 
        userId,
        username: user?.username,
        message: `${user?.username} se unió a la sala`
      });

      // Confirmar al usuario que se unió exitosamente
      socket.emit("joined_room_success", {
        roomId,
        roomName: room.room_name,
        message: "Te has unido a la sala exitosamente"
      });

    } catch (error) {
      console.error("Error en join_room:", error);
      socket.emit("error", "No se pudo unir a la sala");
    }
  });

  socket.on("leave_room", async ({ roomId, userId }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          username: true
        }
      });

      socket.leave(roomId);
      
      console.log(`🚪 Usuario ${user?.username} (${userId}) salió de la sala ${roomId}`);

      // Notificar a todos en la sala
      io.to(roomId).emit("user_left", {
        userId,
        username: user?.username,
        message: `${user?.username} salió de la sala`
      });

    } catch (error) {
      console.error("Error en leave_room:", error);
      socket.emit("error", "No se pudo salir de la sala");
    }
  });

  //Evento: Reproducir música (todos escuchan)
  socket.on("play_music", ({ roomId, musicId, musicData }) => {
    console.log(`Reproduciendo música ${musicId} en sala ${roomId}`);
    
    // TODOS en la sala (incluido quien emitió) escuchan esto
    io.to(roomId).emit("music_playing", {
      musicId,
      musicData,
      action: "play"
    });
  });

  //Evento: Pausar música
  socket.on("pause_music", ({ roomId, musicId, currentTime }) => {
    console.log(`⏸Pausando música ${musicId} en sala ${roomId}`);
    
    io.to(roomId).emit("music_paused", {
      musicId,
      currentTime,
      action: "pause"
    });
  });

  // Evento: Cambiar música
  socket.on("change_music", ({ roomId, newMusicId, musicData }) => {
    console.log(`Cambiando a música ${newMusicId} en sala ${roomId}`);
    
    io.to(roomId).emit("music_changed", {
      newMusicId,
      musicData,
      action: "change"
    });
  });

  //Evento: Enviar mensaje en la sala
  socket.on("send_message", async ({ roomId, userId, message }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          username: true
        }
      });

      console.log(`${user?.username} envió mensaje en sala ${roomId}`);

      // TODOS en la sala (incluido el emisor) ven el mensaje
      io.to(roomId).emit("new_message", {
        userId,
        username: user?.username,
        message,
        timestamp: new Date()
      });

    } catch (error) {
      console.error("Error en send_message:", error);
    }
  });
};
