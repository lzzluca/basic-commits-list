import React from 'react';
import styles from './loading-overlay.module.css';

const LoadingOverlay = () => (
    <>
        <div className={styles['loading-text']}>Loading...</div>
        <div className={styles['loading-overlay']}></div>
    </>
);

export default LoadingOverlay;