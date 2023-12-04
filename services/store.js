import { createSlice, configureStore } from "@reduxjs/toolkit";

export const menuItems = {
  SIGNATURE: "SIGNATURE",
  SNAKE: "SNAKE",
  DEFAULT: "DEFAULT",
};

const globalSlice = createSlice({
  name: "global",
  initialState: {
    activeMenuItem: menuItems.SIGNATURE,
  },
  reducers: {
    selectMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export const { selectMenuItem } = globalSlice.actions;
export default store;
