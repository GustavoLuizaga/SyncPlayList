import IMusic from "../../music/interfaces/musc.interface";

export interface IPlaylist {
    playlist_id: string;
    createdAt: Date;
    musicList?: IMusic[];    
}