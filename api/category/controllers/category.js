"use strict";
const { errorHandler } = require("../services/error");
const {
  getCategories,
  getOneCategory,
  isCategoryId,
} = require("../services/category");

// 카테고리 목록
const findCategory = async (ctx) => {
  try {
    const categories = await getCategories();

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
  const id = ctx.params.id;

  try {
    if (!(await isCategoryId(id))) throw Error("CATEGORY_NOT_FOUND");
    const category = await getOneCategory(id);

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
