import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchReviews } from './api';
import { Review } from '_utils/interfaces/data/review';
import { AppThunk, RootState } from '../../store';

interface NormalizedObj {
  [id: string]: Review[];
}
interface ReviewState {
  reviews: NormalizedObj;
  loading: boolean;
  error: {
    status: boolean;
  };
}

const initialState: ReviewState = {
  reviews: {},
  loading: false,
  error: {
    status: false,
  },
};

interface ReviewsPayload {
  beach_id: number;
  reviews: Review[];
}

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState: initialState,
  reducers: {
    getAllReviews: (state, action: PayloadAction<ReviewsPayload>) => {
      state.reviews[action.payload.beach_id] = action.payload.reviews;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error.status = action.payload;
    },
  },
});

const { getAllReviews, setLoading, setError } = reviewSlice.actions;

export const selectAllReviews = (state: RootState) => state.reviews.reviews;

export const selectReviewById = (id: number) => {
  const selectedreview = createSelector(
    [selectAllReviews],
    reviews => reviews[id],
  );

  return selectedreview;
};

export const selectLoadingState = (state: RootState) => state.reviews.loading;

export const selectErrorState = (state: RootState) => state.reviews.error;

export const isReviewInState = (id: number) => {
  return createSelector([selectAllReviews], selectedRevs =>
    Boolean(selectedRevs[id]),
  );
};

export const handleFetchReviews =
  (id: number): AppThunk =>
  async (dispatch, _getState) => {
    try {
      dispatch(setLoading(true));
      const reviews = await fetchReviews(id);
      dispatch(
        getAllReviews({
          reviews: reviews.data,
          beach_id: id,
        }),
      );
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (err) {
      dispatch(setError(true));
      throw err;
    }
  };

export default reviewSlice.reducer;
