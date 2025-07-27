export class BadRequestError extends Error {
    readonly code
    constructor(message: string) {
        super(message);
        this.code = 400;
    }
}

export class UnauthorizedError extends Error {
    readonly code
    constructor(message: string) {
        super(message);
        this.code = 401;
    }
}

export class ForbiddenError extends Error {
    readonly code
    constructor(message: string) {
        super(message);
        this.code = 403;
    }
}

export class NotFoundError extends Error {
    readonly code
    constructor(message: string) {
        super(message);
        this.code = 404;
    }
}

export const customErrors = [
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
]
