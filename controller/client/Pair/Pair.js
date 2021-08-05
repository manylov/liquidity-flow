const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makePairController ({
  PairService,makePair
})
{
  const addPair = async ({ data }) => {
    try {
      const originalData = data;

      const Pair = makePair(originalData,'insertPairValidator');
      let createdPair = await PairService.createDocument(Pair);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdPair
      );

    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const findAllPair = async ({ data }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        result = await PairService.countDocument(query);
        if (result) {
          result = { totalRecords: result };  
        } else {
          return message.recordNotFound(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            []
          );
        }
      } else { 
        if (data.options !== undefined) {
          options = { ...data.options };
        }
        /*
         * if(options.populate){
         *   delete options.populate;
         * }
         */
        if (data.query !== undefined){
          query = { ...data.query };
        }
        result = await PairService.getAllDocuments(query,options);
      }
           
      if (result.data){
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          result
        );
      } else {
        return message.badRequest(
          { 'Content-Type': 'application/json' },
          responseCode.badRequest,
          {}
        );
      }
            
    }
    catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const getPairById = async (id) =>{
    try {
      if (id){
        const Pair = await PairService.getSingleDocumentById(id);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          Pair
        );
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    }
    catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const getPairCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await PairService.countDocument(where);
      if (result){
        result = { totalRecords:result };
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          result
        );
                
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    }
    catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const getPairByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await PairService.getDocumentByAggregation(data);
        if (result){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            result
          );
        }
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    } catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      ); 
    }
  };
  const updatePair = async (data,id) =>{
    try {
      if (id && data){
        const Pair = makePair(data,'updatePairValidator');
        const filterData = removeEmpty(Pair);
        const query = { _id:id };
        let updatedPair = await PairService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedPair){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedPair
          );
        }
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const partialUpdatePair = async (data,id) => {
    try {
      if (id && data){
        const Pair = makePair(data,'updatePairValidator');
        const filterData = removeEmpty(Pair);
        const query = { _id:id };
        let updatedPair = await PairService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedPair){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedPair
          );
        }
        else {
          return message.badRequest(
            { 'Content-Type': 'application/json' },
            responseCode.badRequest,
            {}
          );
        }
      }
      else {
        return message.badRequest(
          { 'Content-Type': 'application/json' },
          responseCode.badRequest,
          {}
        );
      }
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const softDeletePair = async (id)=>{
    try {
      if (id){
        let updatedPair = await PairService.softDeleteDocument(id);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedPair
        );
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    } catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const bulkInsertPair = async ({ body }) => {
    try {
      let data = body.data;
      const PairEntities = body.data.map((item)=>makePair(item,'insertPairValidator'));
      const results = await PairService.bulkInsert(PairEntities);
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        results
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const bulkUpdatePair = async (data) => {
    try {
      if (data.filter && data.data){
        const Pair = makePair(data.data,'updatePairValidator');
        const filterData = removeEmpty(Pair);
        const updatedPairs = await PairService.bulkUpdate(data.filter,filterData);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedPairs
        );
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message);
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message);
    }
  };
  const deletePair = async (data,id) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedPair = await PairService.findOneAndDeleteDocument({ _id:id });
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          deletedPair
        );
                
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    } catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const removeEmpty = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
      else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
  };
  return Object.freeze({
    addPair,
    findAllPair,
    getPairById,
    getPairCount,
    getPairByAggregate,
    updatePair,
    partialUpdatePair,
    softDeletePair,
    bulkInsertPair,
    bulkUpdatePair,
    deletePair,
    removeEmpty,
  });
}

module.exports = makePairController;
