const response = ({ code, message }, result) => {
  return {
    code: code,
    message: message,
    result: result,
  };
};

const errResponse = ({ code, message }) => {
  return {
    code: code,
    message: message,
  };
};

module.exports = { response, errResponse };
