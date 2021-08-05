const express = require('express');
const router = express.Router();
const userController = require('../../controller/client/user');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.post('/client/api/v1/user/create',auth(...[ 'createByUserInClientPlatform', 'createByAdminInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.addUser({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/user/list',auth(...[ 'getAllByUserInClientPlatform', 'getAllByAdminInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.findAllUser({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.get('/client/api/v1/user/:id',auth(...[ 'getByUserInClientPlatform', 'getByAdminInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserById(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/user/count').post(auth(...[ 'getCountByUserInClientPlatform', 'getCountByAdminInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/user/aggregate').post(auth(...[
  'aggregateByUserInClientPlatform',
  'aggregateByAdminInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/user/update/:id',auth(...[ 'updateByUserInClientPlatform', 'updateByAdminInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.updateUser(req.body,req.pathParams.id,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/user/partial-update/:id',auth(...[
  'partialUpdateByUserInClientPlatform',
  'partialUpdateByAdminInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.partialUpdateUser(req.body,req.pathParams.id,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/user/softDelete/:id',auth(...[
  'softDeleteByUserInClientPlatform',
  'softDeleteByAdminInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.softDeleteUser(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/user/addBulk',auth(...[ 'addBulkByUserInClientPlatform', 'addBulkByAdminInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  userController.bulkInsertUser({ body:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/user/updateBulk',auth(...[
  'updateBulkByUserInClientPlatform',
  'updateBulkByAdminInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.bulkUpdateUser(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
}); 
router.delete('/client/api/v1/user/delete/:id',auth(...[ 'deleteByUserInClientPlatform', 'deleteByAdminInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.deleteUser(req.body,req.pathParams.idreq.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.route('/client/api/v1/user/change-password').put(auth(...[
  'changePasswordByUserInClientPlatform',
  'changePasswordByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  let params = {
    ...req.body,
    userId:req.user.id
  };
  userController.changePassword(params).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/user/update-profile').put(auth(...[
  'updateProfileByUserInClientPlatform',
  'updateProfileByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  userController.updateProfile(req.body,req.user.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

module.exports = router;