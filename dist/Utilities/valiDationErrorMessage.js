"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidNumberTypeError = exports.invalidArrayTypeError = exports.invalidStringTypeError = exports.booleanError = exports.invalidEmail = exports.invalidNameError = exports.mustBeANumber = exports.invalidPassWordError = exports.invalidUserName = exports.invalidUserIdError = void 0;
exports.invalidUserIdError = {
    name: 'Invalid user id',
    message: "Make sure userId contains only numbers"
};
exports.invalidUserName = {
    name: 'Invalid userName provided',
    message: "Make sure username contains 4-10 characters"
};
exports.invalidPassWordError = {
    name: 'Password Error',
    message: 'Password length must be between 6-20'
};
exports.mustBeANumber = {
    name: 'Type error',
    message: 'Must be a number'
};
exports.invalidNameError = {
    name: 'Invalid name',
    message: 'Must contain letters only between length 3-10'
};
exports.invalidEmail = {
    name: 'Invalid email',
    message: "Currently, we support .com and .net mail only"
};
exports.booleanError = {
    name: 'Type Error',
    message: "Field must be boolean"
};
exports.invalidStringTypeError = {
    name: 'Type Error',
    message: 'Field must be string'
};
exports.invalidArrayTypeError = {
    name: 'Type error',
    message: 'Array can be of string only with maximum of 10 number of elements'
};
exports.invalidNumberTypeError = {
    name: 'Type error',
    message: 'Must be a number'
};
