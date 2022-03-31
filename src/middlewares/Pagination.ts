import { NextFunction, Request, Response } from 'express';

type PaginationOptions = {
    defaultLimit: number;
    maxLimit: number;
};

const defaultOptions: PaginationOptions = {
    defaultLimit: 20,
    maxLimit: 50,
};

const Pagination = (options?: PaginationOptions) => {
    const { defaultLimit, maxLimit } = { ...defaultOptions, ...options };

    return (req: Request, res: Response, next: NextFunction) => {
        const userOffset = parseInt(req.query.offset as string);
        const userLimit = parseInt(req.query.limit as string);

        const offset = !isNaN(userOffset) && userOffset > 0 ? userOffset : 0;
        const limit = !isNaN(userLimit) && userLimit > 0 ? Math.min(userLimit, maxLimit) : defaultLimit;

        req.pagination = { offset, limit };
        next();
    };
};

export default Pagination;
