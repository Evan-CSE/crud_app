export interface userInterface {
    userId  : number,
    username: string,
    password: string,
    age     : number,
    fullName: fullName,
    email   : string,
    isActive: boolean,
    hobbies : Array<string>,
    address : addressType
};

export type addressType = {
    street : string,
    city   : string,
    country: string
};

export type fullName = {
    firstName: string,
    lastName : string,
};