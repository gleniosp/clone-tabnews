export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("An unexpected internal error has happened.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Contact the support team.";
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
    super(message || "Service is currently unavailable.", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Verify if the service is currently available.";
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

export class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message || "A validation error has occurred.", {
      cause,
    });
    this.name = "ValidationError";
    this.action = action || "Adjust the provided data and try again.";
    this.statusCode = 400;
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

export class NotFoundError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Resource wasn't found in the system.", {
      cause,
    });
    this.name = "NotFoundError";
    this.action = action || "Verify if the query parameters are correct.";
    this.statusCode = 404;
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

export class UnauthorizedError extends Error {
  constructor({ cause, message, action }) {
    super(message || "User isn't authenticated.", {
      cause,
    });
    this.name = "UnauthorizedError";
    this.action = action || "Log in again to continue.";
    this.statusCode = 401;
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
    super("Not allowed method for this endpoint.");
    this.name = "MethodNotAllowedError";
    this.action =
      "Verify if the provided HTTP method is valid for this endpoint.";
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
