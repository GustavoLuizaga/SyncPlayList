import { IServiceResponse } from "../../types/service.response.interface";
import { IMusicUpload } from "./dtos/musicUpload.dto";
import { uploadImageToStorage,deleteImageFromStorage } from "../storage/storage.image.services";
import { uploadFileToStorage,deleteFileFromStorage } from "../storage/storage.music.services";
import IMusic from "./interface/musc.interface";
import prisma from "../../config/prisma.client";
import { mapperToIMusic, mapperToIMusicArray } from "./mapper/mapper.interface";

export const findAllMusic = async (): Promise<IServiceResponse<IMusic[]>> => {
    try {
      
        const musicListResult = await prisma.music.findMany({
            include: {
                musicGenres: {
                    include: {
                        genre: true
                    }
                }
            }
        });

        if (!musicListResult) {
            return {
                message: "No music found",
                ok: true,
                data: []
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
            }
        }
    });

    return {
        message: "Music uploaded successfully",
        ok: true,
        data: mapperToIMusic(newMusic)
    };
};