import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Schema } from "yup";


export const adminSignupValidation=(req:Request,res:Response,next:NextFunction):void=>{

  const schema=Joi.object({

 
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
     password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      }),
       fullName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "First name is required",
    }),
     confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "string.empty": "Confirm Password is required",
        "any.only": "Passwords do not match",
      }),
       })
        const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    console.error("validation error details",error.details)
    res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
}

export const userValidation = (req: Request, res: Response, next: NextFunction): void => {
  
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "First name is required",
    }),
    lastName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
    phoneNumber: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.empty": "Phone number is required",
        "string.pattern.base": "Phone number must be a valid 10-digit number starting with 6-9",
      }),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "string.empty": "Confirm Password is required",
        "any.only": "Passwords do not match",
      }),
       addressOne: Joi.string().max(100).optional().messages({
      "string.max": "Address Line 1 must be at most 100 characters",
    }),
    addressTwo: Joi.string().max(100).optional().messages({
      "string.max": "Address Line 2 must be at most 100 characters",
    }),
    city: Joi.string().max(50).optional().messages({
      "string.max": "City must be at most 50 characters",
    }),
    state: Joi.string().max(50).optional().messages({
      "string.max": "State must be at most 50 characters",
    }),
    zipCode: Joi.string()
      .pattern(/^\d{5}$/)
      .optional()
      .messages({
        "string.pattern.base": "Zip Code must be exactly 5 digits",
      }),
    socialSecurityNumber: Joi.string()
      .pattern(/^\d{9}$/)
      .optional()
      .messages({
        "string.pattern.base": "Social Security Number must be exactly 9 digits",
      }),
    dob: Joi.date()
      .less("now")
      .optional()
      .messages({
        "date.less": "Date of Birth cannot be in the future",
      }),
    gender: Joi.string()
      .valid("male", "female", "other")
      .optional()
      .messages({
        "any.only": "Gender must be Male, Female, or Other",
      }),
    martialStatus: Joi.string()
      .valid("single", "married", "divorced", "widowed")
      .optional()
      .messages({
        "any.only": "Invalid marital status",
      }),
    social: Joi.string().uri().optional().messages({
      "string.uri": "Social URL must be valid",
    }),
    kids: Joi.string()
      .pattern(/^\d+$/)
      .optional()
      .messages({
        "string.pattern.base": "Kids must be a numeric value",
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    console.error("validation error details",error.details)
    res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
};

export const loginValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
};

//validation for preferences page

export const validatePreferences = (req: Request, res: Response, next: NextFunction): void => {
 const schema = Joi.object({
  userId:Joi.number().required(),
    language: Joi.string().required(),
    breakfast: Joi.string()
      .pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        "string.pattern.base": "Breakfast time must be in HH:mm:ss format.",
      }),
    lunch: Joi.string()
      .pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        "string.pattern.base": "Lunch time must be in HH:mm:ss format.",
      }),
    dinner: Joi.string()
      .pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        "string.pattern.base": "Dinner time must be in HH:mm:ss format.",
      }),
    wakeTime: Joi.string()
      .pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        "string.pattern.base": "Wake time must be in HH:mm:ss format.",
      }),
    bedTime: Joi.string()
      .pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        "string.pattern.base": "Bed time must be in HH:mm:ss format.",
      }),
    weight: Joi.string().optional().allow(null, ""),
    height: Joi.string().required(),
    bloodGlucose: Joi.string().required(),
    cholesterol: Joi.string().required(),
    bloodPressure: Joi.string().required(),
    distance: Joi.string().required(),
    communicationType: Joi.array()
      .items(Joi.string().valid("system mails", "sms", "email"))
      .required()
      .messages({
        "array.includes": "Communication type must be 'system mails', 'sms', or 'email'.",
      }),
  });


  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
};

//validation for invite friend


export const inviteFriendValidation=(req:Request,res:Response,next:NextFunction):void=>{

const schema = Joi.object({

  receiverFullName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Receiver's full name must be a string.",
      "string.empty": "Receiver's full name cannot be empty.",
      "string.min": "Receiver's full name must be at least 3 characters.",
      "string.max": "Receiver's full name cannot exceed 100 characters.",
      "any.required": "Receiver's full name is required.",
    }),

  receiverEmail: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Receiver's email must be a string.",
      "string.email": "Receiver's email must be a valid email address.",
      "string.empty": "Receiver's email cannot be empty.",
      "any.required": "Receiver's email is required.",
    }),

  message: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      "string.base": "Message must be a string.",
      "string.empty": "Message cannot be empty.",
      "string.min": "Message must be at least 5 characters.",
      "string.max": "Message cannot exceed 255 characters.",
      "any.required": "Message is required.",
    }),

  status: Joi.string()
    .valid("pending", "accepted")
    .default("pending")
    .messages({
      "string.base": "Status must be a string.",
      "any.only": "Status must be either 'pending' or 'accepted'.",
    }),
});

const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
};


 export const wavevalidation = (req: Request, res: Response, next: NextFunction): void => {
  console.log("--------validation check started")
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must have at least 3 characters',
      'string.max': 'Name must have less than 100 characters',
      'any.required': 'Name is required',
    }),
    message: Joi.string().min(10).max(500).required().messages({
      'string.base': 'Message must be a string',
      'string.max': 'Message must have less than 500 characters',
      'any.required': 'Message is required',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  } else {
    next(); // Ensure that the request continues to the next middleware/controller
  }
};
