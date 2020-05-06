import React, { useReducer } from "react";
import {AlertContext} from "./alertContext";
import {alertReducer} from "./alertReducer";
import {HIDE_ALERT, SHOW_ALERT} from "../types";

export const AlertState = ({ children }) => {
    const [state, dispach] = useReducer(alertReducer, {visible: false});

    const show = (text, type='warning') => {
        dispach({
            type: SHOW_ALERT,
            payload: {text, type}
        })
    };

    const hide = () => dispach({type: HIDE_ALERT});
    return (
        <AlertContext.Provider value={{
            show, hide,
            alert: state
        }}
        >
            {children}
        </AlertContext.Provider>
    );


}