import { IServiceResponse } from "../../types/service.response.interface";
import { IMusicUpload } from "./dto/musicUpload.dto";
import { uploadImageToStorage} from "../storage/storage.image.services";
import { uploadFileToStorage } from "../storage/storage.music.services";   
import  IMusic  from "./interface/musc.interface";
import prisma from "../../config/prisma.client";


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