import React, { FC } from 'react';
import styles from './NotificationList.module.scss';

interface NotificationListProps {}

const NotificationList: FC<NotificationListProps> = () => (
  <div className={styles.NotificationList}>
    NotificationList Component
  </div>
);

export default NotificationList;
