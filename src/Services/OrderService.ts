import { userModel } from "../Model/UserModel";
import { Order } from "../Interfaces/UserInterface";

const maybeGetAllOrder = async (userId: string) => {
    const orders = await userModel.findOne({userId: userId}, {_id: 0, orders: 1});
    return orders;
}

const maybePlaceOrder = async (userId: string, order: Order) => {
    try {
        const update = {
            $push: {
                orders: order
            }
        };
        const newOrderArr = await userModel.findOneAndUpdate({userId: userId}, update, {returnOriginal: false});
        return newOrderArr;
    }
    catch(err) {
        return false;
    }
}

export const OrderService = {
    maybeGetAllOrder,
    maybePlaceOrder
}