import prisma from "../../src/config/prisma.client";
import bcrypt from "bcrypt";

export const userSeeder = async () => {

    const adminRole = await prisma.role.findUnique({
        where: { role_name: "admin" }
    });

    if (!adminRole) {
        console.error("❌ Rol 'admin' no encontrado. Ejecuta primero el roleSeeder.");
        return;
    }
    const passwordHash = await bcrypt.hash("Admin123!", 10);

    await prisma.user.upsert({
        where: { email: "admin@syncplaylist.com" },
        update: {},
        create: {
            email: "admin@syncplaylist.com",
            username: "admin",
            password: passwordHash,
            userRoles: {
                create: {
                    role: {
                        connect: { role_id: adminRole.role_id }
                    }
                }
            }
        }
    });
};
