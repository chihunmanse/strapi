"use strict";

const findAllCategory = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getAllCategory } = strapi.services.category;

  try {
    const data = await getAllCategory();
    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { findAllCategory };
