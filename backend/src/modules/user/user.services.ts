import { IUser } from "./interface/user.interface";
import { IServiceResponse } from '../../types/service.response.interface';
import prisma from "../../config/prisma.client";
import { securePass } from "../../tools/crypto.tool";
import { IRegisterDto } from "../auth/dto/Register.dto";
import { User } from "../../generated/prisma";

export const findUserById = async (user_id: string): Promise<IServiceResponse<IUser>> => {
    try {
        const userFound = await prisma.user.findUnique({
            where: { user_id: user_id },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!userFound) {
            return {
                ok: false,
                message: "User not found"
            };
        }

        const roles = userFound.userRoles.map(ur => ur.role.role_name);

        const userResponse: IUser = {
            user_id: userFound.user_id,
            email: userFound.email,
            username: userFound.username,
            password: userFound.password,
            role: roles
        };

        return {
            ok: true,
            message: "User found successfully",
            data: userResponse
        };
    } catch (error) {
        return {
            ok: false,
            message: "An error occurred while fetching the user"
        };
    }
}

export const verifyEmailInUse = async (email: string): Promise<IServiceResponse<boolean>> => {
    try {
        const isEmailRegistered = await prisma.user.findUnique({
            where: { email: email }
        });
        if (isEmailRegistered) {
            return {
                ok: true,
                message: "Email is already in use",
                data: true
            };
        } else {
            return {
                ok: true,
                message: "Email is available",
                data: false
            };
        }
    } catch (error) {
        return {
            ok: false,
            message: "An error occurred while verifying the email"
        };
    }
}

export const createNewUser = async (payload: IRegisterDto): Promise<IServiceResponse<IUser>> => {
    const passHash = await securePass(payload.password);

    if (!passHash) {
        return {
            ok: false,
            message: "Error hash password"
        };
    }

    const userRole = await prisma.role.findUnique({
        where: { role_name: "user" }
    });

    if (!userRole) {
        return {
            ok: false,
            message: "User role not found"
        };
    }
    try {
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

        return {
            ok: true,
            message: "User created successfully",
            data: {
                user_id: newUser.user_id,
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
                role: newUser.userRoles.map(ur => ur.role.role_name)
            }
        };

    } catch (error) {
        return {
            ok: false,
            message: "An error occurred while creating the user"
        }
    }
}

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
            where: { email: email },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
}

