"use strict";

const errorHandle = {};

const errorHandler = (key) =>
  strapi.services.common.errorHandlerV3("Category", errorHandle, key);

module.exports = { errorHandler };
