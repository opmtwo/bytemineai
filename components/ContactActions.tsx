import { useState } from 'react';
import classNames from 'classnames';
import { ActionAddToList, ActionExport, ActionSelect, Contact, SortData } from '../types';
import FormButton from './form/FormButton';

const ContactActions = ({
	contacts = [],
	displayItems = [],
	sortMap,
	onAddToList,
	onExport,
	onSelect,
}: {
	contacts: Contact[];
	displayItems: Contact[];
	sortMap?: SortData[];
	onAddToList: (type: ActionAddToList, targetIds: string[]) => void;
	onExport: (type: ActionExport, targetIds: string[], sortMap?: SortData[]) => void;
	onSelect: (type: ActionSelect, targetIds: string[]) => void;
}) => {
	const [isActive, setIsActive] = useState(false);

	const onExportAll = () => {
		setIsActive(false);
		onExport(ActionExport.All, [], sortMap);
	};

	const onExportCurrentPage = () => {
		setIsActive(false);
		onExport(
			ActionExport.CurrentPage,
			displayItems.map((item) => item.id),
			sortMap
		);
	};

	const onExportSelected = () => {
		setIsActive(false);
		onExport(
			ActionExport.Selected,
			contacts.filter((item) => item.isSelected === true).map((item) => item.id),
			sortMap
		);
	};

	const onAddAllToList = () => {
		setIsActive(false);
		onAddToList(ActionAddToList.All, []);
	};

	const onAddCurrentPageToList = () => {
		setIsActive(false);
		onAddToList(
			ActionAddToList.CurrentPage,
			displayItems.map((item) => item.id)
		);
	};

	const onAddSelectedToList = () => {
		setIsActive(false);
		onAddToList(
			ActionAddToList.Selected,
			contacts.filter((item) => item.isSelected === true).map((item) => item.id)
		);
	};

	const onSelectAll = () => {
		setIsActive(false);
		onSelect(ActionSelect.SelectAll, []);
	};

	const onSelectCurrentPage = () => {
		setIsActive(false);
		onSelect(
			ActionSelect.SelectCurrentPage,
			displayItems.map((item) => item.id)
		);
	};

	const onToggle = () => setIsActive(!isActive);

	const selectedItems = contacts.filter((item) => item.isSelected);

	return (
		<>
			{isActive ? <div className="is-overlay" onClick={onToggle}></div> : null}
			<div className={classNames('dropdown', { 'is-active': isActive })}>
				<div className="dropdown-trigger">
					<FormButton onClick={onToggle} variant={['is-outlined']} color="is-dark" className="mr-5" disabled={contacts.length === 0}>
						Actions {selectedItems.length ? `(${selectedItems.length})` : ''}
					</FormButton>
				</div>
				<div className="dropdown-menu">
					<div className="dropdown-content is-borderless">
						<a className="dropdown-item py-3 px-5" onClick={onExportAll}>
							{ActionExport.All}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onExportCurrentPage}>
							{ActionExport.CurrentPage}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onExportSelected}>
							{ActionExport.Selected}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onAddAllToList}>
							{ActionAddToList.All}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onAddCurrentPageToList}>
							{ActionAddToList.CurrentPage}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onAddSelectedToList}>
							{ActionAddToList.Selected}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onSelectAll}>
							{ActionSelect.SelectAll}
						</a>
						<a className="dropdown-item py-3 px-5" onClick={onSelectCurrentPage}>
							{ActionSelect.SelectCurrentPage}
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactActions;
