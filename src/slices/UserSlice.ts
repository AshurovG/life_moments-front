import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RecUserData } from "types";

interface DataState {
  userInfo: RecUserData | null;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    userInfo: null,
  } as DataState,
  reducers: {
    setUserInfo(state, action: PayloadAction<RecUserData | null>) {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
  },
});

export const useUserInfo = () =>
  useSelector((state: { userData: DataState }) => state.userData.userInfo);

export const { setUserInfo: setUserInfoAction } = dataSlice.actions;

export default dataSlice.reducer;
