import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export const supportGroupsSlice = createSlice({
  name: "supportGroups",
  initialState: {
    loading: false,
    groups: [],
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setGroups, setError } = supportGroupsSlice.actions;

export const fetchGroups = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const groupsCollection = collection(db, "groups");
      const querySnapshot = await getDocs(groupsCollection);
      const groups = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setGroups(groups));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

export const createGroup = (groupData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const groupsCollection = collection(db, "groups");
      await addDoc(groupsCollection, groupData);
      dispatch(fetchGroups());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

export const selectGroups = (state) => state.supportGroups.groups;

export default supportGroupsSlice.reducer;
