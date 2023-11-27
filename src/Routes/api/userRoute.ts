import express, { Request, Response } from 'express';
import { userInterface } from '../../Interfaces/UserInterface';
import { userController } from '../../Controller/userController';

const userRoute = express.Router();

userRoute.post('/', userController.createNewUser);
userRoute.get('/', userController.getAllUsers);

export default userRoute;