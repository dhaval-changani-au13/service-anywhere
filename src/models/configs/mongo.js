import mongoose from "mongoose";

// getting secrets from dotenv
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.mongouri;

async function mongoInit() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo DB connect succesfully");
    } catch (error) {
        console.log(error.message);
    }
}

export default mongoInit;
