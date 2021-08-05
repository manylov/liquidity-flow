const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makeValueController ({
  ValueService,makeValue
})
{
  const addValue = async ({ data }) => {
    try {
      const originalData = data;

      const Value = makeValue(originalData,'insertValueValidator');
      let createdValue = await ValueService.createDocument(Value);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdValue
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
  const findAllValue = async ({ data }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        result = await ValueService.countDocument(query);
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
        result = await ValueService.getAllDocuments(query,options);
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
  const getValueById = async (id) =>{
    try {
      if (id){
        const Value = await ValueService.getSingleDocumentById(id);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          Value
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
  const getValueCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await ValueService.countDocument(where);
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
  const getValueByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await ValueService.getDocumentByAggregation(data);
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
  const updateValue = async (data,id) =>{
    try {
      if (id && data){
        const Value = makeValue(data,'updateValueValidator');
        const filterData = removeEmpty(Value);
        const query = { _id:id };
        let updatedValue = await ValueService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedValue){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedValue
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
  const partialUpdateValue = async (data,id) => {
    try {
      if (id && data){
        const Value = makeValue(data,'updateValueValidator');
        const filterData = removeEmpty(Value);
        const query = { _id:id };
        let updatedValue = await ValueService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedValue){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedValue
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
  const softDeleteValue = async (id)=>{
    try {
      if (id){
        let updatedValue = await ValueService.softDeleteDocument(id);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedValue
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
  const bulkInsertValue = async ({ body }) => {
    try {
      let data = body.data;
      const ValueEntities = body.data.map((item)=>makeValue(item,'insertValueValidator'));
      const results = await ValueService.bulkInsert(ValueEntities);
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
  const bulkUpdateValue = async (data) => {
    try {
      if (data.filter && data.data){
        const Value = makeValue(data.data,'updateValueValidator');
        const filterData = removeEmpty(Value);
        const updatedValues = await ValueService.bulkUpdate(data.filter,filterData);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedValues
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
  const deleteValue = async (data,id) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedValue = await ValueService.findOneAndDeleteDocument({ _id:id });
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          deletedValue
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
    addValue,
    findAllValue,
    getValueById,
    getValueCount,
    getValueByAggregate,
    updateValue,
    partialUpdateValue,
    softDeleteValue,
    bulkInsertValue,
    bulkUpdateValue,
    deleteValue,
    removeEmpty,
  });
}

module.exports = makeValueController;
