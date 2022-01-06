"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

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
