import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleCompletion,
  maintainHabit,
} from "../../../components/HabitTracker/utils/habits";

export const addHabitAsync = createAsyncThunk(
  "habits/addHabit",
  async ({ uid, habit }) => {
    await addHabit(uid, habit);
  }
);

export const fetchHabitsAsync = createAsyncThunk(
  "habits/fetchHabits",
  async (uid) => {
    const habits = await getHabits(uid);
    return habits || []; 
  }
);

export const updateHabitAsync = createAsyncThunk(
  "habits/updateHabit",
  async ({ uid, habitId, updatedData }) => {
    await updateHabit(uid, habitId, updatedData);
  }
);

export const deleteHabitAsync = createAsyncThunk(
  "habits/deleteHabit",
  async ({ uid, habitId }) => {
    await deleteHabit(uid, habitId);
  }
);

export const toggleCompletionAsync = createAsyncThunk(
  "habits/toggleCompletion",
  async ({ uid, habitId }) => {
    await toggleCompletion(uid, habitId);
  }
);

export const maintainHabitAsync = createAsyncThunk(
  "habits/maintainHabit",
  async ({ uid, habitId }) => {
    await maintainHabit(uid, habitId);
  }
);

const habitSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [], 
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHabitsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.habits = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchHabitsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default habitSlice.reducer;
