import express from 'express';
import { OrderController } from '../../Controller/OrderController';

const orderRoute = express.Router();

orderRoute.get('/', OrderController.maybeGetAllOrder);
orderRoute.put('/', OrderController.maybePlaceOrder);
orderRoute.get('/total-price', OrderController.getOrderTotal);

export default orderRoute;