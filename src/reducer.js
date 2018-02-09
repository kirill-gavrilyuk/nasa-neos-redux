import { NEOS_LOADED, NEOS_PENDING, NEOS_ERROR } from "actions.js";

const initialState = {
    neos: []
};

function appReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case NEOS_PENDING:
            return {
                ...state,
                neos: [...state.neos, payload].slice(-6)
            };

        case NEOS_LOADED:
        case NEOS_ERROR:
            return {
                ...state,
                neos: state.neos
                    .map(neo => neo.id === payload.id ? payload : neo)
            };

        default:
            return state;
    }
}

export default appReducer;
