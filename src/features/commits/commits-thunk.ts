import { createAsyncThunk } from '@reduxjs/toolkit'
import { Octokit } from '@octokit/core';
import { API_URL, TOKEN } from '../../constants';

// returns a list of commits for the specified page, for master; there are max 30 commits per page
export const fetchPage = createAsyncThunk(
  'commits/fetchPage',
  async (pageIndex: number = 1) => {
    const response = await new Octokit().request(`GET ${API_URL}?page=${pageIndex}`, {
      headers: {
        authorization: TOKEN
      }
    });
    
    return { list: response.data, pageIndex };
  }
);

// returns the total amount of commits for master as number
export const fetchTotalCount = createAsyncThunk(
    'commits/fetchTotalCount',
    async () => {
      const response = await new Octokit().request(`GET ${API_URL}?per_page=1&page=1`, {
        headers: {
          authorization: TOKEN
        },
      });
      
      // the total amount of commits is taken from a response's header
      return Number(response.headers?.link?.split(";")[1].match(/.*page=(?<page_num>\d+)/)?.groups?.page_num);
  }
);