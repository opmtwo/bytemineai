import { useState } from 'react';
import classNames from 'classnames';
import { ActionUnlock, Contact } from '../types';
import FormButton from './form/FormButton';

const ContactUnlock = ({
	onUnlock,
	contacts = [],
	displayItems = [],
}: {
	contacts?: Contact[];
	displayItems: Contact[];
	onUnlock: (type: ActionUnlock, targetIds: string[]) => void;
}) => {
	const [isActive, setIsActive] = useState(false);

	const onUnlockAll = () => {
		setIsActive(false);
		onUnlock(ActionUnlock.All, []);
	};

	const onUnlockCurrentPage = () => {
		setIsActive(false);
		onUnlock(
			ActionUnlock.CurrentPage,
			displayItems.map((item) => item.id)
		);
	};

	const onUnlockSelected = () => {
		setIsActive(false);
		onUnlock(
			ActionUnlock.Selected,
			contacts.filter((item) => item.isSelected === true).map((item) => item.id)
		);
	};

	const onToggle = () => setIsActive(!isActive);

	return (
		<>
			{isActive ? <div className="is-overlay" onClick={onToggle}></div> : null}
			<div className={classNames('dropdown', { 'is-active': isActive })}>
				<div className="dropdown-trigger">
					<FormButton onClick={onToggle} variant={['is-outlined']} className="mr-5" disabled={contacts.length === 0}>
						Unlock
					</FormButton>
				</div>
				<div className="dropdown-menu">
					<div className="dropdown-content is-borderless">
						<a className="dropdown-item py-3 px-5" onClick={onUnlockAll}>
							{ActionUnlock.All}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onUnlockCurrentPage}>
							{ActionUnlock.CurrentPage}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onUnlockSelected}>
							{ActionUnlock.Selected}
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactUnlock;
