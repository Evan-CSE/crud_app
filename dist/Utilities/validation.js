"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
const valiDationErrorMessage_1 = require("./valiDationErrorMessage");
const validateUserData = (userData) => {
    const validator = joi_1.default.object({
        userId: joi_1.default.number().required().error(valiDationErrorMessage_1.invalidUserIdError),
        username: joi_1.default.string().min(4).max(10).required().error(valiDationErrorMessage_1.invalidUserName),
        password: joi_1.default.string().min(6).max(20).required().error(valiDationErrorMessage_1.invalidPassWordError),
        age: joi_1.default.number().error(valiDationErrorMessage_1.invalidNumberTypeError),
        fullName: joi_1.default.object({
            firstName: joi_1.default.string().regex(/^[a-zA-Z]+$/).max(10).min(3).required().error(valiDationErrorMessage_1.invalidUserName),
            lastName: joi_1.default.string().regex(/^[a-zA-Z]+$/).max(10).min(3).required().error(valiDationErrorMessage_1.invalidUserName)
        }),
        email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', '.net'] } }).error(valiDationErrorMessage_1.invalidEmail),
        isActive: joi_1.default.boolean().error(valiDationErrorMessage_1.booleanError),
        hobbies: joi_1.default.array().items(joi_1.default.string()).length(10).unique().error(valiDationErrorMessage_1.invalidArrayTypeError),
        address: joi_1.default.object({
            street: joi_1.default.string().error(valiDationErrorMessage_1.invalidStringTypeError),
            city: joi_1.default.string().error(valiDationErrorMessage_1.invalidStringTypeError),
            country: joi_1.default.string().not(/'israel'/i).error(valiDationErrorMessage_1.invalidStringTypeError)
        })
    });
    return validator.validate(userData);
};
exports.validateUserData = validateUserData;
