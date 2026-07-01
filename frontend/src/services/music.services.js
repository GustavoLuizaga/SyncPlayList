import { ENV } from "../config/env.config";

export const getRecentlyAddedMusic = async (days = 7) => {
  const response = await fetch(`${ENV.BACKEND_URL}/music?days=${days}`, {
    credentials: "include",
  });
  
  const data  = await response.json();
  
  if (!response.ok) {
    throw new Error(`${data.message || response.statusText}`);
  }
  return data.data;
};

export const getAllMusicsSortedByTittle = async () => {
  const response = await fetch(`${ENV.BACKEND_URL}/music?sortBy=title&sortorder=desc`, {
    credentials: "include",
  });
  
  const data  = await response.json();
  
  if (!response.ok) {
    throw new Error(`${data.message || response.statusText}`);
  }
  return data.data;
};

export const getMusicDetailsbyId = async (music_id) => {
  const response = await fetch(`${ENV.BACKEND_URL}/music/${music_id}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.message || response.statusText}`);
  }
  return data.data;
}

