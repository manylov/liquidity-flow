const joi = require('joi');
exports.schemaKeys = joi.object({
  id: joi.string(),
  pair: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  time: joi.date(),
  value: joi.number().integer(),
  isActive: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  id: joi.string(),
  pair: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  time: joi.date(),
  value: joi.number().integer(),
  isActive: joi.boolean()
}).unknown(true);
