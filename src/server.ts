import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const mainFunction = async () => {
    try {
        await mongoose.connect(config.MONGODB_BASE_URL as string, {
            serverSelectionTimeoutMS: 3000
        })
        .then(() => console.log('Connected to mongodb'));
        
        app.listen(config.PORT, () => {
            console.log(`Listening on port: ${config.PORT}`);
        })
    }
    catch (err) {
        console.log(`Encountered error: ${err}`);
    }
};

mainFunction();