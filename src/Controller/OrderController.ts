import { Response } from "express";
import { OrderService } from "../Services/OrderService";
import CustomRequestType from "../Interfaces/CustomRequestType";
import { responseHandler } from "../Utilities/responseHandler";
import { orderVerification } from "../Utilities/validation";

const maybeGetAllOrder = async (req: CustomRequestType, res: Response) => {
    const orders = await OrderService.maybeGetAllOrder(req.userId as string);

    if (!orders) {
        res.status(404).json(responseHandler.notFound());
        return;
    }
    res.status(200).json(responseHandler.responseData(
        true,
        "Order fetched successfully!",
        orders
    ));
}

const maybePlaceOrder = async (req: CustomRequestType, res: Response) => {
    const userId         = req.userId;
    const order          = req.body;
    const {error, value} = orderVerification(order);

    if (error) {
        const errorMessages = 
            error.details
                .map(err => {
                    return err.message
                });

        res.status(400).json(errorMessages);
        return;
    }
    const creationSuccessful = await OrderService.maybePlaceOrder(userId as string, order);
    
    if (creationSuccessful) {
        res
        .status(200)
        .json(responseHandler.responseData(
            true,
            "Order created successfully!",
            null
        ));
    } else {
        res
        .status(500)
        .send({error: "Internal server error"});
    }
}

const getOrderTotal = async (req: CustomRequestType, res: Response) => {
    const orders = await OrderService.maybeGetAllOrder(req.userId as string);

    if (!orders) {
        res.status(404).json(responseHandler.notFound());
        return;
    }
    const orderArr = orders['orders'];
    const totalPrice =
        orderArr
        .reduce((prev, current) => 
            prev + (current.price * current.quantity), 0);

    res
    .status(200)
    .json(
        responseHandler.responseData(
            true,
            "Total price calculated successfully!",
            {
                "totalPrice": totalPrice
            }
        )
    )
};

export const OrderController = {
    maybeGetAllOrder,
    maybePlaceOrder,
    getOrderTotal
};