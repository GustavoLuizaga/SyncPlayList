import { IUser } from '../user/interface/user.interface';
import { IServiceResponse } from '../../types/service.response.interface';
import { securePass, validatePassHash } from '../../tools/crypto.tool';
import prisma from '../../config/prisma.client';
import { IRegisterDto } from './dto/Register.dto';
import { ILoginDto } from './dto/Login.dto';
import { IAuthResponse } from './interface/auth.response.interface';
import { generateAccessToken, generateRefreshToken, decodedToken } from '../../tools/jwt.tool';
import { de } from 'zod/v4/locales';

export const registerUser = async (payload: IRegisterDto): Promise<IServiceResponse<IAuthResponse>> => {
    try {

        const existingUser = await prisma.user.findUnique({
            where: { email: payload.email }
        });

        if (existingUser) {
            return {
                ok: false,
                message: "Email already in use"
            };
        }

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

        //Auto login after register

        const accessToken = generateAccessToken({
            user_id: newUser.user_id,
            name: newUser.username,
            email: newUser.email,
            user_name: newUser.username
        });

        const refreshToken = generateRefreshToken({
            user_id: newUser.user_id,
            name: newUser.username,
            email: newUser.email,
            user_name: newUser.username
        });

        const authResponse: IAuthResponse = {
            user_id: newUser.user_id,
            email: newUser.email,
            username: newUser.username,
            role: newUser.userRoles.map(userRol => userRol.role.role_name),
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        return {
            ok: true,
            message: "User registered successfully",
            data: authResponse
        };
    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error registering user"
        };
    }
};

export const loginUser = async (payload: ILoginDto): Promise<IServiceResponse<IAuthResponse>> => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: payload.email },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!user) {
            return {
                ok: false,
                message: "User not found"
            };
        }

        const isValid = await validatePassHash(payload.password, user.password);

        if (!isValid) {
            return {
                ok: false,
                message: "Invalid password"
            };
        }

        const accessToken = generateAccessToken({
            user_id: user.user_id,
            name: user.username,
            email: user.email,
            user_name: user.username
        });

        const refreshToken = generateRefreshToken({
            user_id: user.user_id,
            name: user.username,
            email: user.email,
            user_name: user.username
        });

        const authResponse: IAuthResponse = {
            user_id: user.user_id,
            email: user.email,
            username: user.username,
            role: user.userRoles.map(userRol => userRol.role.role_name),
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        return {
            ok: true,
            message: "User logged in successfully",
            data: authResponse
        };
    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error logging in user"
        };
    }
};

export const refreshAccessToken = async (refreshToken: string) =>{
    const decodedRefreshToken = decodedToken(refreshToken);
    return generateAccessToken({
        user_id: decodedRefreshToken.user_id,
        name: decodedRefreshToken.name,
        email: decodedRefreshToken.email,
        user_name: decodedRefreshToken.user_name
    });
}
