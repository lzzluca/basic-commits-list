import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCommits } from './commits-slice';
import CommitsList from './commits-list';
import styles from './commits.module.css';
import LoadingOverlay from '../../components-library/loading-overlay';
import Pagination from '../../components-library/pagination';
import { COMMITS_PER_PAGE } from '../../constants';

const CommitsListContainer = () => {
  const { entities, ids, isLoading, counterTotalCommitsOnRepo, currentPageIndex } = useAppSelector(selectCommits);
  // all commits as list todo: add a filter to search the commits!
  const allCommits = ids.map(id => entities[id]);
  const pages = Math.ceil(counterTotalCommitsOnRepo/COMMITS_PER_PAGE);
  
  return (
      <div className={styles['commits-list-wrapper']}>
        {isLoading ? <LoadingOverlay /> : null}
        {allCommits.length === 0 ? <p>No commits added yet</p> : null}
        {allCommits.length > 0 ? <CommitsList commits={allCommits} /> : null}
        {counterTotalCommitsOnRepo > -1 ? <Pagination pages={pages} currentPage={currentPageIndex} /> : null}
      </div>
  );
}

export default CommitsListContainer;