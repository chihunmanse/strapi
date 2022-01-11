"use strict";

const errorHandle = {
  DUPLICATE_EMAIL: {
    id: "Duplicate.email",
    statusCode: 409,
    message: "Aleady exist Email",
  },
  EMAIL_VALIDATION_ERROR: {
    id: "Validation.error.email",
    statusCode: 400,
    message: "Invalid Email",
  },
  PASSWORD_VALIDATION_ERROR: {
    id: "Validation.error.password",
    statusCode: 400,
    message: "Invalid Password",
  },
  INVALID_EMAIL: {
    id: "Invalid.email",
    statusCode: 400,
    message: "Does not exist Email",
  },
  INVALID_PASSWORD: {
    id: "Invalid.password",
    statusCode: 400,
    message: "Invalid Password",
  },
  UNAUTHORIZED: {
    id: "Unauthorized",
    statusCode: 401,
    message: "Invalid access token",
  },
};

const errorHandler = (key) =>
  strapi.services.common.errorHandlerV3("Member", errorHandle, key);

module.exports = { errorHandler };
