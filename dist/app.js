"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoutes_1 = __importDefault(require("./Routes/api/apiRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', apiRoutes_1.default);
exports.default = app;
