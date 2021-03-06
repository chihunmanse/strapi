"use strict";
const { errorHandler } = require("../services/error");
const {
  validateQuantity,
  getCartItem,
  createCartItem,
  updateCartItem,
  getCart,
  generateCartData,
  isCartItem,
  getCartOwnerId,
  deleteCartItem,
} = require("../services/cart");
const { isProductId } = require("../../product/services/product");

// 로그인 유저 - 장바구니 추가
const addCart = async (ctx) => {
  const { productId, quantity } = ctx.request.body;
  const user = ctx.request.user;

  try {
    if (!validateQuantity(quantity)) throw Error("QUANTITY_VALIDATION_ERROR");
    if (!(await isProductId(productId))) throw Error("PRODUCT_NOT_FOUND");

    const item = await getCartItem({
      userId: user.id,
      productId: productId,
    });

    if (!item) {
      await createCartItem({
        userId: user.id,
        productId: productId,
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
  const user = ctx.request.user;

  try {
    const items = await getCart(user.id);

    const cart = generateCartData(items);

    return ctx.send(cart, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인 유저 - 장바구니 삭제
const deleteCart = async (ctx) => {
  const id = ctx.params.id;
  const user = ctx.request.user;

  try {
    if (!(await isCartItem(id))) throw Error("CART_NOT_FOUND");

    const ownerId = await getCartOwnerId(id);
    if (ownerId != user.id) throw Error("INVALID_CART_ID");

    await deleteCartItem(id);

    return ctx.send({ message: "DELETE" }, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인 유저 - 장바구니 수정
const updateCart = async (ctx) => {
  const id = ctx.params.id;
  const { quantity } = ctx.request.body;
  const user = ctx.request.user;

  try {
    if (!validateQuantity(quantity)) throw Error("QUANTITY_VALIDATION_ERROR");
    if (!(await isCartItem(id))) throw Error("CART_NOT_FOUND");

    const ownerId = await getCartOwnerId(id);
    if (ownerId != user.id) throw Error("INVALID_CART_ID");

    await updateCartItem({ id, quantity });

    return ctx.send({ message: "SUCCESS" }, 200);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { addCart, findCart, deleteCart, updateCart };
