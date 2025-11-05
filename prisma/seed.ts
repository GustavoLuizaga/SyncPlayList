import prisma from "../src/config/prisma.client";
import { genreSeeder } from "./seeders/genre.seeder";
import { roleSeeder } from "./seeders/role.seeder";

async function main() {
    try {
        
        await genreSeeder();
        await roleSeeder();
        
    } catch (error) {
        console.error("Error executing seeders:", error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });