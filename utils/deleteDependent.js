const db = require('../config/db');
let Value = require('../model/Value')(db);
let Pair = require('../model/Pair')(db);
let Token = require('../model/Token')(db);
let User = require('../model/user')(db);
let Role = require('../model/role')(db);
let ProjectRoute = require('../model/projectRoute')(db);
let RouteRole = require('../model/routeRole')(db);
let UserRole = require('../model/userRole')(db);

const deleteValue = async (filter) =>{
  try {
    return await Value.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePair = async (filter) =>{
  try {
    let Pair = await Pair.find(filter, { _id:1 });
    if (Pair){
      Pair = Pair.map((obj) => obj._id);
      const ValueFilter0854 = { 'pair': { '$in': Pair } };
      const Value3487 = await deleteValue(ValueFilter0854);
      return await Pair.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteToken = async (filter) =>{
  try {
    let Token = await Token.find(filter, { _id:1 });
    if (Token){
      Token = Token.map((obj) => obj._id);
      const PairFilter6339 = { 'token1': { '$in': Token } };
      const Pair0236 = await deletePair(PairFilter6339);
      const PairFilter9286 = { 'token2': { '$in': Token } };
      const Pair4145 = await deletePair(PairFilter9286);
      return await Token.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter4941 = { 'userId': { '$in': user } };
      const userRole0414 = await deleteUserRole(userRoleFilter4941);
      return await User.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9784 = { 'roleId': { '$in': role } };
      const routeRole2282 = await deleteRouteRole(routeRoleFilter9784);
      const userRoleFilter6778 = { 'roleId': { '$in': role } };
      const userRole7446 = await deleteUserRole(userRoleFilter6778);
      return await Role.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter2421 = { 'routeId': { '$in': projectRoute } };
      const routeRole7913 = await deleteRouteRole(routeRoleFilter2421);
      return await ProjectRoute.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countValue = async (filter) =>{
  try {
    const ValueCnt =  await Value.countDocuments(filter);
    return { Value : ValueCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPair = async (filter) =>{
  try {
    let Pair = await Pair.find(filter, { _id:1 });
    if (Pair){
      Pair = Pair.map((obj) => obj._id);
      const ValueFilter9455 = { 'pair': { '$in': Pair } };
      const Value5653Cnt = await countValue(ValueFilter9455);
      const PairCnt =  await Pair.countDocuments(filter);
      let response = { Pair : PairCnt  };
      response = {
        ...response,
        ...Value5653Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countToken = async (filter) =>{
  try {
    let Token = await Token.find(filter, { _id:1 });
    if (Token){
      Token = Token.map((obj) => obj._id);
      const PairFilter1387 = { 'token1': { '$in': Token } };
      const Pair5668Cnt = await countPair(PairFilter1387);
      const PairFilter6245 = { 'token2': { '$in': Token } };
      const Pair7313Cnt = await countPair(PairFilter6245);
      const TokenCnt =  await Token.countDocuments(filter);
      let response = { Token : TokenCnt  };
      response = {
        ...response,
        ...Pair5668Cnt,
        ...Pair7313Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter5671 = { 'userId': { '$in': user } };
      const userRole7977Cnt = await countUserRole(userRoleFilter5671);
      const userCnt =  await User.countDocuments(filter);
      let response = { user : userCnt  };
      response = {
        ...response,
        ...userRole7977Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role){
      role = role.map((obj) => obj._id);
      const routeRoleFilter7336 = { 'roleId': { '$in': role } };
      const routeRole4553Cnt = await countRouteRole(routeRoleFilter7336);
      const userRoleFilter4004 = { 'roleId': { '$in': role } };
      const userRole1694Cnt = await countUserRole(userRoleFilter4004);
      const roleCnt =  await Role.countDocuments(filter);
      let response = { role : roleCnt  };
      response = {
        ...response,
        ...routeRole4553Cnt,
        ...userRole1694Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter7875 = { 'routeId': { '$in': projectRoute } };
      const routeRole5488Cnt = await countRouteRole(routeRoleFilter7875);
      const projectRouteCnt =  await ProjectRoute.countDocuments(filter);
      let response = { projectRoute : projectRouteCnt  };
      response = {
        ...response,
        ...routeRole5488Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteValue = async (filter) =>{
  try {
    return await Value.updateMany(filter, { isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePair = async (filter) =>{
  try {
    let Pair = await Pair.find(filter, { _id:1 });
    if (Pair){
      Pair = Pair.map((obj) => obj._id);
      const ValueFilter4864 = { 'pair': { '$in': Pair } };
      const Value6356 = await softDeleteValue(ValueFilter4864);
      return await Pair.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteToken = async (filter) =>{
  try {
    let Token = await Token.find(filter, { _id:1 });
    if (Token){
      Token = Token.map((obj) => obj._id);
      const PairFilter1945 = { 'token1': { '$in': Token } };
      const Pair8883 = await softDeletePair(PairFilter1945);
      const PairFilter4293 = { 'token2': { '$in': Token } };
      const Pair5836 = await softDeletePair(PairFilter4293);
      return await Token.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter8834 = { 'userId': { '$in': user } };
      const userRole6447 = await softDeleteUserRole(userRoleFilter8834);
      return await User.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9067 = { 'roleId': { '$in': role } };
      const routeRole5443 = await softDeleteRouteRole(routeRoleFilter9067);
      const userRoleFilter5379 = { 'roleId': { '$in': role } };
      const userRole8645 = await softDeleteUserRole(userRoleFilter5379);
      return await Role.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter4655 = { 'routeId': { '$in': projectRoute } };
      const routeRole9195 = await softDeleteRouteRole(routeRoleFilter4655);
      return await ProjectRoute.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.updateMany(filter, { isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter) =>{
  try {
    return await UserRole.updateMany(filter, { isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteValue,
  deletePair,
  deleteToken,
  deleteUser,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countValue,
  countPair,
  countToken,
  countUser,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteValue,
  softDeletePair,
  softDeleteToken,
  softDeleteUser,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
