"use strict";

const errorHandlerV3 = (api, errorHandle, message) => {
  const error = errorHandle[message];
  if (!error) {
    return {
      statusCode: 400,
      id: `Out.of.control.error`,
      message,
      api,
    };
  }

  return error;
};

module.exports = { errorHandlerV3 };
