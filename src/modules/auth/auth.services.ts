import { IUser } from '../user/interface/user.interface';
import { IServiceResponse } from '../../types/service.response.interface';
import { securePass, validatePassHash} from '../../tools/crypto.tool';
import prisma from '../../config/prisma.client';
import { IRegisterDto } from './dto/Register.dto';
import { ILoginDto } from './dto/Login.dto';
import { ILoginResponse } from './interface/login.response.interface';
import { generateAccessToken }  from '../../tools/jwt.tool';

export const registerUser = async (payload: IRegisterDto ): Promise<IServiceResponse<IUser>> => {
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

        const userWithRoles: IUser = {
            user_id: newUser.user_id,
            email: newUser.email,
            username: newUser.username,
            password: newUser.password,
            role: newUser.userRoles.map(userRol => userRol.role.role_name)
        };

        return {
            ok: true,
            message: "User registered successfully",
            data: userWithRoles
        };
    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error registering user"
        };
    }
};

export const loginUser = async (payload: ILoginDto): Promise<IServiceResponse<ILoginResponse>> => {
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
        const token = generateAccessToken({user_id: user.user_id, name: user.username, email: user.email});

        if (!isValid) {
            return {
                ok: false,
                message: "Invalid password"
            };
        }

        const loginResponse: ILoginResponse = {
            user_id: user.user_id,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.userRoles.map(userRol => userRol.role.role_name),
            token: token
        };

        return {
            ok: true,
            message: "User logged in successfully",
            data: loginResponse
        };
    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error logging in user"
        };
    }
};
