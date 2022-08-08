import React from 'react';
import { CommitWrapper } from './commits-slice';
import styles from './commits.module.css';

const CommitsList = ({ commits: commitsWrappers = [] } : { commits: Array<CommitWrapper> }): JSX.Element | null => commitsWrappers.length === 0 ? null : (
  <ul>
    {commitsWrappers.map((commitWrapper: CommitWrapper) => {
      const { author, commit, node_id } = commitWrapper;

      return (
        <li key={node_id} className={styles['commit']}>
          {commit.message}
          <p>{`${new Date(commit.author.date).toLocaleString()} by ${author?.login}`}</p>
        </li>
      )
    })}
  </ul>
);

export default CommitsList;