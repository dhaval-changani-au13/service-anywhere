import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

import customerSchema from "../models/schemas/customer.js";
import servicemanSchema from "../models/schemas/serviceman.js";
import { hash } from "../utils/hashPass.js";

export const customerSignup = async (req, res) => {
    try {
        const { email, name, phone, password } = req.body;
        let user = await customerSchema.find({ email: email });

        if (user.length) {
            return res.status(400).json({
                data: {},
                errors: [
                    {
                        value: req.body.email,
                        msg: "User already exists.",
                        param: "email",
                        location: "body",
                    },
                ],
                message: "Unable to create user",
            });
        }

        const hashPassword = await hash(password, 10);
        user = new customerSchema({
            name,
            email,
            phone,
            password: hashPassword,
        });
        await user.save();
        res.status(200).json({
            data: {},
            errors: [],
            message: "Signed Up successfully!",
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await customerSchema.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                data: {},
                errors: [
                    {
                        value: email,
                        msg: "User not exist.",
                        param: "email",
                        location: "body",
                    },
                ],
                message: "Unable to create user",
            });
        }

        const matchPassword = bcrypt.compareSync(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                data: {},
                errors: [
                    {
                        value: password,
                        msg: "Invalid password !",
                        params: "password",
                        location: "body",
                    },
                ],
                message: "Unable to login!",
            });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.jwt_secret);
            //setting cookie
            res.cookie("customerToken", token, { httpOnly: true });
            console.log("Token set inside cookie.");
            res.status(200).json({
                data: { token },
                errors: [],
                message: "Login successfully!",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const customerProfile = async (req, res) => {
    try {
        res.status(200).json({
            data: req.user,
            errors: [],
            message: "Fetched data form user",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const customerLogout = async (req, res) => {
    try {
        res.clearCookie("customerToken").status(200).json({
            data: {},
            errors: [],
            message: "Loged Out",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const servicemanSignup = async (req, res) => {
    try {
        const { email, name, phone, password } = req.body;
        let user = await servicemanSchema.find({ email: email });

        if (user.length) {
            return res.status(400).json({
                data: {},
                errors: [
                    {
                        value: req.body.email,
                        msg: "Service User already exists.",
                        param: "email",
                        location: "body",
                    },
                ],
                message: "Unable to create user",
            });
        }

        const hashPassword = await hash(password, 10);
        user = new servicemanSchema({
            name,
            email,
            phone,
            password: hashPassword,
        });
        await user.save();
        res.status(200).json({
            data: {},
            errors: [],
            message: "Signed Up successfully!",
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const servicemanLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await servicemanSchema.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                data: {},
                errors: [
                    {
                        value: email,
                        msg: "User not exist.",
                        param: "email",
                        location: "body",
                    },
                ],
                message: "Unable to create user",
            });
        }

        const matchPassword = bcrypt.compareSync(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                data: {},
                errors: [
                    {
                        value: password,
                        msg: "Invalid password !",
                        params: "password",
                        location: "body",
                    },
                ],
                message: "Unable to login!",
            });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.jwt_secret);
            //setting cookie
            res.cookie("servicemanToken", token, { httpOnly: true });
            console.log("Token set inside cookie.");
            res.status(200).json({
                data: { token },
                errors: [],
                message: "Login successfully!",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const servicemanProfile = async (req, res) => {
    try {
        res.status(200).json({
            data: req.user,
            errors: [],
            message: "Fetched data form user",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const servicemanLogout = async (req, res) => {
    try {
        res.clearCookie("servicemanToken").status(200).json({
            data: {},
            errors: [],
            message: "Loged Out",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const updateLocationService = async (req, res) => {
    try {
        const longitude = req.params["longitude"];
        const latitude = req.params["latitude"];

        const user = await servicemanSchema.findOne({ _id: req.user._id });
        user.location.coordinates = [];
        user.location.coordinates.push(longitude);
        user.location.coordinates.push(latitude);

        await user.save();
        console.log(user);

        res.status(200).json({
            data: user,
            errors: [],
            message: "Location Updated",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const updateLocationCustomer = async (req, res) => {
    try {
        const longitude = req.params["longitude"];
        const latitude = req.params["latitude"];

        const user = await customerSchema.findOne({ _id: req.user._id });
        user.location.coordinates = [];
        user.location.coordinates.push(longitude);
        user.location.coordinates.push(latitude);

        await user.save();
        console.log(user);

        res.status(200).json({
            data: user,
            errors: [],
            message: "Location Updated",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const addService = async (req, res) => {
    try {
        const user = await servicemanSchema.findOne({ email: req.user.email });

        console.log("servicelist", user.serviceslist);

        user.serviceslist.push(req.body);
        await user.save();

        res.status(200).json({
            data: user,
            errors: [],
            message: "Service Added",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const askforservice = async (req, res) => {
    try {
        const allServiceman = await servicemanSchema.find({});

        console.log("servicelist", allServiceman);

        res.status(200).json({
            data: allServiceman,
            errors: [],
            message: "Serviceman List",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const selectServiceman = async (req, res) => {
    try {
        const servicemanID = req.params["servicemanID"];
        const serviceman = await servicemanSchema.find({ _id: servicemanID });

        console.log("servicelist", serviceman);

        res.status(200).json({
            data: serviceman,
            errors: [],
            message: "Serviceman",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const selectService = async (req, res) => {
    try {
        const servicemanID = req.params["servicemanID"];
        const serviceID = req.params["serviceID"];
        const serviceman = await servicemanSchema.findOne({ _id: servicemanID });

        const service = serviceman.serviceslist.id(serviceID);

        console.log("servicelist", service);

        res.status(200).json({
            data: service,
            errors: [],
            message: "Serviceman",
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const updateRating = async (req, res) => {
    try {
        const servicemanID = req.params["servicemanID"];
        const serviceID = req.params["serviceID"];
        const rating = req.params["rating"];
        const serviceman = await servicemanSchema.findOne({ _id: servicemanID });
        const service = serviceman.serviceslist.id(serviceID);

        service.rating = rating;
        await serviceman.save();
        console.log("servicelist", service);

        res.status(200).json({
            data: service,
            errors: [],
            message: "Serviceman",
        });
    } catch (err) {
        console.log(err.message);
    }
};
