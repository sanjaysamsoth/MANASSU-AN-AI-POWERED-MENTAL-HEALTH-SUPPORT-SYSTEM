import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const updateDarkMode = createAsyncThunk(
  "darkMode/updateDarkMode",
  async (darkMode, { getState }) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      console.log("Updating dark mode status in database...");
      await firebase.firestore().collection("users").doc(currentUser.uid).update({
        darkMode: darkMode,
      });
    }
  }
);

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    darkMode: JSON.parse(sessionStorage.getItem("darkMode")) || false, 
  },
  reducers: {
    setDarkMode: (state, action) => {

      sessionStorage.setItem("darkMode", JSON.stringify(action.payload));

      state.darkMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDarkMode.fulfilled, (state, action) => {
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { setDarkMode } = darkModeSlice.actions;
export const selectDarkMode = (state) => state.darkMode.darkMode;
export default darkModeSlice.reducer;
