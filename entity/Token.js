
function buildMakeToken ({
  insertTokenValidator,updateTokenValidator
}){
  return function makeToken (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertTokenValidator':
      isValid = insertTokenValidator(data);
      break;

    case 'updateTokenValidator':
      isValid = updateTokenValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in Token entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get id (){return data.id;},
      get name (){return data.name;},
      get symbol (){return data.symbol;},
      get address (){return data.address;},
      get isDeleted (){return data.isDeleted;},
      get isActive (){return data.isActive;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakeToken;
