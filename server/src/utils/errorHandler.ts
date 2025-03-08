export class ErrorHandler extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public error?: Object
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}
