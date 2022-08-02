import { configureStore } from '@reduxjs/toolkit';
import commitsReducer from '../features/commits/commits-slice';

const store = configureStore({
  reducer: {
      commits: commitsReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {movies: MoviesState, reviews: MoviesState}
export type AppDispatch = typeof store.dispatch

export default store;
