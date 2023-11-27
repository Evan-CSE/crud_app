import { json} from "express"

interface ResponseInterface {
    success: boolean,
    message: string,
    data: object,
    innerMessage: any,
}

const responseData = (success: boolean, message: string, data: Object, innerMessage?: any) => {
    return ({
        success: success,
        message: message,
        data: data,
        innerMessage: innerMessage
    });
}

export const responseHandler = {
    responseData
};