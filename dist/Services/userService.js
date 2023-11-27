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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const validation_1 = require("../Utilities/validation");
const maybeCreateNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = req.body;
    const { error } = (0, validation_1.validateUserData)(userDto);
    // res.status(200).send('<h1>ok</h1>');
    // try {
    //     const newUser = new userModel(userDto);
    //     const result  = await newUser.save();
    //     res.status(200).json(result);
    // }
    // catch(err) {
    //     console.log(err);
    //     res.status(500).send({error: "Internal server error"});
    // }
});
exports.userService = {
    maybeCreateNewUser
};
