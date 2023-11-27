export type JoiValidationReturnType = {
    value: any,
    error: JoiErrorObject
};

type JoiErrorObject = {
    _original: any,
    details: Array<SingleError>
};

type SingleError = {
    message: String,
    path: Array<String>,
    type: String,
    context: any
};