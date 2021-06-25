import express from "express";
import { auth_customer, auth_serviceman } from "../middlewares/auth.js";
import {
    customerLogin,
    customerProfile,
    customerSignup,
    servicemanLogin,
    servicemanSignup,
    servicemanProfile,
    updateLocationCustomer,
    updateLocationService,
    customerLogout,
    servicemanLogout,
    addService,
    askforservice,
    selectServiceman,
    selectService,
    updateRating,
} from "../controller/authControler.js";

const router = express.Router();

router.post("/serviceman-login", servicemanLogin);
router.post("/customer-login", customerLogin);

router.post("/serviceman-signup", servicemanSignup);
router.post("/customer-signup", customerSignup);

router.get("/customer-logout", auth_customer, customerLogout);
router.get("/serviceman-logout", auth_serviceman, servicemanLogout);

router.get("/customer-profile", auth_customer, customerProfile);
router.get("/serviceman-profile", auth_serviceman, servicemanProfile);

router.post("/customer-location-save/:longitude/:latitude", auth_customer, updateLocationCustomer);
router.post("/service-location-save/:longitude/:latitude", auth_serviceman, updateLocationService);
router.post("/add-service", auth_serviceman, addService);

router.get("/askforservice", auth_customer, askforservice);
router.get("/select-serviceman/:servicemanID", auth_customer, selectServiceman);
router.get("/select-service/:servicemanID/:serviceID", auth_customer, selectService);
router.post("/update-rating/:servicemanID/:serviceID/:rating", auth_customer, updateRating);

export default router;
