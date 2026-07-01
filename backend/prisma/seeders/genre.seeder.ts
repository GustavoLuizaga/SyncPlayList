import prisma from "../../src/config/prisma.client";

export const genreSeeder = async () => {
    const genres = [
        { name: "Alternative Rock" },
        { name: "Rock" },
        { name: "Pop" },
        { name: "Jazz" },
        { name: "Classical" },
        { name: "Hip-Hop" },
        { name: "Electronic" },
        { name: "Reggae" },
        { name: "Blues" },
        { name: "Country" },
        { name: "R&B" },
        { name: "Soul" },
        { name: "Funk" },
        { name: "Metal" },
        { name: "Punk" },
    ];

    for (const genre of genres) {
        await prisma.genre.upsert({
            where: { name: genre.name },
            update: {},
            create: { name: genre.name },
        });
    }
};
