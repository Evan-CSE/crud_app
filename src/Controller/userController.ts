import { Request, Response } from "express";
import { userInterface } from "../Interfaces/UserInterface";
import { userService } from "../Services/userService";
import { responseHandler } from "../Utilities/responseHandler";
import { validateUserData, validateUserDataOnUpdate } from "../Utilities/validation";
import bcrypt from 'bcrypt';
import config from "../config";

const createNewUser = async (req: Request, res: Response) => {
    const userDto: userInterface = req.body;
    const {value, error}         = validateUserData(userDto);

    if (error) {
        const errorMessages = 
            error.details
                .map(err => {
                    return err.message
                });

        res.status(400).json(errorMessages);
        return;
    }

    const salt: number = config.SALT ? parseInt(config.SALT) : 10;
        userDto.password = 
            await bcrypt
            .genSalt(salt)
            .then(salt => bcrypt.hash(userDto.password, salt))
            .then(hash => hash);

    const filteredResult = await userService.maybeCreateNewUser(userDto);
    
    if (filteredResult) {
        res
        .status(200)
        .json(responseHandler.responseData(
            true,
            "User created successfully!",
            filteredResult
        ));
    } else {
        res
        .status(500)
        .send({error: "Internal server error"});
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    const {data, err} = await userService.fetchAllUsers(req, res);

    if (data) {
        res.status(200).json(responseHandler.responseData(true, "Users fetched successfully!", data));
    } else {
        res.status(404).json(responseHandler.responseData(false, "Users not found", {}, err))
    }
}


const getUserById = async (req: Request, res: Response) => {
    const data = await userService.getUserById(req, res);

    if (data && data.length > 0) {
        res.status(200).json(responseHandler.responseData(true, "User fetched successfully!", data));
    } else {
        res.status(404).json(responseHandler.responseData(false, "User not found", {}, "User not found!"));
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
        return;
    }
    const salt: number = config.SALT ? parseInt(config.SALT) : 10;

    if (userDto.password) {
        userDto.password = 
            await bcrypt
            .genSalt(salt)
            .then(salt => bcrypt.hash(userDto.password, salt))
            .then(hash => hash);
    }
    const updatedData = await userService.maybeUpdateUserById(req.params.userId, userDto);

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

const maybeDeleteUserById = async (req: Request, res: Response) => {
    const idTobeDeleted = req.params.userId;
    const deleteStatus =
        await userService.maybeDeleteUserById(req.params.userId);

    if (!deleteStatus) {
        res.status(404).json(responseHandler.notFound());
        return;
    }

    res.status(200).json(responseHandler.responseData(
        true,
        "User deleted successfully!",
        null
    ));
};

export const userController = {
    createNewUser,
    getAllUsers,
    getUserById,
    maybeUpdateUserById,
    maybeDeleteUserById
};