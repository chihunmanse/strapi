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

  const cart = items.reduce(
    (cart, item) => {
      cart.items.push({
        id: item.id,
        quantity: item.quantity,
        itemPrice: item.product.price * item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          thumbnail_image: item.product.thumbnail_image,
        },
        category: {
          id: item.product.category.id,
          name: item.product.category.name,
        },
        created_at: item.created_at,
      });
      cart.totalPrice += item.product.price * item.quantity;
      cart.totalQuantity += item.quantity;
      return cart;
    },
    { items: [], totalPrice: 0, totalQuantity: 0 }
  );

  const shipping = calculateShipping(cart.totalPrice);
  cart.shipping = shipping;
  cart.orderPrice = cart.totalPrice + shipping;

  return cart;
};

const createCartItem = async ({ userId, productId, quantity }) => {
  const item = await strapi
    .query("cart")
    .create({ member: userId, product: productId, quantity: quantity });

  return item;
};

const deleteCartItem = async (id) => {
  await strapi.query("cart").delete({
    id: id,
  });

  return "delete";
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
