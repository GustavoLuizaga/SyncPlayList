import { useState, useEffect } from "react";
import { getAllMusicsSortedByTittle } from "../services/music.services";

export function useAllMusic() {
  const [music, setMusic] = useState([]);
  
  const fetchAllMusic = async () => {
    try {
      const data = await getAllMusicsSortedByTittle();
      setNewDataMusic(data);
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };

  const setNewDataMusic = (newData) => {
    setMusic(newData);
  }

  useEffect(() => {
    fetchAllMusic();
  }, []);

  return { music, setNewDataMusic };
}
