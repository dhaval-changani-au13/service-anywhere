import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// getting secrets from dotenv
import dotenv from "dotenv";
dotenv.config();

// mongodb intialization
import mongoInit from "./models/configs/mongo.js";
mongoInit();

// express app intialization
const app = express();
const Port = process.env.PORT || 5001;

// Middlewere
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.send("Health ok...");
});

import authRouter from "./routes/router.js";
app.use("/api", authRouter);

app.listen(Port, (err, req, res) => {
    if (err) {
        console.log(err.message);
    }
    console.log(`app running on http://localhost:${Port}`);
});
