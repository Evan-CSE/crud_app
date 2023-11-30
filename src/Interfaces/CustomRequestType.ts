import { Request } from "express";

export default interface CustomRequestType extends Request {
    userId?: string;
};