"use strict";

// 로그인 유저
const createOrDeleteWishlist = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getOneProduct } = strapi.services.product;
  const { getOneWishlist, createWishlist, deleteWishlist, countWishlist } =
    strapi.services.wishlist;
  const id = ctx.params.id;
  const user = ctx.request.user;

  try {
    const product = await getOneProduct(id);
    let wishlist = await getOneWishlist(user.id, product.id);

    if (wishlist) {
      const data = {
        message: await deleteWishlist(wishlist.id),
        count: await countWishlist(product.id),
      };

      return ctx.send(data, 200);
    }

    wishlist = await createWishlist(user.id, product.id);
    const count = await countWishlist(product.id);

    return ctx.send({ wishlist, count }, 201);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인 유저
const findWishlist = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getWishlist } = strapi.services.wishlist;
  const user = ctx.request.user;
  try {
    const wishlists = await getWishlist(user.id);
    return ctx.send(wishlists);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { createOrDeleteWishlist, findWishlist };
