import express, { Request, Response } from 'express';

const userRoute = express.Router();

userRoute.get('/', (req: Request, res: Response) => {
    res.send('<h1>bismillah</h1>');
})

export default userRoute;