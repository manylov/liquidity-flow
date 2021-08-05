
function buildMakeUser ({
  insertUserValidator,updateUserValidator
}){
  return function makeUser (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertUserValidator':
      isValid = insertUserValidator(data);
      break;

    case 'updateUserValidator':
      isValid = updateUserValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in User entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get username (){return data.username;},
      get password (){return data.password;},
      get email (){return data.email;},
      get name (){return data.name;},
      get isDeleted (){return data.isDeleted;},
      get isActive (){return data.isActive;},
      get role (){return data.role;},
      get resetPasswordLink (){return data.resetPasswordLink;},
      get loginRetryLimit (){return data.loginRetryLimit;},
      get loginReactiveTime (){return data.loginReactiveTime;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakeUser;
