import MusicCard from "../components/MusicCard";
import { useRecentlyAddedMusic } from "../hooks/useRecentlyAddedMusic";
import { useAllMusic } from "../hooks/useAllMusic";
import { useState } from "react";

export function MusicPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { recentlyMusicAdded } = useRecentlyAddedMusic();
  const { music, setNewDataMusic } = useAllMusic();

  const handleSearchChange = async (event) =>{
    const newSearchParam = event.target.value
    setSearchTerm(newSearchParam);
  }
  return (
    <div className=" text-white">
      <div className="flex justify-end mb-6">
      </div>
      { recentlyMusicAdded?.length > 0 &&
      <section>
        <h1 className="text-subtitle-gradient-hero ">Recently added</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {recentlyMusicAdded?.length > 0 ? (
            recentlyMusicAdded.map((music) => (
              <MusicCard
                key={music.music_id}
                music_id={music.music_id}
                image={music.image_url}
                titleMusic={music.title}
                artistName={music.artist}
              />
            ))
          ) : (
            <p className="text-white/50 col-span-full text-center">
              No recently added music found.
            </p>
          )}
        </div>
      </section>
    }
      <section className="mt-8">
        <h1 className="text-subtitle-gradient-hero ">Music Page</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {music?.length > 0 ? (
            music.map((music) => (
              <MusicCard
                key={music.music_id}
                music_id={music.music_id}
                image={music.image_url}
                titleMusic={music.title}
                artistName={music.artist}
              />
            ))
          ) : (
            <p className="text-white/50 col-span-full text-center">
              No music found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
