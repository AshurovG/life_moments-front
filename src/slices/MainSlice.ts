import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DataState {
  username: string;
  theme: "default" | "dark" | "green" | "blue";
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    username: "",
    theme: "default",
  } as DataState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setTheme(
      state,
      action: PayloadAction<"default" | "dark" | "green" | "blue">
    ) {
      state.theme = action.payload;
      console.log("new theme is", action.payload);
    },
  },
});

export const useUsername = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.username);

export const useTheme = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.theme);

export const { setUsername: setUsernameAction } = dataSlice.actions;
export const { setTheme: setThemeAction } = dataSlice.actions;

export default dataSlice.reducer;
