"use strict";
const { errorHandler } = require("../services/error");
const {
  getCategories,
  getOneCategory,
  isCategoryId,
  generateCategoriesData,
  generateCategoryData,
} = require("../services/category");

// 카테고리 목록
const findCategory = async (ctx) => {
  try {
    const categories = await getCategories();

    const data = generateCategoriesData(categories);

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

    const data = generateCategoryData(category);

    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { findCategory, findOneCategory };
