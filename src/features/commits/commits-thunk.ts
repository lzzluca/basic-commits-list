import { createAsyncThunk } from '@reduxjs/toolkit'
import { Octokit } from '@octokit/core';
import { API_URL, TOKEN } from '../../constants';

// returns a list of commits for the specified page, for master; there are max 30 commits per page
export const fetchCommits = createAsyncThunk(
  'commits/fetchAllCommits',
  async (pageNumber: number = 1) => {
    const response = await new Octokit().request(`GET ${API_URL}?page=${pageNumber}`, {
      headers: {
        authorization: TOKEN
      }
    });

    return response.data;
  }
);

// returns the total amount of commits for master
export const fetchTotalCountCommits = createAsyncThunk(
    'commits/fetchTotalCountCommits',
    async () => {
      const response = await new Octokit().request(`GET ${API_URL}?per_page=1&page=1`, {
        headers: {
          authorization: TOKEN
        },
      });
      
      // the total amount of commits is taken from a response's header
      return response.headers?.link?.split(";")[1].match(/.*page=(?<page_num>\d+)/)?.groups?.page_num;
  }
);