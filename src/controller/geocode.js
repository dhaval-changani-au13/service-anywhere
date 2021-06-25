import request from "postman-request";
import { config } from "dotenv";
config();

const geocode = (longitude, latitude, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        longitude +
        "," +
        latitude +
        ".json?access_token=" +
        process.env.MAPBOX_API +
        "&limit=1";

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined);
        } else {
            callback(undefined, response.body);
            return response.body;
        }
    });
};

export default geocode;
