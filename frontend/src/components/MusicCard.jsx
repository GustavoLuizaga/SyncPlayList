import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MusicCard({ music_id, image, titleMusic, artistName }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/music/playback/${music_id}`);
  };

  return (
    <div onClick={handleCardClick} className="w-full rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
      <div className="relative aspect-square">
        <img
          src={image}
          alt={titleMusic}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div
          className="
          absolute inset-0
          bg-linear-to-t
          from-black/90 via-black/30 to-transparent
        "
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold truncate">{titleMusic}</h3>
            <p className="text-sm text-zinc-400 truncate">{artistName}</p>
          </div>
          <span className="hidden group-hover:flex items-center justify-center w-10 h-10 min-w-10 min-h-10 shrink-0 bg-[#1bc6b7] rounded-full shadow-lg hover:scale-110 transition-transform">
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
