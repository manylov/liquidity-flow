const db = require('../../../config/db');
const PairModel = require('../../../model/Pair')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/PairValidation');
const insertPairValidator = require('../../../validation/genericValidator')(schemaKeys);
const updatePairValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makePair = require('../../../entity/Pair')({
  insertPairValidator,
  updatePairValidator
});
const PairService = require('../../../services/mongoDbService')({
  model:PairModel,
  makePair
});
const makePairController = require('./Pair');

const PairController = makePairController({
  PairService,
  makePair
});
module.exports = PairController;
