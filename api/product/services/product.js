"use strict";

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

module.exports = { getProducts, isProductId, getOneProduct };
