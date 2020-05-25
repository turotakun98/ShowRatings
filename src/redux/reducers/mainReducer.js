import rangePickerReducer from "./rangePicker";
import { combineReducers } from "redux";

const mainReducer = combineReducers({ rangePicker: rangePickerReducer });

export default mainReducer;
