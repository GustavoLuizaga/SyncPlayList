import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getMusicDetailsbyId } from "../services/music.services";

export function MusicPlaybackPage() {
    const {music_id} = useParams();
    const [musicDetails, setMusicDetails] = useState(null);

    const fetchMusicDetails = async (music_id) => {
        try {
            const musicDetails = await getMusicDetailsbyId(music_id);
            setMusicDetails(musicDetails);
        } catch (error) {
            console.error("Error fetching music details:", error.message);
        }
    }

    useEffect(() => {
        fetchMusicDetails(music_id);
    }, [music_id]);

    return (
        <div className="text-white flex flex-row gap-8">
        <section>
            <img src={musicDetails?.image_url || ""} alt={`image ${musicDetails?.title || "Unknown"}`} />
        </section>

        <section>
            <article>
                <h1>
                    Aqui ira el menu de a continuacion se mostrara el titulo de la musica, el artista y un boton para reproducir la musica
                </h1>
            </article>
        </section>
        </div>
    )
}