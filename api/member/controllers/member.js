"use strict";
const { errorHandler } = require("../services/error");
const {
  hashPassword,
  validateEmail,
  validatePassword,
  isEmail,
  checkPassword,
  getUserByEmail,
  createToken,
} = require("../services/member");

// 회원가입
const signUpUser = async (ctx) => {
  const { email, password, name } = ctx.request.body;

  try {
    if (!validateEmail(email)) throw Error("EMAIL_VALIDATION_ERROR");
    if (!validatePassword(password)) throw Error("PASSWORD_VALIDATION_ERROR");
    if (await isEmail(email)) throw Error("DUPLICATE_EMAIL");

    const hashedPassword = await hashPassword(password);

    await strapi.query("member").create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    return ctx.send({ message: "SUCCESS" }, 201);
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

// 로그인
const signInUser = async (ctx) => {
  const { email, password } = ctx.request.body;

  try {
    if (!(await isEmail(email))) throw Error("INVALID_EMAIL");
    const user = await getUserByEmail(email);
    if (!(await checkPassword(password, user.password)))
      throw Error("INVALID_PASSWORD");

    const token = createToken(user.id);

    return ctx.send({ accessToken: token });
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { signUpUser, signInUser };
