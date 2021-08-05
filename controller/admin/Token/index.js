const db = require('../../../config/db');
const TokenModel = require('../../../model/Token')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/TokenValidation');
const insertTokenValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateTokenValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeToken = require('../../../entity/Token')({
  insertTokenValidator,
  updateTokenValidator
});
const TokenService = require('../../../services/mongoDbService')({
  model:TokenModel,
  makeToken
});
const makeTokenController = require('./Token');

const TokenController = makeTokenController({
  TokenService,
  makeToken
});
module.exports = TokenController;
