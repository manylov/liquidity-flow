const joi = require('joi');
const { USER_ROLE } = require('../constants/authConstant');
const { convertObjectToEnum } = require('../utils/common');   
exports.schemaKeys = joi.object({
  username: joi.string(),
  password: joi.string(),
  email: joi.string(),
  name: joi.string(),
  role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date()
  }),
  isActive: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  username: joi.string(),
  password: joi.string(),
  email: joi.string(),
  name: joi.string(),
  role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date()
  }),
  isActive: joi.boolean()
}).unknown(true);
