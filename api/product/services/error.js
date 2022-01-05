"use strict";

const errorHandle = {
  PRODUCT_NOT_FOUND: {
    id: "Product.not.found",
    statusCode: 404,
    message: "조회한 상품이 존재하지 않습니다.",
  },
};

const errorHandler = (key) =>
  strapi.services.common.errorHandlerV3("Product", errorHandle, key);

module.exports = { errorHandler };
