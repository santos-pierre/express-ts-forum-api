import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '@/models/index';
import { ErrorResponse } from '@/resources/Error';
import JWT from '@/utils/JWT';
import { Success } from '@/resources/Success';

class AuthController {
    constructor() {}

    public static async login(req: Request, res: Response) {
        const { identifier, password } = req.validatedData;
        const user = await db.user.findFirst({
            where: {
                OR: [
                    {
                        email: identifier,
                    },
                    {
                        pseudo: identifier,
                    },
                ],
            },
        });

        if (!user) {
            return res.status(422).json(new ErrorResponse('Invalid credentials'));
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(422).json(new ErrorResponse('Invalid credentials'));
        }

        try {
            const token = await new JWT().generateToken({
                id: user.id,
                pseudo: user.pseudo,
                isAdmin: user.isAdmin,
            });

            return res.status(200).json(new Success({ token }));
        } catch (error) {
            return res.status(404).json('Nothing To See');
        }
    }

    public static async register(req: Request, res: Response) {
        const { pseudo, email, password } = req.validatedData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                pseudo,
                email,
                password: hashedPassword,
            },
        });

        try {
            const token = await new JWT().generateToken({
                id: user.id,
                pseudo: user.pseudo,
                isAdmin: user.isAdmin,
            });

            return res.status(200).json(new Success({ token }));
        } catch (error) {
            return res.status(404).json('Nothing To See');
        }
    }
}

export default AuthController;
