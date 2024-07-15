import { createSlice } from '@reduxjs/toolkit';

const crowdProfileSlice = createSlice({
  name: 'crowdProfile',
  initialState: {
    profileImage: null,
    profileName: '',
    caption: '',
  },
  reducers: {
    setProfileData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProfileData } = crowdProfileSlice.actions;

export default crowdProfileSlice.reducer;
