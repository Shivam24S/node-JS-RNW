import Joi from "joi";

const leaveValidation = Joi.object({
  startDate: Joi.date().greater("now").required().messages({
    "date.base": "startDate must be valid date",
    "date.greater": "start date must be future date",
  }),

  endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "date.base": "end date must be valid date",
    "date.greater": "end date must be after start date",
  }),

  leaveTypes: Joi.string()
    .valid("sick", "casual", "privilege")
    .required()
    .messages({
      "string.empty": "leave types required",
      "any.only": "leave types must be sick or casual or privilege leave",
    }),
  reason: Joi.string().min(2).max(500).required().messages({
    "string.empty": "reason is required",
    "string.min": "reason must be 2 character long",
    "string.max": "reason character can't be exceed more than 500 character",
  }),
});

const updateLeave = Joi.object({
  status: Joi.string().valid("approved", "rejected").required().messages({
    "string.empty": "status required",
    "any.only": "status can be only approved or rejected",
  }),
  rejectMessage: Joi.string().when("status", {
    is: "rejected",
    then: Joi.required().messages({
      "any.required": "rejectMessage is required when status is rejected",
      "string.empty": "rejectMessage cannot be empty",
    }),
    otherwise: Joi.optional(),
  }),
});

export default { leaveValidation, updateLeave };
