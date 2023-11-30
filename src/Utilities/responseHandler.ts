interface ResponseDataType {
    success:  boolean,
    message:  string,
    data?:    object | null,
    error?:   Error
};

interface Error {
    code       : number,
    description: string
};

const responseData = (success: boolean, message: string, responseData: Object | null, innerMessage?: any) => {
    let response:ResponseDataType = {
        success: success,
        message: message
    };
    if (success) {
        response.data = responseData ?? null;
    } else {
        response.error = {
            code: 404,
            description: innerMessage
        }
    }
    return response;
}

const notFound = () => {
    let response: ResponseDataType = {
        success: false,
        message: "User not found",
        error: {
            code:        404,
            description: "User not found!"
        }
    };
    return response;
}

export const responseHandler = {
    responseData,
    notFound
};