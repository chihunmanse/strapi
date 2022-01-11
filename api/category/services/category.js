"use strict";

const getAllCategory = async () => {
  const categories = await strapi.query("category").find();
  const data = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  });

  return data;
};

module.exports = { getAllCategory };
