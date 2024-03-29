import express from 'express';
import userRoute from './userRoute';

const routeV1 = express.Router();

routeV1.use('/users', userRoute);

export default routeV1;