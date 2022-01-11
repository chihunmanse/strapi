module.exports = async (ctx, next) => {
  const { errorHandler } = require("../../services/error");
  const { checkUserId } = strapi.services.member;
  const jwt = require("jsonwebtoken");
  const jwtSecret = process.env.JWT_SECRET;
  const { token } = ctx.request.headers;

  try {
    const { userId } = await jwt.verify(token, jwtSecret);
    const user = await checkUserId(userId);
    if (!user) throw Error;
    ctx.request.user = user;
    return next();
  } catch (error) {
    console.log(error);
    const errorInfo = errorHandler("UNAUTHORIZED");
    return ctx.send(errorInfo, errorInfo.statusCode);
  }
};
