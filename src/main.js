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

var corsOptions = {
    origin: ["http://localhost:3000", "https://blissful-albattani-42cdb9.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};
// Middlewere
app.use(cors(corsOptions));
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
