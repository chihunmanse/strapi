"use strict";

const getCategory = async () => {
  const categories = await strapi.query("category").find();
  return categories;
};

const getOneCategory = async (id) => {
  const category = await strapi.query("category").findOne({ id });
  return category;
};

module.exports = { getCategory, getOneCategory };
