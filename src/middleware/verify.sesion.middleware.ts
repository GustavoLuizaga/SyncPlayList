import { Request, Response, NextFunction } from "express";
import { decodedToken, IAuthPayload } from "../../src/tools/jwt.tool";

declare global {
    namespace Express {
        interface Request {
            session?: IAuthPayload;
        }
    }
}

export const verifySessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'unauthorized: No token provided', 
            status: 401,
            ok: false
        });
    }   

    const decoded = decodedToken(token);

    if (!decoded) {
        return res.status(401).json({
            message: 'unauthorized: Invalid token',
            status: 401,
            ok: false
        });
    }

    req.session = decoded;
    
    next();
};