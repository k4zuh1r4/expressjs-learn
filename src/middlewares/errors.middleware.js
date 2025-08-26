import { StatusCodes } from "http-status-codes";
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
export class EmailAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailAlreadyExistsError';
        this.statusCode = StatusCodes.CONFLICT;
    }
}
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || "Something went wrong, please try again later.";
    res.status(statusCode).json({ message: msg });
}
export default errorHandlerMiddleware;