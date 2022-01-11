"use strict";

const getOneWishlist = async (userId, productId) => {
  const wishlist = await strapi
    .query("wishlist")
    .findOne({ member: userId, product: productId });

  return wishlist;
};

const getWishlist = async (userId) => {
  const wishlists = await strapi.query("wishlist").find({ member: userId });
  const data = wishlists.reduce((acc, cur) => {
    acc.push({
      id: cur.id,
      product: {
        id: cur.product.id,
        name: cur.product.name,
        price: cur.product.price,
        thumbnail_image: cur.product.thumbnail_image,
      },
      created_at: cur.created_at,
    });
    return acc;
  }, []);
  return data;
};

const createWishlist = async (userId, productId) => {
  const wishlist = await strapi
    .query("wishlist")
    .create({ member: userId, product: productId });

  return wishlist;
};

const deleteWishlist = async (id) => {
  await strapi.query("wishlist").delete({
    id: id,
  });

  return "delete";
};

const countWishlist = async (productId) => {
  const count = await strapi.query("wishlist").count({ product: productId });

  return count;
};

module.exports = {
  getOneWishlist,
  getWishlist,
  createWishlist,
  deleteWishlist,
  countWishlist,
};
