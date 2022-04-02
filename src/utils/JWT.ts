import fs from 'fs';
import jwt, { SignOptions } from 'jsonwebtoken';
import path from 'path';
import { UserPayload } from 'src/types';

class JWT {
    private pathPrivateKey: string = path.resolve(process.cwd(), 'private.key');
    private privateKey: string;
    private defaultOption: SignOptions = { algorithm: 'RS256', expiresIn: '1h' };

    constructor(pathPrivateKey?: string) {
        if (pathPrivateKey) {
            this.pathPrivateKey = pathPrivateKey;
        }
        this.privateKey = fs.readFileSync(this.pathPrivateKey, { encoding: 'utf-8' });
    }

    public generateToken(payload: UserPayload, options?: SignOptions): Promise<string> {
        const mergedOptions = { ...this.defaultOption, ...options };
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.privateKey, mergedOptions, (error, token) => {
                if (error) {
                    return reject(error);
                }

                if (!token) {
                    return reject('Token not valid');
                }

                return resolve(token);
            });
        });
    }
}

export default JWT;
