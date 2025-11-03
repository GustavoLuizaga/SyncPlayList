import { IServiceResponse } from "../../types/service.response.interface";
import { IMusicUpload } from "./dto/musicUpload.dto";
import  IMusic  from "./interface/musc.interface";
import prisma from "../../config/prisma.client";


export const uploadMusic = async (musicData: IMusicUpload): Promise<IServiceResponse<IMusic>> => {
    const newMusic = await prisma.music.create({
        data: {
            ...musicData,
            addedAt: new Date()
        }
    });
    
    return {
        message: "Music uploaded successfully",
        ok: true,
        data: newMusic
    };
};