import React, { useReducer } from "react";
import {FirebaseContext} from "./firebaseContext";
import axios from 'axios';
import {firebaseReducer} from "./firebaseReducer";
import {ADD_ITEM, FETCH_ITEMS, CHANGE_TASK_DATA, REMOVE_ITEM, SHOW_LOADER} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {
    const initialState = {
        items: [],
        loading: true,
    };
    const [state, dispach] = useReducer(firebaseReducer, initialState);

    const showLoader = () => dispach({type: SHOW_LOADER});

    const fetchItems = async () => {
        showLoader();
        const res = await axios.get(`${url}/items.json`);
        const payload = Object.keys(res.data).map( key => {
            return {...res.data[key],
                id: key
            };
        });
        dispach({ type: FETCH_ITEMS, payload });
    };

    const addItem = async (label) => {
        const item = {
            label,
            important: false,
            done: false
        };
        const res = await axios.post(`${url}/items.json`, item);
        dispach({type: ADD_ITEM, payload: {...item, id: res.data.name}})
    };

    const removeItem = async (id) => {
        await axios.delete(`${url}/items/${id}.json`);
        dispach({
            type: REMOVE_ITEM,
            payload: id
        });
    };

    const markAsImportant = async (itemId) => {
        const idx = state.items.findIndex(({id}) => id === itemId)
        const important = !state.items[idx].important
        await axios.put(`${url}/items/${itemId}/important.json`,important)
        dispach({
            type: CHANGE_TASK_DATA,
            payload: [...state.items.slice(0, idx),
                { ...state.items[idx], important},
                ...state.items.slice(idx + 1)]
        });

    };

    const markAsDone = async (itemId) => {
        const idx = state.items.findIndex(({id}) => id === itemId)
        const done = !state.items[idx].done
        await axios.put(`${url}/items/${itemId}/done.json`,done)
        dispach({
            type: CHANGE_TASK_DATA,
            payload: [...state.items.slice(0, idx),
                { ...state.items[idx], done},
                ...state.items.slice(idx + 1)]
        });
    };



    return (
        <FirebaseContext.Provider value={{
            showLoader, removeItem, fetchItems,
            addItem, markAsImportant, markAsDone,
            loading: state.loading,
            items: state.items,
        }}>
            {children}
        </FirebaseContext.Provider>
    );
};