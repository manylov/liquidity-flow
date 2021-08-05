const mongoose = require('mongoose');
const db = require('../config/db');
const UserRole = require('../model/userRole')(db);
const RouteRole = require('../model/routeRole')(db);
const ProjectRoute = require('../model/projectRoute')(db);
const { replaceAll } = require('../utils/common');
const sendResponse = require('../helpers/sendResponse');
const message = require('../utils/messages');
const responseStatusCode = require('../utils/responseCode');

const checkRolePermission = async (req, res, next) => {
  if (req.user) {
    const loggedInUserId = req.user.id;
    let rolesOfUser = await UserRole.find({
      userId: loggedInUserId,
      isActive: true,
      isDeleted: false,
    }, {
      roleId: 1,
      _id: 0,
    });
    if (rolesOfUser) {
      rolesOfUser = rolesOfUser.map((role) => mongoose.Types.ObjectId(role.roleId));
      const route = await ProjectRoute.findOne({
        route_name: replaceAll((req.originalUrl).substring(1), '/', '_'),
        uri: req.originalUrl,
      });
      if (route) {
        const allowedRoute = await RouteRole.find({
          routeId: route._id,
          roleId: { $in: rolesOfUser },
          isActive: true,
          isDeleted: false,
        });
        if (allowedRoute && allowedRoute.length) {
          next();
        } else {
          sendResponse(res, message.unAuthorizedRequest(
            { 'Content-Type': 'application/json' },
            responseStatusCode.unAuthorizedRequest,
            'You are not having permission to access this route!',
          ));
        }
      } else {
        next();
      }
    } else {
      sendResponse(res, message.unAuthorizedRequest(
        { 'Content-Type': 'application/json' },
        responseStatusCode.unAuthorizedRequest,
        'You are not having permission to access this route!',
      ));
    }
  } else {
    sendResponse(res, message.unAuthorizedRequest(
      { 'Content-Type': 'application/json' },
      responseStatusCode.unAuthorizedRequest,
      'You are not having permission to access this route!',
    ));
  }
  return undefined;
};

module.exports = checkRolePermission;
