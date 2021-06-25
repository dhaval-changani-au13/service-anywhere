import mongoose from "mongoose";

const mongoUri = "mongodb+srv://dhaval_changani:humble1234@cluster0.6nbuz.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-oej8j8-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"

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
