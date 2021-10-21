import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    token: '',
    loggedIn: false,
    theme: '',
    user: {},
    splash_loading: true,
    currency: {},
    currencies: [],
  },
  reducers: {
    login: (state, action) => {
      AsyncStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.loggedIn = true;
      return state;
    },
    logout: state => {
      AsyncStorage.removeItem('token');
      state.token = '';
      state.loggedIn = false;
      return state;
    },
    setTheme: (state, action) => {
      AsyncStorage.setItem('theme', action.payload.theme);
      state.theme = action.payload.theme;
      return state;
    },
    removeSplash: state => {
      state.splash_loading = false;
      return state;
    },
    currencies: (state, action) => {
      state.currencies = action.payload.currencies;
      return state;
    },
    currency: (state, action) => {
      state.currency = action.payload.currency;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login, logout, setTheme, removeSplash, currencies, currency} =
  appSlice.actions;

export default appSlice.reducer;
