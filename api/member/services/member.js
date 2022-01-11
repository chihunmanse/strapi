"use strict";

// 비밀번호 암호화
const hashPassword = async (password) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// 이메일 유저 확인
const checkEmail = async (email) => {
  const user = await strapi.query("member").findOne({ email: email });
  return user;
};

// id 유저 확인
const checkUserId = async (id) => {
  const user = await strapi.query("member").findOne({ id: id });
  return user;
};

// 비밀번호 확인
const checkPassword = async (user, password) => {
  const bcrypt = require("bcrypt");
  const checked = await bcrypt.compare(password, user.password);
  return checked;
};

// 이메일 유효성 검사
const validateEmail = (email) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
const validatePassword = (password) => {
  const passwordRegex =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 특수문자, 문자, 숫자 포함 형태의 8~15자리

  return passwordRegex.test(password);
};

// 토큰 생성
const createToken = (id) => {
  const jwt = require("jsonwebtoken");
  const jwtSecret = process.env.JWT_SECRET;
  const algorithm = process.env.ALGORITHM;
  const expiresIn = process.env.EXPIRES_IN;

  const accessToken = jwt.sign({ userId: id }, jwtSecret, {
    algorithm,
    expiresIn,
  });
  return accessToken;
};

module.exports = {
  hashPassword,
  checkEmail,
  checkPassword,
  validateEmail,
  validatePassword,
  createToken,
  checkUserId,
};
