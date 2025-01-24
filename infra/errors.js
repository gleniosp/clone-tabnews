export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("An unexpected internal error has happened", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Contact the support team";
    this.statusCode = statusCode || 500;
  }

  // overwrites the JSON method from Error
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Service is currently unavailable", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Verify if the service is currently available";
    this.statusCode = 503;
  }

  // overwrites the JSON method from Error
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Not allowed method for this endpoint");
    this.name = "MethodNotAllowedError";
    this.action =
      "Verify if the provided HTTP method is valid for this endpoint";
    this.statusCode = 405;
  }

  // overwrites the JSON method from Error
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
