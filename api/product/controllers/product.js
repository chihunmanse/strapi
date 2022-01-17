"use strict";
const { errorHandler } = require("../services/error");
const {
  getProducts,
  isProductId,
  getOneProduct,
  generateProductsData,
  generateProductData,
} = require("../services/product");

// 상품 목록
const findProduct = async (ctx) => {
  const query = ctx.request.query;

  try {
    const products = await getProducts(query);
    const data = generateProductsData(products);

    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 상품 조회
const findOneProduct = async (ctx) => {
  const id = ctx.params.id;

  try {
    if (!(await isProductId(id))) throw Error("PRODUCT_NOT_FOUND");
    const product = await getOneProduct(id);
    const data = await generateProductData(product);

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
