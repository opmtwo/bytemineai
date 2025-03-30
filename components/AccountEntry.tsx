import moment from 'moment';
import { motion } from 'framer-motion';
import { UserAttributes } from '../types';
import FormButton from './form/FormButton';
import { useState } from 'react';
import DeleteConfirm from './DeleteConfirm';
import { formatDate, timestampToMoment } from '../utils/helper-utils';
import Anchor from './Anchor';

const UserEntry = ({
	index,
	user,
	isListMode = false,
	onEdit,
	onDelete,
}: {
	index: number;
	user: UserAttributes;
	isListMode?: boolean;
	onEdit: Function;
	onDelete: Function;
}) => {
	const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);

	const onConfirmDelete = () => setIsConfirmModalActive(true);

	const onConfirmCancel = () => setIsConfirmModalActive(false);

	const handleEdit = () => {
		onEdit(user.sub);
	};

	const handleDelete = () => {
		setIsConfirmModalActive(false);
		onDelete(user.sub);
	};

	const url = `/admin-panel/accounts/${user.sub}`;

	const name = <span>{user.email}</span>;

	const given_name = <span>{user.given_name}</span>;
	const family_name = <span>{user.family_name}</span>;

	const counterId = <span>{(index + 1).toString().padStart(6, '0')}</span>;

	const accountType = <span className="has-text-primary">{user['custom:account_type']}</span>;

	const lastLogin = (
		<span className="has-text-weight-normal">Last log in on {formatDate(user['custom:last_login_at'])}</span>
	);

	const createdAt = (
		<span className="has-text-weight-normal">Created on {formatDate(user['custom:created_at'])}</span>
	);

	const dialogs = (
		<>
			<DeleteConfirm
				title="Delete User"
				msg="Are you sure that you would like to delete this user?"
				isActive={isConfirmModalActive}
				onCancel={onConfirmCancel}
				onSubmit={handleDelete}
			/>
		</>
	);

	if (isListMode) {
		return (
			<tr className="is-relative">
				<td>
					{counterId}
					{dialogs}
					<Anchor href={url} className="is-overlay">
						<span></span>
					</Anchor>
				</td>
				<td>{name}</td>
				<td>{given_name} {family_name}</td>
				<td>{lastLogin}</td>
				<td align="right">{createdAt}</td>
			</tr>
		);
	}

	return (
		<>
			<motion.div layout className="panel-block is-block">
				<div className="columns is-mobile is-multiline is-align-items-center is-color-inherit" >
					<div className="column is-12-mobile is-6-tablet">
						<div className="columns is-mobile is-align-items-center">

							<div className="column is-6"><Anchor href={url}>{name}</Anchor></div>
							<div className="column is-4">{given_name} {family_name}</div>
						</div>
					</div>
					<div className="column is-12-mobile is-6-tablet">
						<div className="columns is-mobile is-align-items-center">

							<div className="column is-5 is-flex is-justify-content-flex-end">{lastLogin}</div>
							<div className="column is-5 is-flex is-justify-content-flex-end">{createdAt}</div>
							<div className="column is-2"><FormButton onClick={handleDelete} >Delete</FormButton></div>
						</div>
					</div>
				</div>

			</motion.div>
			{dialogs}
		</>
	);
};

export default UserEntry;
