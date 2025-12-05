const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("enter details");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("enter character between 4 to 50");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }
};

const validateProfileEditData=(req)=>{
  const allowedEditField=["firstName","lastName","emailId"];

  const isEditAllowed=Object.keys(req.body).every(field=>allowedEditField.includes(field));
  return isEditAllowed;
}

module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
