
function buildMakeValue ({
  insertValueValidator,updateValueValidator
}){
  return function makeValue (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertValueValidator':
      isValid = insertValueValidator(data);
      break;

    case 'updateValueValidator':
      isValid = updateValueValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in Value entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get id (){return data.id;},
      get pair (){return data.pair;},
      get time (){return data.time;},
      get value (){return data.value;},
      get isDeleted (){return data.isDeleted;},
      get isActive (){return data.isActive;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakeValue;
