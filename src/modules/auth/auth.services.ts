import { IUser } from '../user/interface/user.interface';
import { IServiceResponse } from '../../types/service.response.interface';
import { securePass } from '../../tools/crypto.tool';
import prisma from '../../config/prisma.client';
import { IRegisterDto } from './dto/Register.dto';

export const registerUser = async (payload: IRegisterDto ): Promise<IServiceResponse<IUser>> => {
    try {
        const passHash = await securePass(payload.password);

        if (!passHash) {
            return {
                ok: false,
                message: "Error al encriptar la contraseña"
            };
        }

        const userRole = await prisma.role.findUnique({
            where: { role_name: "user" }
        });

        if (!userRole) {
            return {
                ok: false,
                message: "Rol de usuario no encontrado"
            };
        }

        const newUser = await prisma.user.create({
            data: {
                email: payload.email,
                username: payload.username,
                password: passHash,
                userRoles: {
                    create: {
                        role: {
                            connect: { role_id: userRole.role_id }
                        }
                    }
                }
            },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        const userWithRoles: IUser = {
            user_id: newUser.user_id,
            email: newUser.email,
            username: newUser.username,
            password: newUser.password,
            role: newUser.userRoles.map(ur => ur.role.role_name)
        };

        return {
            ok: true,
            message: "Usuario registrado exitosamente",
            data: userWithRoles
        };
    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error desconocido al registrar usuario"
        };
    }
};