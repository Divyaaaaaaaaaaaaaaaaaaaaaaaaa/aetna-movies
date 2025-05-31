export {};
const ApiError = require('./movieError');

function badRequest(message, details) {
  throw new ApiError(400, message, details);
}

function success(res, data, meta) {
  const response: any = { success: true, data };
  if (meta) response.meta = meta;
  return res.json(response);
}

module.exports = {
  success,
  badRequest,
};
