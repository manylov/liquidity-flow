const db = require('../../../config/db');
const ValueModel = require('../../../model/Value')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/ValueValidation');
const insertValueValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateValueValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeValue = require('../../../entity/Value')({
  insertValueValidator,
  updateValueValidator
});
const ValueService = require('../../../services/mongoDbService')({
  model:ValueModel,
  makeValue
});
const makeValueController = require('./Value');

const ValueController = makeValueController({
  ValueService,
  makeValue
});
module.exports = ValueController;
