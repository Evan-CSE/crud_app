import Joi, { equal, not, number } from "joi";
import { userInterface } from "../Interfaces/UserInterface";
import { invalidUserIdError, invalidUserName, invalidPassWordError, invalidNumberTypeError, invalidEmail, booleanError, invalidArrayTypeError, invalidStringTypeError } from "./valiDationErrorMessage";

export const validateUserData = (userData: userInterface): Object => {
    const validator = Joi.object ({
        userId  : Joi.number().required().error(invalidUserIdError),
        username: Joi.string().min(4).max(10).required().error(invalidUserName),
        password: Joi.string().min(6).max(20).required().error(invalidPassWordError),
        age     : Joi.number().error(invalidNumberTypeError),
        fullName: Joi.object({
            firstName: Joi.string().regex(/^[a-zA-Z]+$/).max(10).min(3).required().error(invalidUserName),
            lastName: Joi.string().regex(/^[a-zA-Z]+$/).max(10).min(3).required().error(invalidUserName)
        }),
        email   : Joi.string().email({minDomainSegments: 2, tlds:{allow:['com', '.net']}}).error(invalidEmail),
        isActive: Joi.boolean().error(booleanError),
        hobbies : Joi.array().items(Joi.string()).length(10).unique().error(invalidArrayTypeError),
        address : Joi.object({
            street : Joi.string().error(invalidStringTypeError),
            city   : Joi.string().error(invalidStringTypeError),
            country: Joi.string().not(/'israel'/i).error(invalidStringTypeError)
        })
    })
    return validator.validate(userData);
}