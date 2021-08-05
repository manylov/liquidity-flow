const joi = require('joi');
exports.schemaKeys = joi.object({
  name: joi.string(),
  address: joi.string(),
  id: joi.string(),
  token1: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  token2: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  isActive: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  name: joi.string(),
  address: joi.string(),
  id: joi.string(),
  token1: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  token2: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  isActive: joi.boolean()
}).unknown(true);
