"use strict";

// 로그인 유저 - 장바구니 추가
const addCart = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getOneProduct } = strapi.services.product;
  const { validateQuantity, getOneCartItem, createCartItem, updateCartItem } =
    strapi.services.cart;
  const { productId, quantity } = ctx.request.body;
  const user = ctx.request.user;

  try {
    if (!validateQuantity(quantity)) throw Error("QUANTITY_VALIDATION_ERROR");
    const product = await getOneProduct(productId);
    const item = await getOneCartItem({
      userId: user.id,
      productId: product.id,
    });

    if (!item) {
      await createCartItem({
        userId: user.id,
        productId: product.id,
        quantity,
      });
      return ctx.send({ message: "SUCCESS" }, 201);
    }

    const newQuantity = quantity + item.quantity;

    await updateCartItem({
      id: item.id,
      quantity: newQuantity,
    });

    return ctx.send({ message: "SUCCESS" }, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인 유저 - 장바구니 조회
const findCart = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { getCart } = strapi.services.cart;
  const user = ctx.request.user;

  try {
    const cart = await getCart(user.id);

    return ctx.send(cart, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인 유저 - 장바구니 삭제
const deleteCart = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { findOneCartItem, deleteCartItem } = strapi.services.cart;
  const id = ctx.params.id;
  const user = ctx.request.user;

  try {
    const item = await findOneCartItem(id);

    if (!item) throw Error("CART_NOT_FOUND");
    if (item.member.id != user.id) throw Error("INVALID_CART_ID");

    const result = await deleteCartItem(id);

    return ctx.send({ message: result }, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인 유저 - 장바구니 수정
const updateCart = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { validateQuantity, findOneCartItem, updateCartItem } =
    strapi.services.cart;
  const id = ctx.params.id;
  const { quantity } = ctx.request.body;
  const user = ctx.request.user;

  try {
    if (!validateQuantity(quantity)) throw Error("QUANTITY_VALIDATION_ERROR");
    const item = await findOneCartItem(id);

    if (!item) throw Error("CART_NOT_FOUND");
    if (item.member.id != user.id) throw Error("INVALID_CART_ID");

    await updateCartItem({ id, quantity });

    return ctx.send({ message: "SUCCESS" }, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { addCart, findCart, deleteCart, updateCart };
