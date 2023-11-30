"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../Controller/userController");
const orderRoute_1 = __importDefault(require("./orderRoute"));
const userRoute = express_1.default.Router();
const getUserId = (req) => {
    return req.params.userId;
};
userRoute.use('/:userId/orders', (req, res, next) => {
    req.userId = getUserId(req);
    next();
}, orderRoute_1.default);
userRoute.post('/', userController_1.userController.createNewUser);
userRoute.get('/', userController_1.userController.getAllUsers);
userRoute.get('/:userId', userController_1.userController.getUserById);
userRoute.put('/:userId', userController_1.userController.maybeUpdateUserById);
userRoute.delete('/:userId', userController_1.userController.maybeDeleteUserById);
exports.default = userRoute;
