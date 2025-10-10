import Joi from "joi";

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    "string.email": "invalid email format",
  }),
  password: Joi.string().min(6).max(10).required().messages({
    "string.empty": "password is required",
    "string.min": "password at least must contain 6 character",
    "string.max": "password can't exceed more than 10 character",
  }),
});

export default loginValidation;
