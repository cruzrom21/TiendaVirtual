import handleCart from "./handleCart";
import handleCounter from "./handleCounter";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    handleCart,
    handleCounter
});

export default rootReducers;