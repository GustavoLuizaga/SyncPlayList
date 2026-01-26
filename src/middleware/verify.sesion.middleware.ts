import { Request, Response, NextFunction } from "express";
import { decodedToken, IAuthPayload } from "../../src/tools/jwt.tool";

declare global {
    namespace Express {
        interface Request {
            session?: any;//Type IAuthPayload
        }
    }
}

export const verifySessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({
            message: 'unauthorized: No token provided', 
            status: 401,
            ok: false
        });
    }   

    try {
        const decoded = decodedToken(accessToken);
        req.session = decoded;

    } catch (error) {
            return res.status(401).json({
            message: 'unauthorized: Invalid token',
            status: 401,
            ok: false
        });
    }
    next();
};