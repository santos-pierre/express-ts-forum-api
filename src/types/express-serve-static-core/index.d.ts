import { PaginationOption, UserPayload } from '..';
declare module 'express-serve-static-core' {
    interface Request {
        validatedData?: any;
        user: UserPayload;
        pagination: PaginationOption;
    }
}
