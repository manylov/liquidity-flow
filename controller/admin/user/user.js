const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makeUserController ({
  userService,makeUser,authService
})
{
  const addUser = async ({ data }) => {
    try {
      const originalData = data;

      const user = makeUser(originalData,'insertUserValidator');
      let createdUser = await userService.createDocument(user);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdUser
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
  const findAllUser = async ({
    data, loggedInUser
  }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        if (loggedInUser){
          query = {
            ...query,
            ...{ '_id': { $ne: loggedInUser.id } } 
          };
        } else {
          return message.unAuthorizedRequest(
            { 'Content-Type': 'application/json' },
            responseStatusCode.unAuthorizedRequest,
            err
          );
        }
        result = await userService.countDocument(query);
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
        if (loggedInUser){
          query = {
            ...query,
            ...{ '_id': { $ne: loggedInUser.id } } 
          };
        }
        result = await userService.getAllDocuments(query,options);
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
  const getUserById = async (id) =>{
    try {
      if (id){
        const user = await userService.getSingleDocumentById(id);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          user
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
  const getUserCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await userService.countDocument(where);
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
  const getUserByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await userService.getDocumentByAggregation(data);
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
  const updateUser = async (data,id, loggedInUser) =>{
    try {
      if (id && data){
        const user = makeUser(data,'updateUserValidator');
        const filterData = removeEmpty(user);
        let query = {};
        if (loggedInUser){
          query = {
            '_id': {
              '$eq': id,
              '$ne': loggedInUser.id
            }
          };
        } else {
          return message.unAuthorizedRequest(
            { 'Content-Type': 'application/json' },
            responseStatusCode.unAuthorizedRequest,
            err
          );
        }
        let updatedUser = await userService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedUser){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedUser
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
  const partialUpdateUser = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        const user = makeUser(data,'updateUserValidator');
        const filterData = removeEmpty(user);
        let query = {};
        if (loggedInUser){
          query = {
            '_id': {
              '$eq': id,
              '$ne': loggedInUser.id
            }
          }; 
          let updatedUser = await userService.findOneAndUpdateDocument(query,filterData,{ new:true });
          if (updatedUser){
            return message.successResponse(
              { 'Content-Type': 'application/json' },
              responseCode.success,
              updatedUser
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
  const softDeleteUser = async (id) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      let pos = [ {
        model: 'userRole',
        refId: 'userId' 
      } ];
      await userService.softDeleteDocument(id);
      let result = await deleteDependentService.softDeleteUser({ _id: id });
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        result);
            
    } catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };
  const bulkInsertUser = async ({ body }) => {
    try {
      let data = body.data;
      const userEntities = body.data.map((item)=>makeUser(item,'insertUserValidator'));
      const results = await userService.bulkInsert(userEntities);
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
  const bulkUpdateUser = async (data) => {
    try {
      if (data.filter && data.data){
        const user = makeUser(data.data,'updateUserValidator');
        const filterData = removeEmpty(user);
        const updatedUsers = await userService.bulkUpdate(data.filter,filterData);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedUsers
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
  const deleteUser = async (data,idloggedInUser) => {
    try {
      let possibleDependent = [ {
        model: 'userRole',
        refId: 'userId' 
      } ];
      const deleteDependentService = require('../../../utils/deleteDependent');
      let query = {};
      if (loggedInUser){
        query = {
          '_id': {
            '$eq': id,
            '$ne': loggedInUser.id
          }
        };
      } else {
        return message.unAuthorizedRequest(
          { 'Content-Type': 'application/json' },
          responseStatusCode.unAuthorizedRequest,
          err
        );
      }
      if (data.isWarning) {
        let all = await deleteDependentService.countUser(query);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          all
        );
      } else {
        let result = await deleteDependentService.deleteUser(query);
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

  const removeEmpty = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
      else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
  };
  const changePassword = async (params) => {
    try {
      if (!params.newPassword || !params.userId || !params.oldPassword) {
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          'Please Provide userId and new Password and Old password'
        );
      }
      let result = await authService.changePassword(params);
      if (result.flag) {
        return message.changePasswordFailure(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          result.data
        );
      }
      return message.changePasswordSuccess(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        result.data
      );
            
    } catch (error) {
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };  
    
  const updateProfile = async (data,id) =>{
    try {
      if (id && data){
        if (data.password) delete data.password;
        if (data.createdAt) delete data.createdAt;
        if (data.updatedAt) delete data.updatedAt;
        if (data.id) delete data.id;
        const user = makeUser(data,'updateUserValidator');
        const filterData = removeEmpty(user);
        let updatedUser = await userService.findOneAndUpdateDocument({ _id:id },filterData,{ new:true });
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedUser
        );
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

  return Object.freeze({
    addUser,
    findAllUser,
    getUserById,
    getUserCount,
    getUserByAggregate,
    updateUser,
    partialUpdateUser,
    softDeleteUser,
    bulkInsertUser,
    bulkUpdateUser,
    deleteUser,
    removeEmpty,
    changePassword,
    updateProfile,
  });
}

module.exports = makeUserController;
