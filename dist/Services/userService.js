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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const UserModel_1 = require("../Model/UserModel");
const maybeCreateNewUser = (userDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new UserModel_1.userModel(userDto);
        yield newUser.save();
        const { password } = userDto, filteredResult = __rest(userDto, ["password"]);
        return filteredResult;
    }
    catch (err) {
        return null;
    }
});
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield UserModel_1.userModel
            .find({}, { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 })
            .exec()
            .then(res => res)
            .catch(err => {
            return { data: null, err: err };
        });
        return { data: data, err: null };
    }
    catch (err) {
        return { data: null, err };
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield UserModel_1.userModel.find({
            userId: req.params.userId
        }, {
            _id: 0,
            userId: 1,
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            isActive: 1,
            hobbies: 1,
            address: 1
        });
        return data;
    }
    catch (err) {
        throw err;
    }
});
const maybeUpdateUserById = (userId, userDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = UserModel_1.userModel.findOneAndUpdate({ userId: userId }, userDto, {
            returnOriginal: false
        });
        if (!updatedData) {
            return updatedData;
        }
        return userDto;
    }
    catch (err) {
        return err;
    }
});
const maybeDeleteUserById = (idTobeDeleted) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteStatus = yield UserModel_1.userModel.findOneAndDelete({ userId: idTobeDeleted });
    return deleteStatus;
});
exports.userService = {
    maybeCreateNewUser,
    fetchAllUsers,
    getUserById,
    maybeUpdateUserById,
    maybeDeleteUserById
};
