"use strict";

const validateQuantity = (quantity) =>
  Number.isInteger(quantity) && quantity >= 0 ? true : false;

const getCartItem = async ({ userId, productId }) =>
  await strapi.query("cart").findOne({ member: userId, product: productId });

const isCartItem = async (id) => {
  const item = await strapi.query("cart").findOne({ id });
  const result = item ? true : false;
  return result;
};

const getCartOwnerId = async (id) => {
  const item = await strapi.query("cart").findOne({ id });
  return item.member.id;
};

const calculateShipping = (totalPrice) => {
  const FREE_SHIPPING = 30000;
  const SHIPPING = 3000;
  const shippingPrice =
    totalPrice >= FREE_SHIPPING || totalPrice == 0 ? 0 : SHIPPING;

  return shippingPrice;
};

const getCart = async (userId) =>
  await strapi.query("cart").find({ member: userId }, ["product.category"]);

const createCartItem = async ({ userId, productId, quantity }) =>
  await strapi
    .query("cart")
    .create({ member: userId, product: productId, quantity: quantity });

const deleteCartItem = async (id) =>
  await strapi.query("cart").delete({ id: id });

const updateCartItem = async ({ id, quantity }) =>
  await strapi.query("cart").update({ id }, { quantity });

module.exports = {
  validateQuantity,
  getCartItem,
  isCartItem,
  getCartOwnerId,
  getCart,
  calculateShipping,
  createCartItem,
  deleteCartItem,
  updateCartItem,
};
