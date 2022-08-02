import React from 'react';
import { Commit, CommitWrapper } from './commits-slice';
import styles from './commits.module.css';

const CommitsList = ({ commits: commitsWrappers = [] } : { commits: Array<CommitWrapper> }): JSX.Element | null => {
  console.log('log commits', commitsWrappers);
  
  return commitsWrappers.length === 0 ? null : (
    <ul>
      {commitsWrappers.map(({ commit, sha }: { commit: Commit; sha: CommitWrapper['sha']}) => (
        <li key={sha}>
          {commit.message}
          <div className={styles['commit-list-separator']} />
        </li>
      ))}
    </ul>
  );
}

export default CommitsList;