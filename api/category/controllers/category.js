"use strict";

// 카테고리 목록
const findCategory = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getCategory } = strapi.services.category;

  try {
    const categories = await getCategory();

    const data = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        description: category.description,
      };
    });

    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 카테고리 조회
const findOneCategory = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getOneCategory } = strapi.services.category;
  const id = ctx.params.id;

  try {
    const category = await getOneCategory(id);
    if (!category) throw Error("CATEGORY_NOT_FOUND");

    const data = {
      id: category.id,
      name: category.name,
      description: category.description,
      created_at: category.created_at,
    };

    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { findCategory, findOneCategory };
