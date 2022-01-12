"use strict";

// 상품 목록
const findProduct = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const query = ctx.request.query;
  const { getProduct } = strapi.services.product;

  try {
    const products = await getProduct(query);
    const data = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        thumbnail_image: product.thumbnail_image,
        created_at: product.created_at,
      };
    });

    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 상품 조회
const findOneProduct = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const id = ctx.params.id;
  const { getOneProduct } = strapi.services.product;
  const { countWishlist } = strapi.services.wishlist;

  try {
    const product = await getOneProduct(id);
    if (!product) throw Error("PRODUCT_NOT_FOUND");
    const likeCount = await countWishlist(id);

    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail_image: product.thumbnail_image,
      created_at: product.created_at,
      category: {
        id: product.category.id,
        name: product.category.name,
        description: product.category.description,
      },
      wishlistCount: likeCount,
    };

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
