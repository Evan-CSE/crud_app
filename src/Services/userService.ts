import { Request, Response } from "express";
import { userInterface } from "../Interfaces/UserInterface";
import { userModel } from "../Model/UserModel";
import { validateUserData } from "../Utilities/validation";
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

export const userService = {
    maybeCreateNewUser,
    fetchAllUsers
};