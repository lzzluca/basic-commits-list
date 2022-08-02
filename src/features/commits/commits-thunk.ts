import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../../constants';
import {Octokit} from '@octokit/core';

export const fetchCommits = createAsyncThunk(
  'commits/fetchAllCommits',
  async () => {
    // todo: change repo! this is just a debug purpose one
    // todo: paginate this! it could be maaaany commits available
    const result = await new Octokit().request(`GET ${API_URL}`, {
      headers: {
        // todo: move me!!!
        authorization: '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'
      },
    })
    
    console.log('log octo\'s result', result);
    return result.data;
});