"use strict";

const errorHandle = {
  PRODUCT_NOT_FOUND: {
    id: "Product.not.found",
    statusCode: 404,
    message: "Product does not exist",
  },
};

const errorHandler = (key) =>
  strapi.services.common.errorHandlerV3("Product", errorHandle, key);

module.exports = { errorHandler };
