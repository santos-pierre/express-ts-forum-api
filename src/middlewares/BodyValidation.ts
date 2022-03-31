import { Request, Response, NextFunction } from 'express';
import { FormErrors } from 'src/types';
import { AnyObjectSchema, ValidationError } from 'yup';

const BodyValidation = (yupValidatorSchema: AnyObjectSchema, errorCode = 422) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!['PATCH', 'POST', 'PUT'].includes(req.method)) {
            return next();
        }
        try {
            const data = await yupValidatorSchema.validate(req.body, { abortEarly: false });
            req.validatedData = data;
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                const formattedErrors = error.inner.reduce((errors: FormErrors, error) => {
                    let { path, message } = error;
                    if (path) {
                        if (!errors.hasOwnProperty(path)) {
                            errors[path] = [message];
                        } else {
                            errors[path].push(message);
                        }
                    }
                    return errors;
                }, {});
                res.status(errorCode).json({ errors: formattedErrors });
            }
        }
    };
};

export default BodyValidation;
