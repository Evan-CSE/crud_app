import { Request, Response, response } from "express";
import { userInterface } from "../Interfaces/UserInterface";
import { userModel } from "../Model/UserModel";
import { responseHandler } from "../Utilities/responseHandler";


const maybeCreateNewUser = async (userDto: userInterface) => {
    try {
        const newUser = new userModel(userDto);
        await newUser.save();
        const {password, ...filteredResult} = userDto;
        return filteredResult;
    }
    catch(err) {
        return null;
    }
}


const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        let data = await userModel
            .find({},{_id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1})
            .exec()
            .then(res => res)
            .catch(err => {
                return {data: null, err: err}
            });

        return {data: data, err: null};
    } catch (err) {
        return {data: null, err};
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        let data = 
            await userModel.find(
                {
                    userId: req.params.userId
                },
                {
                    _id     : 0,
                    userId  : 1,
                    username: 1,
                    fullName: 1,
                    age     : 1,
                    email   : 1,
                    isActive: 1,
                    hobbies : 1,
                    address : 1
                }
            );
        return data;
    } catch (err) {
        throw err;
    }
}

const maybeUpdateUserById = async (userId: string, userDto: userInterface) => {
    try {
        const updatedData = userModel.findOneAndUpdate({userId: userId}, userDto, {
            returnOriginal: false
        });

        if (!updatedData) {
            return updatedData;
        }

        return userDto;
    }
    catch(err) {
        return err;
    }
}

const maybeDeleteUserById = async (idTobeDeleted: string) => {
    const deleteStatus  = await userModel.findOneAndDelete({userId: idTobeDeleted});
    return deleteStatus;
}


export const userService = {
    maybeCreateNewUser,
    fetchAllUsers,
    getUserById,
    maybeUpdateUserById,
    maybeDeleteUserById
};