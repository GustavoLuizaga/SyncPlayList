import prisma from "../src/config/prisma.client";
import { genreSeeder } from "./seeders/genre.seeder";
import { roleSeeder } from "./seeders/role.seeder";
import { userSeeder } from "./seeders/user.seeder";

async function main() {
    try {

        await roleSeeder();
       
        await genreSeeder();
  
        await userSeeder();
    
    } catch (error) {
       
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