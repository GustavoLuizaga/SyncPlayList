import { IServiceResponse } from '../../types/service.response.interface';
import { validatePassHash } from '../../tools/crypto.tool';
import { IRegisterDto } from './dto/Register.dto';
import { ILoginDto } from './dto/Login.dto';
import { IAuthResponse } from './interface/auth.response.interface';
import { generateAccessToken, generateRefreshToken, decodedToken } from '../../tools/jwt.tool';
import { verifyEmailInUse, createNewUser, findUserByEmail } from '../user/user.services';

export const registerUser = async (payload: IRegisterDto): Promise<IServiceResponse<IAuthResponse>> => {
    try {
        const existingUser = await verifyEmailInUse(payload.email);

        if (existingUser.ok) {
            return {
                ok: false,
                message: existingUser.message
            };
        }

        const newUser = await createNewUser(payload);
        if (!newUser.ok || !newUser.data) {
            return {
                ok: false,
                message: "Error creating user"
            };
        }

        const accessToken = generateAccessToken({
            user_id: newUser.data.user_id,
            name: newUser.data.username,
            email: newUser.data.email,
            user_name: newUser.data.username
        });

        const refreshToken = generateRefreshToken({
            user_id: newUser.data.user_id,
            name: newUser.data.username,
            email: newUser.data.email,
            user_name: newUser.data.username
        });

        const authResponse: IAuthResponse = {
            user_id: newUser.data.user_id,
            email: newUser.data.email,
            username: newUser.data.username,
            role: newUser.data.role,
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
        const user = await findUserByEmail(payload.email);

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
