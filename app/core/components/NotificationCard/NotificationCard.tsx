import React, { FC } from 'react';
import styles from './NotificationCard.module.scss';

interface NotificationCardProps {}

const NotificationCard: FC<NotificationCardProps> = () => (
  <div className={styles.NotificationCard}>
    NotificationCard Component
  </div>
);

export default NotificationCard;
