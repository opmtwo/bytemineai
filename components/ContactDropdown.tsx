import { useState } from 'react';
import classNames from 'classnames';
import { ActionList, ActionSelect, Contact } from '../types';
import IconArrowDown from './icons/IconArrowDown';

const ContactDropdown = ({
  selectedAction = '',
  displayItems = [],
  onSelect,
}: {
  selectedAction: string;
  displayItems: Contact[];
  onSelect: (
    type: ActionSelect,
    targetIds: string[],
    actionType: string
  ) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  const onToggle = () => setIsActive(!isActive);

  const onSelectAll = () => {
    setIsActive(false);
    onSelect(ActionSelect.SelectAll, [], ActionList.All);
  };

  const onSelectCurrentPage = () => {
    setIsActive(false);
    onSelect(
      ActionSelect.SelectCurrentPage,
      displayItems.map((item) => item.id),
      ActionList.CurrentPage
    );
  };

  return (
    <>
      {isActive ? <div className='is-overlay' onClick={onToggle}></div> : null}
      <div className={classNames('dropdown', { 'is-active': isActive })}>
        <div className='dropdown-trigger is-flex is-justify-content-center is-align-items-center'>
          <IconArrowDown
            color='#979797'
            height={18}
            width={18}
            onClick={onToggle}
          />
        </div>
        <div className='dropdown-menu'>
          <div className='dropdown-content is-borderless'>
            <a
              className={classNames('dropdown-item py-3 px-5', {
                'is-active': selectedAction === ActionList.CurrentPage,
              })}
              onClick={onSelectCurrentPage}
            >
              {ActionSelect.SelectCurrentPage}
            </a>
            <a
              className={classNames('dropdown-item py-3 px-5', {
                'is-active': selectedAction === ActionList.All,
              })}
              onClick={onSelectAll}
            >
              {ActionSelect.SelectAll}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDropdown;
