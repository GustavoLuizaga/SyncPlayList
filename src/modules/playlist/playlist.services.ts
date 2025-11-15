import { ca } from "zod/v4/locales";
import prisma from "../../config/prisma.client";
import { IServiceResponse } from "../../types/service.response.interface";
import { IPlaylist } from "./interfaces/playList.interface";
import IMusic from "../music/interfaces/musc.interface";
import { mapperToIMusicArray } from "../music/mapper/music.mapper.to.interface";



export const createPlaylistService = async (roomId: string): Promise<IServiceResponse<string>> => {
    try {
        const newPlaylist = await prisma.playlist.create({
            data: {
                syncRoom: {
                    connect: { room_id: roomId }
                }
            }
        });

        return {
            message: "Playlist created successfully",
            ok: true,
            data: newPlaylist.playlist_id
        };
    } catch (error) {
        return {
            message: "Error creating playlist",
            ok: false,

        };
    }
};

export const deletePlaylistService = async (playlistId: string): Promise<IServiceResponse<void>> => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { playlist_id: playlistId }
        });

        if(!playlist) {
            return {
                message: "Playlist not found",
                ok: false
            };
        }

        await prisma.playlist.delete({
            where: { playlist_id: playlistId }
        });

        return {
            message: "Playlist deleted successfully",
            ok: true
        };
    } catch (error) {
        return {
            message: "Error deleting playlist",
            ok: false
        };
    }
};

export const getPlaylistsByRoomService = async (roomId: string): Promise<IServiceResponse<string[]>> => {
    try {
        const playlists = await prisma.playlist.findMany({
            where: { room_id: roomId },
            select: { playlist_id: true }
        });
        return {
            message: "Playlists retrieved successfully",
            ok: true,
            data: playlists.map(playlist => playlist.playlist_id)
        };
    } catch (error) {
        return {
            message: "Error retrieving playlists",
            ok: false,
            data: []
        };
    }
};

export const getPlaylistByIdService = async (playlistId: string): Promise<IServiceResponse<IPlaylist>> => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { playlist_id: playlistId },
            include: {
                playlistMusics: {
                    include: {
                        music: {
                            include: {
                                musicGenres: {
                                    include: {
                                        genre: true
                                    }
                                },
                                _count: {
                                    select: { userLikes: true }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!playlist) {
            return {
                message: "Playlist not found",
                ok: false
            };
        }
        const musicData = playlist.playlistMusics.map(pm => pm.music);
        const musicList = mapperToIMusicArray(musicData);

        const playlistResponse: IPlaylist = {
            playlist_id: playlist.playlist_id,
            createdAt: playlist.createdAt,
            musicList: musicList
        };

        return {
            message: "Playlist retrieved successfully",
            ok: true,
            data: playlistResponse
        }
    } catch (error) {
        console.error("Error retrieving playlist:", error);
        return {
            message: "Error retrieving playlist",
            ok: false
        };
    }
}


export const getMusicByPlaylistService = async (playlistId: string): Promise<IServiceResponse<IMusic[]>> => {
    try {
        const musicsPlaylist = await prisma.playlistMusic.findMany({
            where: { playlist_id: playlistId },
            include: {
                music: {
                    include: {
                        musicGenres: {
                            include: {
                                genre: true
                            }
                        },
                        _count: {
                            select: { userLikes: true }
                        }
                    }
                }
            }
        });


        if (!musicsPlaylist || musicsPlaylist.length === 0) {
            return {
                message: "Playlist has no musics",
                ok: false,
                data: []
            };
        }
        
        const musicData = musicsPlaylist.map(pm => pm.music);

        const musicList = mapperToIMusicArray(musicData);

        return {
            message: "Musics retrieved successfully",
            ok: true,
            data: musicList
        }

    } catch (error) {
        return {
            message: "Error retrieving musics",
            ok: false
        };
    }
};

export const addMusicToPlaylistService = async (playlistId: string, musicId: string): Promise<IServiceResponse<void>> => {
    try{

        const playlistExists = await prisma.playlist.findUnique({
            where: {
                playlist_id: playlistId
            }
        });

        if (!playlistExists) {
            return {
                message: "Playlist not found",
                ok: false
            };
        }

        const musicExists = await prisma.music.findUnique({
            where: {
                music_id: musicId
            }
        });

        if (!musicExists) {
            return {
                message: "Music not found",
                ok: false
            };
        }

        const existingEntry = await prisma.playlistMusic.findUnique({
            where: {
                playlist_id_music_id: {
                    playlist_id: playlistId,
                    music_id: musicId
                }
            }
        });

        if (existingEntry) {
            return {
                message: "Music already exists in this playlist",
                ok: false
            };
        }


        await prisma.playlistMusic.create({
            data: {
                playlist_id: playlistId,
                music_id: musicId
            }
        });

        return{
            message: "Music added to playlist successfully",
            ok: true
        }
    }catch(error){
        console.error("Error adding music to playlist:", error);
        return {
            message: "Error adding music to playlist",
            ok: false
        };
    }

};
export const removeMusicFromPlaylistService = async (playlistId: string, musicId: string): Promise<IServiceResponse<void>> => {
    try {
        const playlistExists = await prisma.playlist.findUnique({
            where: {
                playlist_id: playlistId
            }
        });

        if (!playlistExists) {
            return {
                message: "Playlist not found",
                ok: false
            };
        }

        
        const musicExists = await prisma.music.findUnique({
            where: {
                music_id: musicId
            }
        });

        if (!musicExists) {
            return {
                message: "Music not found",
                ok: false
            };
        }

        const playlistMusic = await prisma.playlistMusic.findUnique({
            where: {
                playlist_id_music_id: {
                    playlist_id: playlistId,
                    music_id: musicId
                }
            }
        });

        if (!playlistMusic) {
            return {
                message: "Music not found in this playlist",
                ok: false
            };
        }

   
        await prisma.playlistMusic.delete({
            where: {
                playlist_id_music_id: {
                    playlist_id: playlistId,
                    music_id: musicId
                }
            }
        });

        return {
            message: "Music removed from playlist successfully",
            ok: true
        };
    } catch (error) {
        console.error("Error removing music from playlist:", error);
        return {
            message: "Error removing music from playlist",
            ok: false
        };
    }
};

