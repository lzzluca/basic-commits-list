import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { fetchCommits } from './commits-thunk';

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

// type for the slice state
export interface CommitsState {
  ids: Array<CommitWrapper['sha']>;
  entities:  { [sha: CommitWrapper['sha']]: CommitWrapper; };
  isLoading: boolean;
}

// typed initial state
const initialState: CommitsState = {
  ids: [],
  entities: {},
  isLoading: false
};

export const commitsSlice = createSlice({
  name: 'commits',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CommitsState>) => {
      builder.addCase(fetchCommits.pending, (state: CommitsState) => {
          state.isLoading = true;
      });

      builder.addCase(fetchCommits.fulfilled, (state: CommitsState, { payload } : { payload: Array<CommitWrapper> | null }) => {
        const nextEntities: CommitsState['entities'] = {};
        const nextIds: CommitsState['ids'] = [];

        payload?.forEach(commit => {
          nextIds.push(commit.sha);
          nextEntities[commit.sha] = commit;
        });

        state.ids = nextIds;
        state.entities = nextEntities;
        state.isLoading = false;
      });

      // todo: missing error handling for the component render!!! as it is, it will display an endless loading
      builder.addCase(fetchCommits.rejected, (state: CommitsState) => {
        state.isLoading = false;
      });
  }
});

export const selectCommits = (state: RootState): CommitsState => state.commits;

export default commitsSlice.reducer;