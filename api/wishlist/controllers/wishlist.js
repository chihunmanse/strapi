"use strict";

// 로그인 유저 - 상품 좋아요 & 취소
const createOrDeleteWishlist = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getOneProduct } = strapi.services.product;
  const { getOneWishlist, createWishlist, deleteWishlist, countWishlist } =
    strapi.services.wishlist;
  const id = ctx.params.id;
  const user = ctx.request.user;

  try {
    const product = await getOneProduct(id);
    if (!product) throw Error("PRODUCT_NOT_FOUND");
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
  const { errorHandler } = require("../services/error");
  const { getWishlist } = strapi.services.wishlist;
  const user = ctx.request.user;
  try {
    const wishlists = await getWishlist(user.id);
    const data = wishlists.reduce((list, wish) => {
      list.push({
        id: wish.id,
        product: {
          id: wish.product.id,
          name: wish.product.name,
          price: wish.product.price,
          thumbnail_image: wish.product.thumbnail_image,
        },
        category: {
          id: wish.product.category.id,
          name: wish.product.category.name,
        },
        created_at: wish.created_at,
      });
      return list;
    }, []);

    return ctx.send(data);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { createOrDeleteWishlist, findWishlist };
