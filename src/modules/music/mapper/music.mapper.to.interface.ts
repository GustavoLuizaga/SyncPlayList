import IMusic from "../interfaces/musc.interface";
import { countLikesForMusic } from "../music.services";


export const mapperToIMusic = async (musicData: any): Promise<IMusic> => {
    return {
        music_id: musicData.music_id,
        title: musicData.title,
        description: musicData.description,
        url: musicData.url,
        image_url: musicData.image_url,
        duration: musicData.duration,
        artist: musicData.artist,
        addedAt: musicData.addedAt,
        musicGenres: musicData.musicGenres?.map((mg: any) => mg.genre.name) || [],
        quantityLikes: await countLikesForMusic(musicData.music_id) || 0,
    };
};

export const mapperToIMusicArray = async (musicDataArray: any[]): Promise<IMusic[]> => {
    return Promise.all(musicDataArray.map(mapperToIMusic));
};
