import {ADD_ITEM, FETCH_ITEMS, CHANGE_TASK_DATA, REMOVE_ITEM, SHOW_LOADER} from "../types";

const handlers = {
    DEFAULT: state => state,
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_ITEM]: (state, { payload }) => ({
        ...state,
        items: [...state.items, payload ]
    }),
    [FETCH_ITEMS]: (state, { payload }) => ({ ...state, items: payload, loading: false }),
    [REMOVE_ITEM]: (state, { payload }) => ({
        ...state,
        items: state.items.filter(({id}) => id !== payload)
    }),
    [CHANGE_TASK_DATA]: (state, { payload }) => (
        {
        ...state,
        items: payload
    }),

};

export const firebaseReducer = (state, action) =>{
    const handle = handlers[action.type] || action.DEFAULT;
    return handle(state, action);
}
