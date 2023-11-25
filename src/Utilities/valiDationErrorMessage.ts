

export const invalidUserIdError: Error = {
    name   : 'Invalid user id',
    message: "Make sure userId contains only numbers"
};

export const invalidUserName: Error = {
    name   : 'Invalid userName provided',
    message: "Make sure username contains 4-10 characters"
};

export const invalidPassWordError: Error = {
    name: 'Password Error',
    message: 'Password length must be between 6-20'
};

export const mustBeANumber: Error = {
    name   : 'Type error',
    message: 'Must be a number'
};

export const invalidNameError: Error = {
    name: 'Invalid name',
    message: 'Must contain letters only between length 3-10'
};

export const invalidEmail: Error = {
    name: 'Invalid email',
    message: "Currently, we support .com and .net mail only"
};

export const booleanError: Error = {
    name: 'Type Error',
    message: "Field must be boolean"
};

export const invalidStringTypeError: Error = {
    name: 'Type Error',
    message: 'Field must be string'
};

export const invalidArrayTypeError: Error = {
    name: 'Type error',
    message: 'Array can be of string only with maximum of 10 number of elements'
};

export const invalidNumberTypeError: Error = {
    name: 'Type error',
    message: 'Must be a number'
};