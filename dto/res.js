function successResponse(data = null, message = 'Success', meta = null) {
    const response = {
      success: true,
      message,
      data
    };
  
    if (meta) {
      response.meta = meta;
    }
  
    return response;
  }
  
  function errorResponse(message = 'Error', error = null) {
    return {
      success: false,
      message,
      error
    };
  }
  
  module.exports = {
    successResponse,
    errorResponse
  };
  