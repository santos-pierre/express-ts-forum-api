import { NextFunction, Request, Response } from 'express';
import db from '@/models/index';
import { ForbiddenErrorResponse, UnauthorizedErrorResponse } from '@/resources/Error';
import JWT from '@/utils/JWT';

type AuthOptions = {
    adminRight: boolean;
};

const Auth = (options: AuthOptions = { adminRight: false }) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json(new UnauthorizedErrorResponse());
        }

        try {
            const user = await new JWT().decodeJWT(token);

            if (options.adminRight) {
                const admin = await db.user.findFirst({
                    where: {
                        AND: {
                            id: user.id,
                            isAdmin: true,
                        },
                    },
                });

                if (!admin) {
                    return res.status(403).json(new ForbiddenErrorResponse());
                }
            }

            req.user = user;
        } catch (error) {
            return res.status(401).json();
        }

        next();
    };
};

export default Auth;
