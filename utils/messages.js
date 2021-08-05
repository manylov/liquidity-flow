const messages = (module.exports = {});
messages.successResponse = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'SUCCESS',
    MESSAGE: 'Your request is successfully executed',
    DATA: data,
  },
});
messages.failureResponse = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'FAILURE',
    MESSAGE: 'Internal Server Error',
    DATA: data,
  },
});
messages.badRequest = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'BAD_REQUEST',
    MESSAGE: 'The request cannot be fulfilled due to bad syntax',
    DATA: data,
  },
});

messages.isDuplicate = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'VALIDATION_ERROR',
    MESSAGE: 'Data duplication Found',
    DATA: data,
  },
});
messages.recordNotFound = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'RECORD_NOT_FOUND',
    MESSAGE: 'Record not found with specified criteria.',
    DATA: data,
  },
});
messages.insufficientParameters = (headers, statusCode) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'BAD_REQUEST',
    MESSAGE: 'Insufficient parameters',
    DATA: {},
  },
});

messages.mongoError = (headers, statusCode, error) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'FAILURE',
    MESSAGE: 'Mongo db related error',
    DATA: error,
  },
});
messages.inValidParam = (headers, statusCode, error) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'VALIDATION_ERROR',
    MESSAGE: 'Invalid values in parameters',
    DATA: error,
  },
});

messages.unAuthorizedRequest = (headers, statusCode, error) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'UNAUTHORIZED',
    MESSAGE: 'You are not authorized to access the request',
    ERROR: error,
  },
});

messages.loginSuccess = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'SUCCESS',
    MESSAGE: 'Login Successfull',
    DATA: data,
  },
});
messages.passwordEmailWrong = (headers, statusCode) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'BAD_REQUEST',
    MESSAGE: 'username or password is wrong',
    DATA: {},
  },
});
messages.loginFailed = (headers, statusCode, error) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'BAD_REQUEST',
    MESSAGE: 'Login Failed',
    DATA: error,
  },
});
messages.failedSoftDelete = (headers, statusCode) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'FAILURE',
    MESSAGE: 'Data can not be soft deleted due to internal server error',
    DATA: {},
  },
});
messages.changePasswordFailure = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'FAILURE',
    MESSAGE: `Password cannot be changed due to ${data}`,
    DATA: {},
  },
});
messages.changePasswordSuccess = (headers, statusCode, data) => ({
  headers,
  statusCode,
  data: {
    STATUS: 'SUCCESS',
    MESSAGE: data,
    DATA: {},
  },
});
