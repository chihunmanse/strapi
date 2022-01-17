"use strict";

const getCategories = async () => await strapi.query("category").find();

const getOneCategory = async (id) =>
  await strapi.query("category").findOne({ id });

const isCategoryId = async (id) => {
  const category = await strapi.query("category").findOne({ id });
  const result = category ? true : false;
  return result;
};

const generateCategoriesData = (categories) => {
  const data = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  });

  return data;
};

const generateCategoryData = (category) => {
  const data = {
    id: category.id,
    name: category.name,
    description: category.description,
    created_at: category.created_at,
  };

  return data;
};

module.exports = {
  getCategories,
  getOneCategory,
  isCategoryId,
  generateCategoriesData,
  generateCategoryData,
};
