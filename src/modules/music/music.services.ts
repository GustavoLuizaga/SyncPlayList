import { IServiceResponse } from "../../types/service.response.interface";
import { IMusicUpload } from "./dto/musicUpload.dto";
import { uploadImageToStorage} from "../storage/storage.image.services";
import { uploadFileToStorage } from "../storage/storage.music.services";   
import  IMusic  from "./interface/musc.interface";
import prisma from "../../config/prisma.client";

export const findAllMusic = async (): Promise<IServiceResponse<IMusic[]>> => {

    const musicList =  await prisma.music.findMany();
    if (!musicList) {
        return {
            message: "No music found",
            ok: false
        };
    }
    return {
        message: "Music retrieved successfully",
        ok: true,
        data: musicList
    };
};


export const findByIdMusic = async (id: string): Promise<IServiceResponse<IMusic>> => {

    const music =  await prisma.music.findUnique({
        where: { music_id: id }
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
        data: music
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

    const newMusic = await prisma.music.create({
        data: {
            ...musicData,
            image_url: uploadMusicImageResult.url,
            url: uploadMusicFileResult.url,
            addedAt: new Date()
        }
    });
    
    return {
        message: "Music uploaded successfully",
        ok: true,
        data: newMusic
    };
};