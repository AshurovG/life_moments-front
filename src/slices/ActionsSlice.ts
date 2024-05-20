import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { ActionsSubscription, ActionsLike } from "types";

interface DataState {
  actionsSubscriptions: ActionsSubscription[];
  actionsLikes: ActionsLike[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    actionsSubscriptions: [],
    actionsLikes: [],
  } as DataState,
  reducers: {
    setActionsSubscriptions(
      state,
      action: PayloadAction<ActionsSubscription[]>
    ) {
      console.log(action.payload);
      state.actionsSubscriptions = action.payload;
    },

    setActionsLikes(state, action: PayloadAction<ActionsLike[]>) {
      console.log(action.payload);
      state.actionsLikes = action.payload;
    },
  },
});

export const useActionsSubscriptions = () =>
  useSelector(
    (state: { actionsData: DataState }) =>
      state.actionsData.actionsSubscriptions
  );

export const useActionsLikes = () =>
  useSelector(
    (state: { actionsData: DataState }) => state.actionsData.actionsLikes
  );

export const { setActionsSubscriptions: setActionsSubscriptionsAction } =
  dataSlice.actions;
export const { setActionsLikes: setActionsLikesAction } = dataSlice.actions;

export default dataSlice.reducer;
