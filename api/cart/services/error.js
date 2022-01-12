"use strict";

const errorHandle = {
  PRODUCT_NOT_FOUND: {
    id: "Product.not.found",
    statusCode: 404,
    message: "Product does not exist",
  },
  CART_NOT_FOUND: {
    id: "Cart.not.found",
    statusCode: 404,
    message: "Cart does not exist",
  },
  INVALID_CART_ID: {
    id: "Invalid.cart.id",
    statusCode: 400,
    message: "Invalid Cart Id",
  },
  QUANTITY_VALIDATION_ERROR: {
    id: "Validation.error.quantity",
    statusCode: 400,
    message: "Invalid quantity",
  },
};

const errorHandler = (key) =>
  strapi.services.common.errorHandlerV3("Cart", errorHandle, key);

module.exports = { errorHandler };
