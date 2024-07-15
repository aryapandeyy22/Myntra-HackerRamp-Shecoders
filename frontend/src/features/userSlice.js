// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to load the initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return { id: null, name: '' };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { id: null, name: '' };
  }
};

// Function to save the state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState();

const userSlice = createSlice({
  name: 'user',
  // initialState: {
  //   id: null,
  //   name: '',
  // },
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
