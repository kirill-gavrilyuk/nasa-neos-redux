import request from "superagent";
import { apiKey } from "config.js";
import { convertDate } from "utils.js";

export const fetchData = date =>
    request
        .get("https://api.nasa.gov/neo/rest/v1/feed")
        .query({
            start_date: convertDate(date),
            end_date: convertDate(date),
            api_key: apiKey
        })
        .then(res => res.body);
