import React, { FC } from 'react';
import styles from './LoadingOverlay.module.scss';

interface LoadingOverlayProps {}

const LoadingOverlay: FC<LoadingOverlayProps> = () => (
  <div className={styles.LoadingOverlay}>
    LoadingOverlay Component
  </div>
);

export default LoadingOverlay;
