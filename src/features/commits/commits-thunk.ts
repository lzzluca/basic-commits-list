import { createAsyncThunk } from '@reduxjs/toolkit'
import { Octokit } from '@octokit/core';
import { API_URL, TOKEN } from '../../constants';

export const fetchCommits = createAsyncThunk(
  'commits/fetchAllCommits',
  async () => {
    // todo: paginate this! it could be maaaany commits available
    const result = await new Octokit().request(`GET ${API_URL}`, {
      headers: {
        authorization: TOKEN
      },
    })
    
    return result.data;
});