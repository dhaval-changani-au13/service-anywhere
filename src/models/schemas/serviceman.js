import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        rating: {
            type: Number,
        },
    },
    { timestamps: true }
);

const servicemanSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
            },
            coordinates: {
                type: [Number],
            },
        },
        serviceslist: [servicesSchema],
    },
    { timestamps: true }
);

export default mongoose.model("serviceman", servicemanSchema);
