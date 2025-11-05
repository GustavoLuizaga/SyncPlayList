import IMusic from "../interfaces/musc.interface";

export const mapperToIMusic = (musicData: any): IMusic => {
    return {
        music_id: musicData.music_id,
        title: musicData.title,
        description: musicData.description,
        url: musicData.url,
        image_url: musicData.image_url,
        duration: musicData.duration,
        artist: musicData.artist,
        addedAt: musicData.addedAt,
        musicGenres: musicData.musicGenres?.map((mg: any) => mg.genre.name) || []
    };
};

export const mapperToIMusicArray = (musicDataArray: any[]): IMusic[] => {
    return musicDataArray.map(mapperToIMusic);
};
