import * as React from 'react';
import Card from '../../cards/Card';
import IconClose from '../../icons/IconClose';
import IconTick from '../../icons/IconTick';
import Slot from '../../Slot';
import styles from './notification-popup.module.css';
const NotificationPopup = ({
  message,
  addContact,
  total,
  status,
}: {
  message: string;
  addContact: number;
  total: number;
  status: string;
}) => {
  let progress = (addContact / total) * 100;
  return (
    <div className='columns' style={{ width: '100%' }}>
      <div className='column'>
        <Card>
          <Slot slot='header'>
            <h2>{message}</h2>
            <span>
              <IconClose />
            </span>
          </Slot>
          <Slot slot='body'>
            <div style={{ padding: '1rem' }}>
              <progress
                className='progress is-primary'
                value={progress}
                max='100'
                style={{ height: '5px', marginBottom: '1rem' }}
              >
                15%
              </progress>
              <span style={{ color: 'black' }}>
                {status} <IconTick className={styles.iconTick} />
              </span>
            </div>
          </Slot>
        </Card>
      </div>
    </div>
  );
};

export default NotificationPopup;
