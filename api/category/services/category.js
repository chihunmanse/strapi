"use strict";

const getCategories = async () => await strapi.query("category").find();

const getOneCategory = async (id) =>
  await strapi.query("category").findOne({ id });

const isCategoryId = async (id) => {
  const category = await strapi.query("category").findOne({ id });
  const result = category ? true : false;
  return result;
};

module.exports = { getCategories, getOneCategory, isCategoryId };
