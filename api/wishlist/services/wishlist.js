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

const generateWishlistData = (wishlists) => {
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

  return data;
};

module.exports = {
  getOneWishlist,
  getWishlists,
  createWishlist,
  deleteWishlist,
  countWishlist,
  generateWishlistData,
};
