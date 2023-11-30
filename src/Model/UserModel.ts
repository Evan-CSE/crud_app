import mongoose, { Schema, mongo } from "mongoose";
import { addressType, fullName, userInterface } from "../Interfaces/UserInterface";

const fullNameSchema = new Schema<fullName>({
    firstName: {type: String, required: true},
    lastName : {type: String, required: true}
});

const addressSchema = new Schema<addressType>({
    street : {type: String, required: true},
    city   : {type: String, required: true},
    country: {type: String, required: true}
});


const userSchema = new Schema<userInterface>({
    userId  : {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String},
    address : {type: addressSchema},
    age     : {type: Number},
    fullName: {type: fullNameSchema},
    email   : {type: String, required: true},
    isActive: {type: Boolean},
    hobbies : {type: [String], required: true},
    orders:   {type: [Object]}
});

export const userModel = mongoose.model('User', userSchema);