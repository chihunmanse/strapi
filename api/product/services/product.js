"use strict";
const { countWishlist } = require("../../wishlist/services/wishlist");

const getProducts = async (query) => {
  const { category, sort, offset, limit } = query;

  const sortBy = {
    low_price: "price",
    high_price: "price:desc",
    recent: "created_at:desc",
    old: "created_at",
  };

  const products = await strapi.query("product").find({
    category: category,
    _sort: sortBy[sort] || "id",
    _start: offset || 0,
    _limit: limit || 10,
  });

  return products;
};

const isProductId = async (id) => {
  const product = await strapi.query("product").findOne({ id: id });
  const result = product ? true : false;
  return result;
};

const getOneProduct = async (id) =>
  await strapi.query("product").findOne({ id: id });

const generateProductsData = (products) => {
  const data = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail_image: product.thumbnail_image,
      created_at: product.created_at,
    };
  });

  return data;
};

const generateProductData = async (product) => {
  const likeCount = await countWishlist(product.id);
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

  return data;
};

module.exports = {
  getProducts,
  isProductId,
  getOneProduct,
  generateProductsData,
  generateProductData,
};
