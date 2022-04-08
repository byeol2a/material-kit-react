import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import counter from './counter';
import boardReducer from './boardReducer';
import uriReducer from './uriReducer';


const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        counter,
        boardReducer,
        uriReducer,
        // 여기에 추가
    })(state, action);
}

export default reducer;