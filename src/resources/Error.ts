import { FormErrors } from 'src/types';

export class ErrorResponse {
    public message: string;
    public status: number;
    constructor(message: string, status = 400) {
        this.status = status;
        this.message = message;
    }
}

export class NotFoundErrorResponse extends ErrorResponse {
    constructor(message: string) {
        super(message, 404);
    }
}

export class InvalidFieldErrorResponse extends ErrorResponse {
    public fieldErrors: FormErrors;
    constructor(message: string, fieldErrors: FormErrors, status = 422) {
        super(message, status);
        this.fieldErrors = fieldErrors;
    }
}
