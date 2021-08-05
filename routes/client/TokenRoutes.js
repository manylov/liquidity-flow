const express = require('express');
const router = express.Router();
const TokenController = require('../../controller/client/Token');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');

router.post('/client/api/v1/Token/create',auth(...[ 'createByUserInClientPlatform', 'createByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.addToken({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/Token/list',auth(...[ 'getAllByUserInClientPlatform', 'getAllByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.findAllToken({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.get('/client/api/v1/Token/:id',auth(...[ 'getByUserInClientPlatform', 'getByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.getTokenById(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/Token/count').post(auth(...[ 'getCountByUserInClientPlatform', 'getCountByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.getTokenCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/Token/aggregate').post(auth(...[
  'aggregateByUserInClientPlatform',
  'aggregateByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.getTokenByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/Token/update/:id',auth(...[ 'updateByUserInClientPlatform', 'updateByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.updateToken(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/Token/partial-update/:id',auth(...[
  'partialUpdateByUserInClientPlatform',
  'partialUpdateByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.partialUpdateToken(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/Token/softDelete/:id',auth(...[
  'softDeleteByUserInClientPlatform',
  'softDeleteByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.softDeleteToken(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/Token/addBulk',auth(...[ 'addBulkByUserInClientPlatform', 'addBulkByAdminInClientPlatform' ]),(req,res,next)=>{
  TokenController.bulkInsertToken({ body:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/Token/updateBulk',auth(...[
  'updateBulkByUserInClientPlatform',
  'updateBulkByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.bulkUpdateToken(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
}); 
router.delete('/client/api/v1/Token/delete/:id',auth(...[ 'deleteByUserInClientPlatform', 'deleteByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.deleteToken(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

module.exports = router;