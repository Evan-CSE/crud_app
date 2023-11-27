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
        res.status(200).json(responseHandler.responseData(true, 'Fetched all data', data));
    } else {
        res.status(400).json(responseHandler.responseData(false, 'Something went wrong', {}, err))
    }
}

export const userController = {
    createNewUser,
    getAllUsers
};