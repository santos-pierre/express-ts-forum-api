import { Express } from 'express-serve-static-core';
import { PaginationOption, UserPayload } from '..';
import FormErrors from '../../interfaces/FormErrors';
declare module 'express-serve-static-core' {
    interface Request {
        validatedData?: any;
        user: UserPayload;
        pagination: PaginationOption;
    }
}
