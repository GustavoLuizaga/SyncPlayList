interface IMusic {
    music_id: string;
    title: string;
    description: string;
    url: string;
    image_url: string;
    duration: number;
    artist: string;
    addedAt: Date;
    musicGenres: string[];
}
export default IMusic;