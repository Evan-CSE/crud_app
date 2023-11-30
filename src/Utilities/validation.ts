import Joi from "joi";
import { Order, userInterface } from "../Interfaces/UserInterface";
import { JoiValidationReturnType } from "../Interfaces/CommonInterface";

export const validateUserData = (userData: userInterface): Joi.ValidationResult<JoiValidationReturnType> => {
  const validator = Joi.object({
    userId: Joi.number().required().messages({
      'invalidUserId': 'Invalid userId provided. Must be a number.'
    }),
    username: Joi.string()
      .required()
      .min(4)
      .max(10)
      .messages({
        'invalidUsername': 'Invalid username provided. Must be alphanumeric with length 4-10.'
      }),
    password: Joi.string()
      .required()
      .min(6)
      .max(20)
      .messages({
        'invalidPassword': 'Password error. Must be alphanumeric and length must be between 6-20.'
      }),
    age: Joi.number().messages({
      'notANumber': 'Must be a number.'
    }),
    fullName: Joi.object({
      firstName: Joi.string()
        .required()
        .pattern(/^[a-zA-Z]+$/)
        .max(10)
        .min(3)
        .messages({
          'invalidFirstName': 'Must contain only letters and spaces, and length must be between 3-10.'
        }),
      lastName: Joi.string()
        .required()
        .pattern(/^[a-zA-Z]+$/)
        .max(10)
        .min(3)
        .messages({
          'invalidLastName': 'Must contain only letters and spaces, and length must be between 3-10.'
        }),
    }),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      })
      .messages({
        'invalidEmail': 'Currently, we only support .com and .net mail.'
      }),
    isActive: Joi.boolean().messages({
      'invalidIsActive': 'The "isActive" field must be either true or false.'
    }),
    hobbies: Joi.array()
      .required()
      .items(Joi.string().min(3).max(50))
      .max(10)
      .unique()
      .messages({
        'invalidHobbies': 'Array can be of string only with a maximum of 10 elements.'
      }),
    address: Joi.object({
      street: Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
          'invalidStreet': 'Street name is required and must be between 3 and 50 characters long.'
        }),
      city: Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
          'invalidCity': 'City name is required and must be between 3 and 50 characters long.'
        }),
      country: Joi.string()
        .min(3)
        .max(50)
        .regex(/israel/i, { invert: true })
        .messages({
          'invalidCountry': 'Invalid country name provided.".'
        }),
    }),
  });

  return validator.validate(userData);
};


export const validateUserDataOnUpdate = (userData: userInterface) : Joi.ValidationResult<JoiValidationReturnType> => {
  const validator = Joi.object({
    username: Joi.string()
      .min(4)
      .max(10)
      .messages({
        'invalidUsername': 'Invalid username provided. Must be alphanumeric with length 4-10.'
      }),
    password: Joi.string()
      .min(6)
      .max(20)
      .messages({
        'invalidPassword': 'Password error. Must be alphanumeric and length must be between 6-20.'
      }),
    age: Joi.number().messages({
      'notANumber': 'Must be a number.'
    }),
    fullName: Joi.object({
      firstName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .max(10)
        .min(3)
        .messages({
          'invalidFirstName': 'Must contain only letters and spaces, and length must be between 3-10.'
        }),
      lastName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .max(10)
        .min(3)
        .messages({
          'invalidLastName': 'Must contain only letters and spaces, and length must be between 3-10.'
        }),
    }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      })
      .messages({
        'invalidEmail': 'Currently, we only support .com and .net mail.'
      }),
    isActive: Joi.boolean().messages({
      'invalidIsActive': 'The "isActive" field must be either true or false.'
    }),
    hobbies: Joi.array()
      .items(Joi.string().min(3).max(50))
      .max(10)
      .unique()
      .messages({
        'invalidHobbies': 'Array can be of string only with a maximum of 10 elements.'
      }),
    address: Joi.object({
      street: Joi.string()
        .min(3)
        .max(50)
        .messages({
          'invalidStreet': 'Street name is required and must be between 3 and 50 characters long.'
        }),
      city: Joi.string()
        .min(3)
        .max(50)
        .messages({
          'invalidCity': 'City name is required and must be between 3 and 50 characters long.'
        }),
      country: Joi.string()
        .min(3)
        .max(50)
        .regex(/israel/i, { invert: true })
        .messages({
          'invalidCountry': 'Invalid country name provided.".'
        }),
    })
  }).min(1);

  return validator.validate(userData);
}

export const orderVerification = (order: Order): Joi.ValidationResult<JoiValidationReturnType> => {
  const validator = Joi.object({
    productName: Joi.string().min(3).max(50).messages({
      'invalidProductName': 'Product name should be 3-50 characters long'
    }),
    price: Joi.number().min(0).messages({
      'invalidPrice': 'Product price must be 0 or positive value'
    }),
    quantity: Joi.number().min(1).messages({
      'invalidQuantity': 'Minimum 1 product must be selected'
    })
  }).min(3);

  return validator.validate(order);
}