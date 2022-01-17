"use strict";
const { errorHandler } = require("../services/error");
const {
  getOneWishlist,
  createWishlist,
  deleteWishlist,
  countWishlist,
  getWishlists,
  generateWishlistData,
} = require("../services/wishlist");
const {
  isProductId,
  getOneProduct,
} = require("../../product/services/product");

// 로그인 유저 - 상품 좋아요 & 취소
const createOrDeleteWishlist = async (ctx) => {
  const id = ctx.params.id;
  const user = ctx.request.user;

  try {
    if (!(await isProductId(id))) throw Error("PRODUCT_NOT_FOUND");
    const product = await getOneProduct(id);
    const wishlist = await getOneWishlist(user.id, product.id);

    if (wishlist) {
      await deleteWishlist(wishlist.id);
      const count = await countWishlist(product.id);
      return ctx.send({ message: "DELETE", count }, 200);
    }

    await createWishlist(user.id, product.id);
    const count = await countWishlist(product.id);

    return ctx.send({ message: "SUCCESS", count }, 201);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인 유저 - 좋아요한 상품 리스트
const findWishlist = async (ctx) => {
  const user = ctx.request.user;
  try {
    const wishlists = await getWishlists(user.id);
    const data = generateWishlistData(wishlists);

    return ctx.send(data);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { createOrDeleteWishlist, findWishlist };
