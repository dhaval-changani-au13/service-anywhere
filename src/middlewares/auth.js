import jwt from "jsonwebtoken";
import customerSchema from "../models/schemas/customer.js";
import servicemanSchema from "../models/schemas/serviceman.js";

export const auth_customer = async (req, res, next) => {
    try {
        const token = req.cookies.customerToken;
        if (!token) {
            return res.status(401).json({ data: {}, error: [], message: "Please login!!" });
        }

        const decode = jwt.verify(token, process.env.jwt_secret);
        const userData = await customerSchema.findById(decode.id, {
            password: 0,
        });
        if (!userData) {
            return res.status(400).json({
                data: {},
                errors: [],
                message: "Not a valid user!",
            });
        }
        req.user = userData;
        next();
    } catch (error) {
        console.log(error.message);
    }
};

export const auth_serviceman = async (req, res, next) => {
    try {
        const token = req.cookies.servicemanToken;
        if (!token) {
            return res.status(401).json({ data: {}, error: [], message: "Please login!!" });
        }

        const decode = jwt.verify(token, process.env.jwt_secret);
        const userData = await servicemanSchema.findById(decode.id, {
            password: 0,
        });
        if (!userData) {
            return res.status(400).json({
                data: {},
                errors: [],
                message: "Not a valid user!",
            });
        }
        req.user = userData;
        next();
    } catch (error) {
        console.log(error.message);
    }
};
