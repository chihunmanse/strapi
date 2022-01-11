"use strict";

const findProduct = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const query = ctx.request.query;
  const { getProduct } = strapi.services.product;

  try {
    const data = await getProduct(query);

    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

const findOneProduct = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const id = ctx.params.id;
  const { getOneProduct } = strapi.services.product;

  try {
    const data = await getOneProduct(id);

    return ctx.send(data, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = {
  findProduct,
  findOneProduct,
};
