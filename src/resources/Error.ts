import { FormErrors } from '@/types';

export class ErrorResponse {
    public message: string;
    public status: number;
    constructor(message: string, status = 400) {
        this.status = status;
        this.message = message;
    }
}

export class UnauthorizedErrorResponse extends ErrorResponse {
    constructor(message: string = 'Unauthorized: Are you connected ?') {
        super(message, 401);
    }
}

export class ForbiddenErrorResponse extends ErrorResponse {
    constructor(message: string = 'Forbidden: Are you lost ?') {
        super(message, 403);
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
