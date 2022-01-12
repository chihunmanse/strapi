"use strict";

const validateQuantity = (quantity) => {
  const result = Number.isInteger(quantity) && quantity >= 0 ? true : false;
  return result;
};

const getOneCartItem = async ({ userId, productId }) => {
  const item = await strapi
    .query("cart")
    .findOne({ member: userId, product: productId });

  return item;
};

const findOneCartItem = async (id) => {
  const item = await strapi.query("cart").findOne({ id });

  return item;
};

const calculateShipping = (totalPrice) => {
  const FREE_SHIPPING = 30000;
  const SHIPPING = 3000;
  const shippingPrice =
    totalPrice >= FREE_SHIPPING || totalPrice == 0 ? 0 : SHIPPING;

  return shippingPrice;
};

const getCart = async (userId) => {
  const items = await strapi
    .query("cart")
    .find({ member: userId }, ["product.category"]);

  return items;
};

const createCartItem = async ({ userId, productId, quantity }) => {
  const item = await strapi
    .query("cart")
    .create({ member: userId, product: productId, quantity: quantity });

  return item;
};

const deleteCartItem = async (id) => {
  const item = await strapi.query("cart").delete({
    id: id,
  });

  return item;
};

const updateCartItem = async ({ id, quantity }) => {
  const item = await strapi.query("cart").update({ id }, { quantity });

  return item;
};

module.exports = {
  validateQuantity,
  getOneCartItem,
  findOneCartItem,
  getCart,
  calculateShipping,
  createCartItem,
  deleteCartItem,
  updateCartItem,
};
