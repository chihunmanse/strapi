"use strict";

const getProduct = async (query) => {
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
    _limit: offset || 0 + limit || 10,
  });

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

const getOneProduct = async (id) => {
  const { countWishlist } = strapi.services.wishlist;
  const product = await strapi.query("product").findOne({ id: id });

  if (!product) throw Error("PRODUCT_NOT_FOUND");

  const count = await countWishlist(id);

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
    wishlistCount: count,
  };
  return data;
};

module.exports = { getProduct, getOneProduct };
