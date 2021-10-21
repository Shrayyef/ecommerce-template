import {configureStore} from '@reduxjs/toolkit';
import appReducer from './reducers/app';
import cartReducer from './reducers/cart';

export default configureStore({
  reducer: {
    app: appReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
