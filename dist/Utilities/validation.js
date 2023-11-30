"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderVerification = exports.validateUserDataOnUpdate = exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUserData = (userData) => {
    const validator = joi_1.default.object({
        userId: joi_1.default.number().required().messages({
            'invalidUserId': 'Invalid userId provided. Must be a number.'
        }),
        username: joi_1.default.string()
            .required()
            .min(4)
            .max(10)
            .messages({
            'invalidUsername': 'Invalid username provided. Must be alphanumeric with length 4-10.'
        }),
        password: joi_1.default.string()
            .required()
            .min(6)
            .max(20)
            .messages({
            'invalidPassword': 'Password error. Must be alphanumeric and length must be between 6-20.'
        }),
        age: joi_1.default.number().messages({
            'notANumber': 'Must be a number.'
        }),
        fullName: joi_1.default.object({
            firstName: joi_1.default.string()
                .required()
                .pattern(/^[a-zA-Z]+$/)
                .max(10)
                .min(3)
                .messages({
                'invalidFirstName': 'Must contain only letters and spaces, and length must be between 3-10.'
            }),
            lastName: joi_1.default.string()
                .required()
                .pattern(/^[a-zA-Z]+$/)
                .max(10)
                .min(3)
                .messages({
                'invalidLastName': 'Must contain only letters and spaces, and length must be between 3-10.'
            }),
        }),
        email: joi_1.default.string()
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
        isActive: joi_1.default.boolean().messages({
            'invalidIsActive': 'The "isActive" field must be either true or false.'
        }),
        hobbies: joi_1.default.array()
            .required()
            .items(joi_1.default.string().min(3).max(50))
            .max(10)
            .unique()
            .messages({
            'invalidHobbies': 'Array can be of string only with a maximum of 10 elements.'
        }),
        orders: joi_1.default.array().optional(),
        address: joi_1.default.object({
            street: joi_1.default.string()
                .required()
                .min(3)
                .max(50)
                .messages({
                'invalidStreet': 'Street name is required and must be between 3 and 50 characters long.'
            }),
            city: joi_1.default.string()
                .required()
                .min(3)
                .max(50)
                .messages({
                'invalidCity': 'City name is required and must be between 3 and 50 characters long.'
            }),
            country: joi_1.default.string()
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
exports.validateUserData = validateUserData;
const validateUserDataOnUpdate = (userData) => {
    const validator = joi_1.default.object({
        username: joi_1.default.string()
            .min(4)
            .max(10)
            .messages({
            'invalidUsername': 'Invalid username provided. Must be alphanumeric with length 4-10.'
        }),
        password: joi_1.default.string()
            .min(6)
            .max(20)
            .messages({
            'invalidPassword': 'Password error. Must be alphanumeric and length must be between 6-20.'
        }),
        age: joi_1.default.number().messages({
            'notANumber': 'Must be a number.'
        }),
        fullName: joi_1.default.object({
            firstName: joi_1.default.string()
                .pattern(/^[a-zA-Z]+$/)
                .max(10)
                .min(3)
                .messages({
                'invalidFirstName': 'Must contain only letters and spaces, and length must be between 3-10.'
            }),
            lastName: joi_1.default.string()
                .pattern(/^[a-zA-Z]+$/)
                .max(10)
                .min(3)
                .messages({
                'invalidLastName': 'Must contain only letters and spaces, and length must be between 3-10.'
            }),
        }),
        email: joi_1.default.string()
            .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net'],
            },
        })
            .messages({
            'invalidEmail': 'Currently, we only support .com and .net mail.'
        }),
        isActive: joi_1.default.boolean().messages({
            'invalidIsActive': 'The "isActive" field must be either true or false.'
        }),
        hobbies: joi_1.default.array()
            .items(joi_1.default.string().min(3).max(50))
            .max(10)
            .unique()
            .messages({
            'invalidHobbies': 'Array can be of string only with a maximum of 10 elements.'
        }),
        orders: joi_1.default.array().items(joi_1.default.object({
            productName: joi_1.default.string().min(3).max(50).required(),
            price: joi_1.default.number().min(0).required(),
            quantity: joi_1.default.number().min(1).required(),
        })).optional(),
        address: joi_1.default.object({
            street: joi_1.default.string()
                .min(3)
                .max(50)
                .messages({
                'invalidStreet': 'Street name is required and must be between 3 and 50 characters long.'
            }),
            city: joi_1.default.string()
                .min(3)
                .max(50)
                .messages({
                'invalidCity': 'City name is required and must be between 3 and 50 characters long.'
            }),
            country: joi_1.default.string()
                .min(3)
                .max(50)
                .regex(/israel/i, { invert: true })
                .messages({
                'invalidCountry': 'Invalid country name provided.".'
            }),
        })
    }).min(1);
    return validator.validate(userData);
};
exports.validateUserDataOnUpdate = validateUserDataOnUpdate;
const orderVerification = (order) => {
    const validator = joi_1.default.object({
        productName: joi_1.default.string().min(3).max(50).messages({
            'invalidProductName': 'Product name should be 3-50 characters long'
        }),
        price: joi_1.default.number().min(0).messages({
            'invalidPrice': 'Product price must be 0 or positive value'
        }),
        quantity: joi_1.default.number().min(1).messages({
            'invalidQuantity': 'Minimum 1 product must be selected'
        })
    }).min(3);
    return validator.validate(order);
};
exports.orderVerification = orderVerification;
