import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './pagination.module.css';
import { fetchPage } from '../../features/commits/commits-thunk';
import { useAppDispatch } from '../../app/hooks';

const displayedItems = 10;
const shift = displayedItems/2;
const pagesRange = [...Array(displayedItems).keys()];

const Pagination = ({ pages, currentPage = 1 } : { pages: number; currentPage: number; }): JSX.Element | null => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pages >= displayedItems ? displayedItems : pages);
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const dispatch = useAppDispatch();

  const goRight = () => {
    let nextEnd = end;

    if(pages > end) {
      nextEnd = end + shift;
      
      if(nextEnd > pages) {
        nextEnd = pages;
      }
    }
      
    setStart(nextEnd - displayedItems >= 0 ? nextEnd - displayedItems : 0 );
    setEnd(nextEnd);
  };

  const goLeft = () => {
    let nextStart = start;

    if(start > 0) {
      nextStart = start - shift;
      
      if(nextStart < 0) {
        nextStart = 0;
      }
    }
      
    setStart(nextStart);
    setEnd(nextStart + displayedItems <= pages ? nextStart + displayedItems : pages);
  }
  
  const selectPage = (page: number) => {
    setSelectedPage(page);
    dispatch(fetchPage(page));
  };
  
  return pages === 0 ? null : (
    <span>
      <span className={styles['clickable']} onClick={goLeft}>{'<<'}</span>
        {pagesRange.map(page => {
          // Github counts pages starting from 1
          const currentPage = page + start + 1;

          const className = classnames(
            styles['page'],
            styles['clickable'],
            {
              [styles['selected']]: selectedPage === currentPage
            });

          return (
            <span className={className} onClick={() => selectPage(currentPage)}>
              {currentPage}
            </span>
          );
        }
      )}
      <span className={styles['clickable']} onClick={goRight}>{'>>'}</span>
    </span>
  );
}

export default Pagination;