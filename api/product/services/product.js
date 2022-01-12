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
    _limit: limit || 10,
  });

  return products;
};

const getOneProduct = async (id) => {
  const product = await strapi.query("product").findOne({ id: id });
  return product;
};

module.exports = { getProduct, getOneProduct };
