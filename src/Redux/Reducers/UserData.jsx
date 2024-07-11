import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {}, // Changed from value: '' to hold user data object
};

export const UserSlice = createSlice({
  name: 'UserData',
  initialState,
  reducers: {
    // New reducer to set user data
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Store in localStorage
      console.log('SetUserData : User data stored in Redux store:', action.payload);
    },
    clearUserData: (state) => {
      state.userData = {};
      localStorage.removeItem('userData'); // Clear from localStorage
      console.log('ClearUserData : User data cleared from Redux store');
    },
  },
});

// Export the actions
export const { setUserData, clearUserData } = UserSlice.actions;

export default UserSlice.reducer;