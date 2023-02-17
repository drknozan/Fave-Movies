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

    return (
        <AppContext.Provider
            value={{
                ...state,
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