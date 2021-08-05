const express = require('express');
const router = express.Router();
const TokenController = require('../../controller/admin/Token');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');

router.post('/admin/Token/create',auth(...[ 'createByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.addToken({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/admin/Token/list',auth(...[ 'getAllByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.findAllToken({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.get('/admin/Token/:id',auth(...[ 'getByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.getTokenById(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/admin/Token/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.getTokenCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/admin/Token/aggregate').post(auth(...[ 'aggregateByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.getTokenByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/admin/Token/update/:id',auth(...[ 'updateByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.updateToken(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/admin/Token/partial-update/:id',auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.partialUpdateToken(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/admin/Token/softDelete/:id',auth(...[ 'softDeleteByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.softDeleteToken(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/admin/Token/addBulk',auth(...[ 'addBulkByAdminInAdminPlatform' ]),(req,res,next)=>{
  TokenController.bulkInsertToken({ body:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/admin/Token/updateBulk',auth(...[ 'updateBulkByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.bulkUpdateToken(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
}); 
router.delete('/admin/Token/delete/:id',auth(...[ 'deleteByAdminInAdminPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  TokenController.deleteToken(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

module.exports = router;