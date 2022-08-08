import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { fetchPage, fetchTotalCount } from './commits-thunk';

interface CommitAuthor {
  date: Date;
}

interface Commit {
  author: CommitAuthor;
  message: string;
}

interface AuthorCommitWrapper {
  avatar_url: URL;
  login: string;
}

export interface CommitWrapper {
  author: AuthorCommitWrapper;
  commit: Commit;
  node_id: string;
}

interface CommitsList {
  list: Array<CommitWrapper> | null;
  pageIndex: number;
}

// type for the slice state
export interface CommitsState {
  ids: Array<CommitWrapper['node_id']>;
  entities:  { [node_id: CommitWrapper['node_id']]: CommitWrapper; };
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
          nextIds.push(commit.node_id);
          nextEntities[commit.node_id] = commit;
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