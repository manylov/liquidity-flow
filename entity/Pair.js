
function buildMakePair ({
  insertPairValidator,updatePairValidator
}){
  return function makePair (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertPairValidator':
      isValid = insertPairValidator(data);
      break;

    case 'updatePairValidator':
      isValid = updatePairValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in Pair entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get name (){return data.name;},
      get address (){return data.address;},
      get id (){return data.id;},
      get token1 (){return data.token1;},
      get token2 (){return data.token2;},
      get isDeleted (){return data.isDeleted;},
      get isActive (){return data.isActive;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakePair;
