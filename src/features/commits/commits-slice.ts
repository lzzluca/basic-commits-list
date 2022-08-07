import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { fetchPage, fetchTotalCount } from './commits-thunk';

export interface Author {
  date: Date;
  // todo: there is a more specific type than string??
  email: string;
  // todo: there is a more specific type than string??
  name: string;
}

export interface Commit {
  author: Author;
  comment_count: number;
  committer: Author;
  message: string;
}

export interface CommitWrapper {
  commit: Commit;
  // node_id: ?;
  // todo: there is a more specific type than string??
  sha: string;
}

interface CommitsList {
  list: Array<CommitWrapper> | null;
  pageIndex: number;
}

// type for the slice state
export interface CommitsState {
  ids: Array<CommitWrapper['sha']>;
  entities:  { [sha: CommitWrapper['sha']]: CommitWrapper; };
  isLoading: boolean;
  currentPageIndex: number;
  counterTotalCommitsOnRepo: number;
}

// typed initial state
const initialState: CommitsState = {
  ids: [],
  entities: {},
  isLoading: false,
  currentPageIndex: 1,
  counterTotalCommitsOnRepo: -1
};

export const commitsSlice = createSlice({
  name: 'commits',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CommitsState>) => {
      builder.addCase(fetchPage.pending, (state: CommitsState) => {
          state.isLoading = true;
      });

      builder.addCase(fetchPage.fulfilled, (state: CommitsState, { payload } : { payload: CommitsList }) => {
        const nextEntities: CommitsState['entities'] = {};
        const nextIds: CommitsState['ids'] = [];
        const { list, pageIndex } = payload;

        list?.forEach(commit => {
          nextIds.push(commit.sha);
          nextEntities[commit.sha] = commit;
        });

        state.ids = nextIds;
        state.entities = nextEntities;
        state.isLoading = false;
        state.currentPageIndex = pageIndex;
      });

      // todo: missing error handling for the component render!!! as it is, it will display an endless loading
      builder.addCase(fetchPage.rejected, (state: CommitsState) => {
        state.isLoading = false;
      });




      builder.addCase(fetchTotalCount.pending, (state: CommitsState) => {
        state.isLoading = true;
      });

      builder.addCase(fetchTotalCount.fulfilled, (state: CommitsState, { payload } : { payload: number | null }) => {
        state.counterTotalCommitsOnRepo = Number(payload);
      });

      // todo: missing error handling for the component render!!! as it is, it will display an endless loading
      builder.addCase(fetchTotalCount.rejected, (state: CommitsState) => {
        state.isLoading = false;
      });
  }
});

export const selectCommits = (state: RootState): CommitsState => state.commits;

export default commitsSlice.reducer;