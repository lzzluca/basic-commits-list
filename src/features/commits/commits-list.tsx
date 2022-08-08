import React from 'react';
import classnames from 'classnames';
import { CommitWrapper } from './commits-slice';
import styles from './commits.module.css';

interface CommitProps {
  author: CommitWrapper['author'];
  commit: CommitWrapper['commit'];
  node_id: CommitWrapper['node_id'];
}

const CommitsList = ({ commits: commitsWrappers = [] } : { commits: Array<CommitWrapper> }): JSX.Element | null => 
  commitsWrappers.length === 0 ? null : (
    <ul>
      {commitsWrappers.map(({ author, commit, node_id }: CommitProps) => (
        <li key={node_id} className={classnames(styles['commit'], styles['commit-message-truncated'])}>
          {commit.message}
          <p>{`${new Date(commit.author.date).toLocaleString()} by ${author.login}`}</p>
        </li>
      ))}
    </ul>
  );

export default CommitsList;