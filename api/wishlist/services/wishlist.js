"use strict";

const getWishlists = async (userId) =>
  await strapi.query("wishlist").find({ member: userId }, ["product.category"]);

const getOneWishlist = async (userId, productId) =>
  await strapi
    .query("wishlist")
    .findOne({ member: userId, product: productId });

const createWishlist = async (userId, productId) =>
  await strapi.query("wishlist").create({ member: userId, product: productId });

const deleteWishlist = async (id) =>
  await strapi.query("wishlist").delete({ id: id });

const countWishlist = async (productId) =>
  await strapi.query("wishlist").count({ product: productId });

module.exports = {
  getOneWishlist,
  getWishlists,
  createWishlist,
  deleteWishlist,
  countWishlist,
};
