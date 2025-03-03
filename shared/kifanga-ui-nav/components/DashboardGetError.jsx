const DashboardGetError = (error) => {
  // Check if the response contains validation errors
  if (error.response && error.response.data.validation_errors) {
    // Return the validation errors object directly, which will be used in the form
    return error.response.data.validation_errors;
  }
  
  // If there's a general error message, return that
  return error.response && error.response.data.error
    ? error.response.data.error
    : error.message;
};

export default DashboardGetError;