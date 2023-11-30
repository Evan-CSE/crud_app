import { Request, Response } from "express";
import { userInterface } from "../Interfaces/UserInterface";
import { userService } from "../Services/userService";
import { responseHandler } from "../Utilities/responseHandler";

const createNewUser = async (req: Request, res: Response) => {
    await userService.maybeCreateNewUser(req, res);
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
    await userService.maybeUpdateUserById(req, res);
}

const maybeDeleteUserById = async (req: Request, res: Response) => {
    await userService.maybeDeleteUserById(req, res);
};

export const userController = {
    createNewUser,
    getAllUsers,
    getUserById,
    maybeUpdateUserById,
    maybeDeleteUserById
};