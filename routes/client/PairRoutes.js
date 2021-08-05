const express = require('express');
const router = express.Router();
const PairController = require('../../controller/client/Pair');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');

router.post('/client/api/v1/Pair/create',auth(...[ 'createByUserInClientPlatform', 'createByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.addPair({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/Pair/list',auth(...[ 'getAllByUserInClientPlatform', 'getAllByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.findAllPair({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.get('/client/api/v1/Pair/:id',auth(...[ 'getByUserInClientPlatform', 'getByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.getPairById(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/Pair/count').post(auth(...[ 'getCountByUserInClientPlatform', 'getCountByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.getPairCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/Pair/aggregate').post(auth(...[
  'aggregateByUserInClientPlatform',
  'aggregateByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.getPairByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/Pair/update/:id',auth(...[ 'updateByUserInClientPlatform', 'updateByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.updatePair(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/Pair/partial-update/:id',auth(...[
  'partialUpdateByUserInClientPlatform',
  'partialUpdateByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.partialUpdatePair(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   
router.put('/client/api/v1/Pair/softDelete/:id',auth(...[
  'softDeleteByUserInClientPlatform',
  'softDeleteByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.softDeletePair(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.post('/client/api/v1/Pair/addBulk',auth(...[ 'addBulkByUserInClientPlatform', 'addBulkByAdminInClientPlatform' ]),(req,res,next)=>{
  PairController.bulkInsertPair({ body:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.put('/client/api/v1/Pair/updateBulk',auth(...[
  'updateBulkByUserInClientPlatform',
  'updateBulkByAdminInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.bulkUpdatePair(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
}); 
router.delete('/client/api/v1/Pair/delete/:id',auth(...[ 'deleteByUserInClientPlatform', 'deleteByAdminInClientPlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  PairController.deletePair(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

module.exports = router;