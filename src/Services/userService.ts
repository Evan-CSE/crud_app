import { Request, Response, response } from "express";
import { userInterface } from "../Interfaces/UserInterface";
import { userModel } from "../Model/UserModel";
import { validateUserData, validateUserDataOnUpdate } from "../Utilities/validation";
import bcrypt from 'bcrypt';
import config from "../config";
import { responseHandler } from "../Utilities/responseHandler";


const maybeCreateNewUser = async (req: Request, res: Response) => {
    const userDto:userInterface = req.body;
    const {value, error}        = validateUserData(userDto);

    if (error) {
        const errorMessages = 
            error.details
                .map(err => {
                    return err.message
                });

        res.status(400).json(errorMessages);
    } else {
        try {
            const salt: number = config.SALT ? parseInt(config.SALT) : 10;
            userDto.password = 
                await bcrypt
                .genSalt(salt)
                .then(salt => bcrypt.hash(userDto.password, salt))
                .then(hash => hash);
    
            const newUser = new userModel(userDto);
            await newUser.save();
            
            const {password, ...filteredResult} = userDto;
    
            res
            .status(200)
            .json(responseHandler.responseData(
                true,
                "User created successfully!",
                filteredResult
            ));
        }
        catch(err) {
            res
            .status(500)
            .send({error: "Internal server error"});
        }
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
                    _id: 0,
                    userId: 1,
                    username: 1,
                    fullName: 1,
                    age: 1,
                    email: 1,
                    isActive: 1,
                    hobbies: 1,
                    address: 1
                }
            );
        return data;
    } catch (err) {
        throw err;
    }
}

const maybeUpdateUserById = async (req: Request, res: Response) => {
    const userDto = req.body;
    const {error, value} = validateUserDataOnUpdate(userDto);
    
    if (error) {
        const errorMessages = 
            error.details
                .map(err => {
                    return err.message
                });

        res.status(400).json(errorMessages);
    } else {
        try {
            const salt: number = config.SALT ? parseInt(config.SALT) : 10;

            if (userDto.password) {
                userDto.password = 
                    await bcrypt
                    .genSalt(salt)
                    .then(salt => bcrypt.hash(userDto.password, salt))
                    .then(hash => hash);
            }

            const updatedData = userModel.findOneAndUpdate({userId: req.params.userId}, userDto, {
                returnOriginal: false
            });

            if (!updatedData) {
                res
                .status(404)
                .json(responseHandler.notFound);
                return;
            }

            const {password, orders, ...filteredResult} = userDto;
    
            res
            .status(200)
            .json(responseHandler.responseData(
                true,
                "User updated successfully!",
                filteredResult
            ));
        }
        catch(err) {
            console.log(err);
            res
            .status(500)
            .send({error: "Internal server error"});
        }
    }
}

const maybeDeleteUserById = async (req: Request, res: Response) => {
    const idTobeDeleted = req.params.userId;
    const deleteStatus  = await userModel.findOneAndDelete({userId: idTobeDeleted});

    if (!deleteStatus) {
        res.status(404).json(responseHandler.notFound());
        return;
    }

    res.status(200).json(responseHandler.responseData(
        true,
        "User deleted successfully!",
        {}
    ));
}


export const userService = {
    maybeCreateNewUser,
    fetchAllUsers,
    getUserById,
    maybeUpdateUserById,
    maybeDeleteUserById
};