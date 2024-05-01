import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "slices/MainSlice";

export default configureStore({
  reducer: combineReducers({
    mainData: mainReducer,
  }),
});
