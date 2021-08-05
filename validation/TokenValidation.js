const joi = require('joi');
exports.schemaKeys = joi.object({
  id: joi.string(),
  name: joi.string(),
  symbol: joi.string(),
  address: joi.string(),
  isActive: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  id: joi.string(),
  name: joi.string(),
  symbol: joi.string(),
  address: joi.string(),
  isActive: joi.boolean()
}).unknown(true);
