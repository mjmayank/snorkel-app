import { configureStore } from '@reduxjs/toolkit';

import buddiesReducer from './slices/buddies';
import diveSitesReducer from './slices/dive-sites';
import diveLogsReducer from './slices/dive-logs';
import reviewReducer from './slices/reviews';
import userReducer from './slices/user';
import settingsReducer from './slices/settings';
import searchReducer from './slices/search';
import diveShopsReducer from './slices/dive-shops';

import type { ThunkAction, Action } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    buddies: buddiesReducer,
    dive_sites: diveSitesReducer,
    dive_logs: diveLogsReducer,
    reviews: reviewReducer,
    user: userReducer,
    settings: settingsReducer,
    search: searchReducer,
    dive_shops: diveShopsReducer,
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
