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
    signatures: [],
    showAbout: false,
    boardVisibility: true,
    showSignatures: false,
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
    setSignatures: (state, action) => {
      state.signatures = action.payload;
    },
    setAbout: (state, action) => {
      state.showAbout = action.payload;
    },
    setBoardVisibility: (state, action) => {
      state.boardVisibility = action.payload;
    },
    setShowSignatures: (state, action) => {
      state.showSignatures = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export const {
  selectMenuItem,
  selectDemo,
  setTransition,
  setSignatures,
  setAbout,
  setBoardVisibility,
  setShowSignatures,
} = globalSlice.actions;
export default store;
