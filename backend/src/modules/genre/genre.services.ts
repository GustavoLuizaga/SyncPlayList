import prisma from "../../config/prisma.client";

export const getGenresByMusicId = async (id: string): Promise<string[]> => {

    const genres = await prisma.musicGenre.findMany({
        where: { music_id: id },
        include: { genre: true }
    });

    return genres.map(g => g.genre.name);
};

    