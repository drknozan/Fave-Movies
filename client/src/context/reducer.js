import { DISPLAY_ALERT, CLEAR_ALERT, LOGIN_USER, GET_CURRENT_USER, LOGOUT_USER, GET_WATCH_LIST, UPDATE_WATCH_LIST, CLEAR_WATCH_LIST } from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertText: action.payload.alertText,
            alertType: action.payload.alertType, 
        };
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertText: '',
            alertType: '',
        }
    }

    if (action.type === GET_WATCH_LIST) {
        return {
            ...state,
            watchList: action.payload.watchlist,
        }
    }

    if (action.type === UPDATE_WATCH_LIST) {
        return {
            ...state,
            watchList: action.payload.updatedWatchList,
        }
    }

    if (action.type === CLEAR_WATCH_LIST) {
        return {
            ...state,
            watchList: null,
        }
    }

    if (action.type === LOGIN_USER) {
        return {
            ...state,
            user: action.payload.user,
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            user: null,
        }
    }

    if (action.type === GET_CURRENT_USER) {
        return {
            ...state,
            user: action.payload.user,
        }
    }
}

export default reducer;