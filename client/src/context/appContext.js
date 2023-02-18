import { useReducer, useContext, useEffect, createContext, useLayoutEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import { DISPLAY_ALERT, CLEAR_ALERT, LOGIN_USER, GET_CURRENT_USER, LOGOUT_USER, GET_WATCH_LIST, UPDATE_WATCH_LIST, CLEAR_WATCH_LIST } from "./actions";

const initialState = {
    user: null,
    watchList: null,
    showAlert: false,
    alertText: '',
    alertType: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = (alertText, alertType) => {
        dispatch({ type: DISPLAY_ALERT, payload: { alertText, alertType } });

        clearAlert();
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 2500);
    }

    const loginUser = async (values) => {
        try {
            const userRes = await axios.post("http://localhost:5000/api/auth/login", { username: values.username, password: values.password }, { withCredentials: true });

            const user = userRes.data.user;

            const alertText = "Logged in";
            const alertType = "success";

            try {
                const watchlistRes = await axios.get("http://localhost:5000/api/watchlist", { withCredentials: true });

                const watchlist = watchlistRes.data.movies;

                dispatch({ type: GET_WATCH_LIST, payload: { watchlist } });
                dispatch({ type: LOGIN_USER, payload: { user } });

                displayAlert(alertText, alertType);
            } catch (err) {
                console.log(err.response.data.msg);
            }
        } catch (err) {
            displayAlert(err.response.data.msg, "danger");
        }
    }

    const logoutUser = async () => {
        try {
            await axios.get("http://localhost:5000/api/auth/logout");
            
            const alertText = "Logged out";
            const alertType = "success";

            dispatch({ type: LOGOUT_USER, payload: { alertText, alertType } });
            dispatch({ type: CLEAR_WATCH_LIST });

            displayAlert(alertText, alertType);
        } catch (err) {
            displayAlert(err.response.data.msg, "danger");
        }
    }

    const getCurrentUser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/getCurrentUser", { withCredentials: true });
            
            const user = res.data.user;
            
            dispatch({ type: GET_CURRENT_USER, payload: { user } });
            
            try {
                const res = await axios.get("http://localhost:5000/api/watchlist", { withCredentials: true });
            
                const watchlist = res.data.movies;
            
                dispatch({ type: GET_WATCH_LIST, payload: { watchlist } });
            } catch (err) {
                console.log(err.response.data.msg);
            }
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                clearAlert,
                loginUser,
                getCurrentUser,
                logoutUser,
            }}
        >
                { children }
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };