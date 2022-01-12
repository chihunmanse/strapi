"use strict";

const errorHandle = {
  CATEGORY_NOT_FOUND: {
    id: "Category.not.found",
    statusCode: 404,
    message: "Category does not exist",
  },
};

const errorHandler = (key) =>
  strapi.services.common.errorHandlerV3("Category", errorHandle, key);

module.exports = { errorHandler };
