import Joi from "joi";

const registerUser = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "name is required",
    "string.min": "name must be at least two character",
    "string.max": "name can't be exceed more than 50 character",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    "string.email": "invalid email format",
  }),
  password: Joi.string().min(6).max(10).required().messages({
    "string.empty": "password is required",
    "string.min": "password must be at least 6 character",
    "string.max": "password can not contain more than 10 character",
  }),
  role: Joi.string().valid("employee", "manager", "admin").required().messages({
    "any.only": "role must be employee or manager or admin is required",
    "string.empty": "role is required",
  }),
  department: Joi.string()
    .valid("sales", "it", "finance", "marketing", "manufacturing")
    .required()
    .messages({
      "any.only":
        "department must be sales or it or finance or marketing or manufacturing is required",
      "string.empty": "department is required",
    }),
});

const updateUser = registerUser.fork(
  Object.keys(registerUser.describe().keys),
  (schema) => schema.optional()
);

export default { registerUser, updateUser };
