import { fetchData as fetchDataApi } from "api.js";
import { min, max, convertDate, startOfMonth, nextDay, isToday, getUniqId } from "utils.js";

export const NEOS_LOADED = { name: "NEOS_LOADED" };
export const NEOS_PENDING = { name: "NEOS_PENDING" };
export const NEOS_ERROR = { name: "NEOS_ERROR" };


export const fetchData = date => dispatch => {
    const id = getUniqId();

    dispatch({ type: NEOS_PENDING, payload: { id, date, status: "pending" } });
    return fetchDataApi(date)
        .then(
            ({ near_earth_objects: neosByDate }) => {
                // Keys are dates in YYYY-MM-DD format.
                // We axpect it to be an object of one field

                const convertedDate = convertDate(date);

                const neos = neosByDate[convertedDate];

                if (neos.length === 0)
                    throw new Error("empty data set");

                const maxEstDiam = neos
                    .map(neo => neo.estimated_diameter.kilometers.estimated_diameter_max)
                    .reduce(max);

                const hazardCount = neos
                    .filter(neo => neo.is_potentially_hazardous_asteroid)
                    .length;

                const closest = neos
                    .map(neo => neo.close_approach_data[0].miss_distance.kilometers)
                    .reduce(min);

                const fastest = neos
                    .map(neo => neo.close_approach_data[0].relative_velocity.kilometers_per_hour)
                    .reduce(max);

                return dispatch({
                    type: NEOS_LOADED,
                    payload: {
                        id,
                        date,
                        status: "loaded",

                        maxEstDiam,
                        hazardCount,
                        closest,
                        fastest,
                    }
                });
            })
        .catch(
            err => dispatch({
                type: NEOS_ERROR,
                payload: {
                    id,
                    date,
                    status: "error",
                    message: err.message,
                }
            })
        );
};

export const loadNext = () => (dispatch, getState) => {
    const { neos } = getState();
    const start = startOfMonth(new Date());

    if (neos.length === 0)
        return dispatch(fetchData(start));

    const lastItemDate = neos[neos.length - 1].date;

    if (isToday(lastItemDate))
        return dispatch(fetchData(start));

    return dispatch(fetchData(nextDay(lastItemDate)));
};

