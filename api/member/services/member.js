"use strict";

// 비밀번호 암호화
const hashPassword = async (password) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// 이메일 확인
const isEmail = async (email) => {
  const user = await strapi.query("member").findOne({ email: email });
  const result = user ? true : false;
  return result;
};

// 이메일로 유저 구하기
const getUserByEmail = async (email) =>
  await strapi.query("member").findOne({ email: email });

// 유저 확인
const isUserId = async (id) => {
  const user = await strapi.query("member").findOne({ id: id });
  const result = user ? true : false;
  return result;
};

// id로 유저 구하기
const getUserById = async (id) =>
  await strapi.query("member").findOne({ id: id });

// 비밀번호 확인
const checkPassword = async (inputPassword, userPassword) => {
  const bcrypt = require("bcrypt");
  const checked = await bcrypt.compare(inputPassword, userPassword);
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
  const { JWT_SECRET, ALGORITHM, EXPIRES_IN } = process.env;

  const accessToken = jwt.sign({ userId: id }, JWT_SECRET, {
    algorithm: ALGORITHM,
    expiresIn: EXPIRES_IN,
  });
  return accessToken;
};

module.exports = {
  hashPassword,
  isEmail,
  getUserByEmail,
  isUserId,
  getUserById,
  checkPassword,
  validateEmail,
  validatePassword,
  createToken,
};
