import fs from 'fs';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import path from 'path';
import { UserPayload } from 'src/types';

class JWT {
    private pathPrivateKey: string = path.resolve(process.cwd(), 'private.key');
    private privateKey: string;
    private defaultSignOptions: SignOptions = { algorithm: 'RS256', expiresIn: '1h' };
    private defaultVerifyOptions: VerifyOptions = { algorithms: ['RS256'] };
    private defaultErrorMessage: string = 'Invalid valid';

    constructor(pathPrivateKey?: string) {
        if (pathPrivateKey) {
            this.pathPrivateKey = pathPrivateKey;
        }
        this.privateKey = fs.readFileSync(this.pathPrivateKey, { encoding: 'utf-8' });
    }

    public generateToken(payload: UserPayload, options?: SignOptions): Promise<string> {
        const mergedOptions = { ...this.defaultSignOptions, ...options };
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.privateKey, mergedOptions, (error, token) => {
                if (error) {
                    return reject(error);
                }

                if (!token) {
                    return reject(this.defaultErrorMessage);
                }

                return resolve(token);
            });
        });
    }

    public decodeJWT = (token: string, options?: VerifyOptions): Promise<UserPayload> => {
        const mergedOptions = { ...this.defaultVerifyOptions, ...options };

        if (!token) {
            return Promise.reject(new Error(this.defaultErrorMessage));
        }

        return new Promise((resolve, reject) => {
            jwt.verify(token, this.privateKey, mergedOptions, (error, data) => {
                if (error) {
                    return reject(error);
                }

                if (!data) {
                    return reject(this.defaultErrorMessage);
                }

                const { id, pseudo, isAdmin } = data as UserPayload;

                resolve({
                    id,
                    pseudo,
                    isAdmin,
                });
            });
        });
    };
}

export default JWT;
