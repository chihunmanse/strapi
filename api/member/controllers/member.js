"use strict";

// 회원가입
const signUpUser = async (ctx) => {
  const { errorHandler } = require("../services/error");
  const { email, password, name } = ctx.request.body;
  const { hashPassword, checkEmail, validateEmail, validatePassword } =
    strapi.services.member;

  try {
    if (!validateEmail(email)) throw Error("EMAIL_VALIDATION_ERROR");
    if (!validatePassword(password)) throw Error("PASSWORD_VALIDATION_ERROR");
    if (await checkEmail(email)) throw Error("DUPLICATE_EMAIL");

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
  const { errorHandler } = require("../services/error");
  const { email, password } = ctx.request.body;
  const { checkEmail, checkPassword, createToken } = strapi.services.member;

  try {
    const user = await checkEmail(email);
    if (!user) throw Error("INVALID_EMAIL");
    if (!(await checkPassword(user, password))) throw Error("INVALID_PASSWORD");

    const token = createToken(user.id);

    return ctx.send({ accessToken: token });
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};

module.exports = { signUpUser, signInUser };
