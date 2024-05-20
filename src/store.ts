import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/UserSlice";
import actionsReducer from "slices/ActionsSlice";

export default configureStore({
  reducer: combineReducers({
    userData: userReducer,
    actionsData: actionsReducer,
  }),
});
