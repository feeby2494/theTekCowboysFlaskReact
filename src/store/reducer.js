import {LOGGED_IN_STATUS, LOGGED_OUT_STATUS} from "./action";

const initialState = {
    loggedIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case(LOGGED_IN_STATUS):
            return {
                ...state,
                loggedIn: true
            };
        case(LOGGED_OUT_STATUS):
            return {
                ...state,
                loggedIn: false
            };
        default:
            return state;
    }
};

export default reducer;