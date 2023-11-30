"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../Services/userService");
const responseHandler_1 = require("../Utilities/responseHandler");
const validation_1 = require("../Utilities/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = req.body;
    const { value, error } = (0, validation_1.validateUserData)(userDto);
    if (error) {
        const errorMessages = error.details
            .map(err => {
            return err.message;
        });
        res.status(400).json(errorMessages);
        return;
    }
    const salt = config_1.default.SALT ? parseInt(config_1.default.SALT) : 10;
    userDto.password =
        yield bcrypt_1.default
            .genSalt(salt)
            .then(salt => bcrypt_1.default.hash(userDto.password, salt))
            .then(hash => hash);
    const filteredResult = yield userService_1.userService.maybeCreateNewUser(userDto);
    if (filteredResult) {
        res
            .status(200)
            .json(responseHandler_1.responseHandler.responseData(true, "User created successfully!", filteredResult));
    }
    else {
        res
            .status(500)
            .send({ error: "Internal server error" });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, err } = yield userService_1.userService.fetchAllUsers(req, res);
    if (data) {
        res.status(200).json(responseHandler_1.responseHandler.responseData(true, "Users fetched successfully!", data));
    }
    else {
        res.status(404).json(responseHandler_1.responseHandler.responseData(false, "Users not found", {}, err));
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userService_1.userService.getUserById(req, res);
    if (data && data.length > 0) {
        res.status(200).json(responseHandler_1.responseHandler.responseData(true, "User fetched successfully!", data));
    }
    else {
        res.status(404).json(responseHandler_1.responseHandler.responseData(false, "User not found", {}, "User not found!"));
    }
});
const maybeUpdateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = req.body;
    const { error, value } = (0, validation_1.validateUserDataOnUpdate)(userDto);
    if (error) {
        const errorMessages = error.details
            .map(err => {
            return err.message;
        });
        res.status(400).json(errorMessages);
        return;
    }
    const salt = config_1.default.SALT ? parseInt(config_1.default.SALT) : 10;
    if (userDto.password) {
        userDto.password =
            yield bcrypt_1.default
                .genSalt(salt)
                .then(salt => bcrypt_1.default.hash(userDto.password, salt))
                .then(hash => hash);
    }
    const updatedData = yield userService_1.userService.maybeUpdateUserById(req.params.userId, userDto);
    if (!updatedData) {
        res
            .status(404)
            .json(responseHandler_1.responseHandler.notFound);
        return;
    }
    const { password, orders } = userDto, filteredResult = __rest(userDto, ["password", "orders"]);
    res
        .status(200)
        .json(responseHandler_1.responseHandler.responseData(true, "User updated successfully!", filteredResult));
});
const maybeDeleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTobeDeleted = req.params.userId;
    const deleteStatus = yield userService_1.userService.maybeDeleteUserById(req.params.userId);
    if (!deleteStatus) {
        res.status(404).json(responseHandler_1.responseHandler.notFound());
        return;
    }
    res.status(200).json(responseHandler_1.responseHandler.responseData(true, "User deleted successfully!", null));
});
exports.userController = {
    createNewUser,
    getAllUsers,
    getUserById,
    maybeUpdateUserById,
    maybeDeleteUserById
};
