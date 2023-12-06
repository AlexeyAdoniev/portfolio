import { createSlice, configureStore } from "@reduxjs/toolkit";

export const menuItems = {
  PROJECTS: "PROJECTS",
  SIGNATURE: "SIGNATURE",
  SNAKE: "SNAKE",
  DEFAULT: "DEFAULT",
};

export const demos = {
  DFIANCE: "DFIANCE",
  XP: "XP",
  EXPLORER: "EXPLORER",
};

const globalSlice = createSlice({
  name: "global",
  initialState: {
    activeMenuItem: menuItems.PROJECTS,
    demo: null,
    transition: false,
  },
  reducers: {
    selectMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    selectDemo: (state, action) => {
      state.demo = action.payload;
    },
    setTransition: (state, action) => {
      state.transition = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export const { selectMenuItem, selectDemo, setTransition } =
  globalSlice.actions;
export default store;
