const db = require('../config/db');
let User = require('../model/user')(db);
let Role = require('../model/role')(db);
let ProjectRoute = require('../model/projectRoute')(db);
let RouteRole = require('../model/routeRole')(db);
let UserRole = require('../model/userRole')(db);

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter9054 = { 'userId': { '$in': user } };
      const userRole5530 = await deleteUserRole(userRoleFilter9054);
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
      const routeRoleFilter0702 = { 'roleId': { '$in': role } };
      const routeRole8586 = await deleteRouteRole(routeRoleFilter0702);
      const userRoleFilter2122 = { 'roleId': { '$in': role } };
      const userRole9454 = await deleteUserRole(userRoleFilter2122);
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
      const routeRoleFilter7201 = { 'routeId': { '$in': projectRoute } };
      const routeRole0560 = await deleteRouteRole(routeRoleFilter7201);
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

const countUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter5671 = { 'userId': { '$in': user } };
      const userRole1270Cnt = await countUserRole(userRoleFilter5671);
      const userCnt =  await User.countDocuments(filter);
      let response = { user : userCnt  };
      response = {
        ...response,
        ...userRole1270Cnt,
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
      const routeRoleFilter2248 = { 'roleId': { '$in': role } };
      const routeRole8758Cnt = await countRouteRole(routeRoleFilter2248);
      const userRoleFilter8965 = { 'roleId': { '$in': role } };
      const userRole4435Cnt = await countUserRole(userRoleFilter8965);
      const roleCnt =  await Role.countDocuments(filter);
      let response = { role : roleCnt  };
      response = {
        ...response,
        ...routeRole8758Cnt,
        ...userRole4435Cnt,
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
      const routeRoleFilter6900 = { 'routeId': { '$in': projectRoute } };
      const routeRole6988Cnt = await countRouteRole(routeRoleFilter6900);
      const projectRouteCnt =  await ProjectRoute.countDocuments(filter);
      let response = { projectRoute : projectRouteCnt  };
      response = {
        ...response,
        ...routeRole6988Cnt,
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

const softDeleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter8621 = { 'userId': { '$in': user } };
      const userRole0610 = await softDeleteUserRole(userRoleFilter8621);
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
      const routeRoleFilter7898 = { 'roleId': { '$in': role } };
      const routeRole2338 = await softDeleteRouteRole(routeRoleFilter7898);
      const userRoleFilter6153 = { 'roleId': { '$in': role } };
      const userRole8820 = await softDeleteUserRole(userRoleFilter6153);
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
      const routeRoleFilter0277 = { 'routeId': { '$in': projectRoute } };
      const routeRole9425 = await softDeleteRouteRole(routeRoleFilter0277);
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
  deleteUser,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
