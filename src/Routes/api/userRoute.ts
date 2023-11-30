import express, { NextFunction, Request, Response } from 'express';
import { userController } from '../../Controller/userController';
import orderRoute from './orderRoute';
import CustomRequestType from '../../Interfaces/CustomRequestType';

const userRoute = express.Router();

const getUserId = (req: Request): string => {
    return req.params.userId;
}

userRoute.use('/:userId/orders',(req: CustomRequestType, res, next) => {
    req.userId = getUserId(req);
    next();
}, orderRoute);

userRoute.post('/', userController.createNewUser);
userRoute.get('/', userController.getAllUsers);
userRoute.get('/:userId', userController.getUserById);
userRoute.put('/:userId', userController.maybeUpdateUserById);
userRoute.delete('/:userId', userController.maybeDeleteUserById);

export default userRoute;