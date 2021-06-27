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
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
