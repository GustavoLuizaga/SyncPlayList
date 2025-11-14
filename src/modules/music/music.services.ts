import { IServiceResponse } from "../../types/service.response.interface";
import { IMusicUpload } from "./dtos/music.upload.dto";
import { uploadImageToStorage, deleteImageFromStorage } from "../storage/storage.image.services";
import { uploadFileToStorage, deleteFileFromStorage } from "../storage/storage.music.services";
import IMusic from "./interfaces/musc.interface";
import prisma from "../../config/prisma.client";
import { mapperToIMusic, mapperToIMusicArray } from "./mapper/music.mapper.to.interface";
import { IMusicQueryParams } from "./dtos/music.query,params.dto";

export const findAllMusic = async (queryParams: IMusicQueryParams): Promise<IServiceResponse<IMusic[]>> => {
    try {

        const { title, artist, sortBy, sortOrder } = queryParams;

        const whereFilters: any = {};

        if (title) {
            whereFilters.title = {
                contains: title,
                mode: 'insensitive'
            };
        }

        if (artist) {
            whereFilters.artist = {
                contains: artist,
                mode: 'insensitive'
            };
        }

        const orderBy: any = {};
        if (sortBy) {
            orderBy[sortBy] = sortOrder === 'desc' ? 'desc' : 'asc';
        } else {
            orderBy['createdAt'] = 'desc';
        }

        console.log("Query where filters:", whereFilters, "orderBy:", orderBy);

        const musicListResult = await prisma.music.findMany({
            where: {
                ...whereFilters
            },
            orderBy: {
                ...orderBy
            },
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
        });

        if (!musicListResult || musicListResult.length === 0) {
            return {
                message: "No music found",
                ok: false,
            };
        }
        const musicList = mapperToIMusicArray(musicListResult);

        return {
            message: "Music retrieved successfully",
            ok: true,
            data: musicList
        };
    } catch (error) {
        console.error("Error fetching music:", error);
        return {
            message: "Error retrieving music",
            ok: false
        };
    }
};

export const findByIdMusic = async (id: string): Promise<IServiceResponse<IMusic>> => {

    const music = await prisma.music.findUnique({
        where: { music_id: id },
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
    });

    if (!music) {
        return {
            message: "Music not found",
            ok: false
        };
    }

    return {
        message: "Music retrieved successfully",
        ok: true,
        data: mapperToIMusic(music)
    };
};

export const deleteMusicById = async (id: string): Promise<IServiceResponse<void>> => {
    try {
        const musicExists = await prisma.music.findUnique({
            where: { music_id: id }
        });

        if (!musicExists) {
            return {
                message: "Music not found",
                ok: false
            };
        }

        await prisma.music.delete({
            where: { music_id: id }
        });

        await deleteImageFromStorage(musicExists.image_url);
        await deleteFileFromStorage(musicExists.url);

        return {
            message: "Music deleted successfully",
            ok: true,
        };
    } catch (error) {
        return {
            message: "Error deleting music",
            ok: false
        };
    }
};

export const uploadMusic = async (musicData: IMusicUpload, musicImage: Express.Multer.File, musicFile: Express.Multer.File): Promise<IServiceResponse<IMusic>> => {

    try {

        const uploadMusicImageResult = await uploadImageToStorage(musicImage);

        const uploadMusicFileResult = await uploadFileToStorage(musicFile);

        const { genres, ...musicDataWithoutGenres } = musicData;

        const newMusic = await prisma.music.create({
            data: {
                ...musicDataWithoutGenres,
                image_url: uploadMusicImageResult.url,
                url: uploadMusicFileResult.url,
                addedAt: new Date(),

                musicGenres: {
                    create: genres.map(genreId => ({
                        genre: {
                            connect: { genre_id: genreId }
                        }
                    }))
                }
            },
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
        });

        return {
            message: "Music uploaded successfully",
            ok: true,
            data: mapperToIMusic(newMusic)
        };

    } catch (error) {
        return {
            message: "Error uploading music",
            ok: false
        };
    }

};

export const likeMusic = async (musicId: string, userId: string): Promise<IServiceResponse<void>> => {
    try {

        const music = await prisma.music.findUnique({
            where: { music_id: musicId }
        });

        if (!music) {
            return {
                message: "Music not found",
                ok: false
            };
        }

        const existingLike = await prisma.userLikeMusic.findUnique({
            where: {
                user_id_music_id: {
                    user_id: userId,
                    music_id: musicId
                }
            }
        });

        if (existingLike) {
            return {
                message: "You have already liked this music",
                ok: false
            };
        }

        await prisma.userLikeMusic.create({
            data: {
                user: {
                    connect: { user_id: userId }
                },
                music: {
                    connect: { music_id: musicId }
                }
            }
        });

        return {
            message: "Like added successfully",
            ok: true
        };
    } catch (error) {
        console.error("Error adding like:", error);
        return {
            message: "Error adding like",
            ok: false
        };
    }
};

export const unlikeMusic = async (musicId: string, userId: string): Promise<IServiceResponse<void>> => {
    try {

        const existingLike = await prisma.userLikeMusic.findUnique({
            where: {
                user_id_music_id: {
                    user_id: userId,
                    music_id: musicId
                }
            }
        });

        if (!existingLike) {
            return {
                message: "Like not found",
                ok: false
            };
        }


        await prisma.userLikeMusic.delete({
            where: {
                user_id_music_id: {
                    user_id: userId,
                    music_id: musicId
                }
            }
        });

        return {
            message: "Like removed successfully",
            ok: true
        };
    } catch (error) {
        console.error("Error removing like:", error);
        return {
            message: "Error removing like",
            ok: false
        };
    }
};

export const countLikesForMusic = async (musicId: string): Promise<number> => {
    try {
        const likeCount = await prisma.userLikeMusic.count({
            where: { music_id: musicId }
        });
        return likeCount;
    } catch (error) {
        throw new Error("Error retrieving like count");
    }
};

export const musicUserLikesService = async (userId: string): Promise<IServiceResponse<IMusic[]>> => {
    try {
        const musicUserLike = await prisma.userLikeMusic.findMany({
            where: { user_id: userId },
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

        if (musicUserLike?.length === 0) {
            return {
                message: "No liked music found",
                ok: false,
            };
        }

        const likedMusicList = mapperToIMusicArray(musicUserLike.map(like => like.music));

        return {
            message: "Liked music retrieved successfully",
            ok: true,
            data: likedMusicList
        };
    } catch (error) {
        return {
            message: "Error retrieving liked music",
            ok: false
        };
    }
};


