import { configureStore } from '@reduxjs/toolkit';

import diveSitesReducer from './slices/dive-sites';
import diveLogsReducer from './slices/dive-logs';
import reviewReducer from './slices/reviews';

import type { ThunkAction, Action } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    dive_sites: diveSitesReducer,
    dive_logs: diveLogsReducer,
    reviews: reviewReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
