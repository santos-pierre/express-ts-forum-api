import { Express } from 'express-serve-static-core';
import { PaginationOption } from '..';
import FormErrors from '../../interfaces/FormErrors';
declare module 'express-serve-static-core' {
    interface Request {
        validatedData?: any;
        pagination: PaginationOption;
    }
}
