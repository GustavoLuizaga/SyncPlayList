import { useState, useEffect } from "react";
import { getRecentlyAddedMusic } from "../services/music.services";

export function useRecentlyAddedMusic() {
  const [recentlyMusicAdded, setRecentlyMusicAdded] = useState([]);

  const fetchRecentlyMusicAdded = async () => {
    try {
      const data = await getRecentlyAddedMusic(7);
      setRecentlyMusicAdded(data);
    } catch (error) {
      console.error("Error fetching recently added music:", error.message);
    }
  };

  useEffect(() => {
    fetchRecentlyMusicAdded();
  }, []);

  return { recentlyMusicAdded };
}
