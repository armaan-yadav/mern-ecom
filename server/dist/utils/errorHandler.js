export class ErrorHandler extends Error {
    message;
    statusCode;
    error;
    constructor(message, statusCode, error) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
        this.statusCode = statusCode;
        this.error = error;
    }
}
