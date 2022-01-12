"use strict";

const getOneWishlist = async (userId, productId) => {
  const wishlist = await strapi
    .query("wishlist")
    .findOne({ member: userId, product: productId });

  return wishlist;
};

const getWishlist = async (userId) => {
  const wishlists = await strapi
    .query("wishlist")
    .find({ member: userId }, ["product.category"]);

  return wishlists;
};

const createWishlist = async (userId, productId) => {
  const wishlist = await strapi
    .query("wishlist")
    .create({ member: userId, product: productId });

  return wishlist;
};

const deleteWishlist = async (id) => {
  const wishlist = await strapi.query("wishlist").delete({
    id: id,
  });

  return wishlist;
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
