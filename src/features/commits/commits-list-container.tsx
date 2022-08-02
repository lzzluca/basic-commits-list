import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCommits } from './commits-slice';
import CommitsList from './commits-list';
import styles from './commits.module.css';

const MoviesListContainer = () => {
  const { entities, ids, isLoading } = useAppSelector(selectCommits);
  // all commits as list todo: add a filter to search the commits!
  const allCommits = ids.map(id => entities[id]);

  return (
      <div className={styles['commits-list-wrapper']}>
        {isLoading ? <p>Loading...</p> : null}
        {!isLoading && allCommits.length === 0 ? <p>No commits added yet</p> : null}
        {!isLoading && allCommits.length > 0 ? <CommitsList commits={allCommits} /> : null}
      </div>
  );
}

export default MoviesListContainer;