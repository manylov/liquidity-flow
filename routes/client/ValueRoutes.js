const express = require('express');
const router = express.Router();
const ValueController = require('../../controller/client/Value');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');

router.post('/client/api/v1/Value/create',auth(...[ 'createByUserInClientPlatform', 'createByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.addValue({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/Value/list',auth(...[ 'getAllByUserInClientPlatform', 'getAllByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.findAllValue({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.get('/client/api/v1/Value/:id',auth(...[ 'getByUserInClientPlatform', 'getByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.getValueById(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/Value/count').post(auth(...[ 'getCountByUserInClientPlatform', 'getCountByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.getValueCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/Value/aggregate').post(auth(...[
  'aggregateByUserInClientPlatform',
  'aggregateByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.getValueByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/Value/update/:id',auth(...[ 'updateByUserInClientPlatform', 'updateByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.updateValue(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/Value/partial-update/:id',auth(...[
  'partialUpdateByUserInClientPlatform',
  'partialUpdateByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.partialUpdateValue(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/Value/softDelete/:id',auth(...[
  'softDeleteByUserInClientPlatform',
  'softDeleteByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.softDeleteValue(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/Value/addBulk',auth(...[ 'addBulkByUserInClientPlatform', 'addBulkByAdminInClientPlatform' ]),(req,res,next)=>{
  ValueController.bulkInsertValue({ body:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/Value/updateBulk',auth(...[
  'updateBulkByUserInClientPlatform',
  'updateBulkByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.bulkUpdateValue(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
}); 
router.delete('/client/api/v1/Value/delete/:id',auth(...[ 'deleteByUserInClientPlatform', 'deleteByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  ValueController.deleteValue(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

module.exports = router;