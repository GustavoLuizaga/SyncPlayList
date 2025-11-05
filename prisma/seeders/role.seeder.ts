import prisma from "../../src/config/prisma.client";

export const roleSeeder = async () => {
    const roles = [
        { role_name: "user" },
        { role_name: "admin" },
        { role_name: "moderator" },
    ];
    
    for (const role of roles) {
        await prisma.role.upsert({
            where: { role_name: role.role_name },
            update: {},
            create: role,
        });
    }
};
