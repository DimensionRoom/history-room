import React from 'react';
<<<<<<< HEAD
import styles from './ToastMessage.module.css';
=======
import styles from './ToastMessage.scss';
>>>>>>> 33a3d8ba9ae9f44ecd9e9d2b3bdc65d09334dc1b

interface ToastMessageProps {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, type }) => {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
};

export default ToastMessage;