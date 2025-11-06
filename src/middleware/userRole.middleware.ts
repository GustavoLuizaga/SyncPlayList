import { NextFunction, Request, Response } from "express";
//import { UserRole } from "../modules/users/interfaces/users.interface";
import prisma from "../../src/config/prisma.client"; 

export const userRoleValidation = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.session.user_id;

    if (!user_id) {
      return res.status(401).send({
        message: 'Unauthorized',
        ok: false,
        status: 401, 
      })
    }

    const user = await prisma.user.findUnique({
      where: { user_id: user_id },
      include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
    });
  
    if (!user) {
      return res.status(401).send({
        message: 'Unauthorized: user not found',
        ok: false,
        status: 401, 
      })
    }

    const userRoleNames = user.userRoles.map(userRol => userRol.role?.role_name);

    
    const hasRole = userRoleNames.some(userRole => roles.includes(userRole!));

    if (!hasRole) {
      return res.status(403).send({
        message: 'Forbidden not enough permissions',
        ok: false,
        status: 403, 
      })
    }
  
    next();
  }
}
