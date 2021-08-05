const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makeTokenController ({
  TokenService,makeToken
})
{
  const addToken = async ({ data }) => {
    try {
      const originalData = data;

      const Token = makeToken(originalData,'insertTokenValidator');
      let createdToken = await TokenService.createDocument(Token);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdToken
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
  const findAllToken = async ({ data }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        result = await TokenService.countDocument(query);
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
        result = await TokenService.getAllDocuments(query,options);
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
  const getTokenById = async (id) =>{
    try {
      if (id){
        const Token = await TokenService.getSingleDocumentById(id);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          Token
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
  const getTokenCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await TokenService.countDocument(where);
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
  const getTokenByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await TokenService.getDocumentByAggregation(data);
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
  const updateToken = async (data,id) =>{
    try {
      if (id && data){
        const Token = makeToken(data,'updateTokenValidator');
        const filterData = removeEmpty(Token);
        const query = { _id:id };
        let updatedToken = await TokenService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedToken){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedToken
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
  const partialUpdateToken = async (data,id) => {
    try {
      if (id && data){
        const Token = makeToken(data,'updateTokenValidator');
        const filterData = removeEmpty(Token);
        const query = { _id:id };
        let updatedToken = await TokenService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedToken){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedToken
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
  const softDeleteToken = async (id)=>{
    try {
      if (id){
        let updatedToken = await TokenService.softDeleteDocument(id);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedToken
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
  const bulkInsertToken = async ({ body }) => {
    try {
      let data = body.data;
      const TokenEntities = body.data.map((item)=>makeToken(item,'insertTokenValidator'));
      const results = await TokenService.bulkInsert(TokenEntities);
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
  const bulkUpdateToken = async (data) => {
    try {
      if (data.filter && data.data){
        const Token = makeToken(data.data,'updateTokenValidator');
        const filterData = removeEmpty(Token);
        const updatedTokens = await TokenService.bulkUpdate(data.filter,filterData);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedTokens
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
  const deleteToken = async (data,id) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedToken = await TokenService.findOneAndDeleteDocument({ _id:id });
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          deletedToken
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
    addToken,
    findAllToken,
    getTokenById,
    getTokenCount,
    getTokenByAggregate,
    updateToken,
    partialUpdateToken,
    softDeleteToken,
    bulkInsertToken,
    bulkUpdateToken,
    deleteToken,
    removeEmpty,
  });
}

module.exports = makeTokenController;
