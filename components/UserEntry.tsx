import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useState } from 'react';

import Auth from '@aws-amplify/auth';

import { useCrudContext } from '../providers/crud-provider';
import { IBytemineUser, UserAttributes } from '../types';
import { formatDate } from '../utils/helper-utils';
import DeleteConfirm from './DeleteConfirm';
import FormButton from './form/FormButton';
import IconDelete from './icons/IconDelete';
import IconEdit from './icons/IconEdit';
import IconReset from './icons/IconReset';
import LoaderFullscreen from './LoaderFullscreen';
import Message from './Message';
import ErrorNotificaition from './notifications/ErrorNotification';

const UserEntry = ({ index, user, isListMode = false }: { index: number; user: IBytemineUser; isListMode?: boolean }) => {
	// const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);
	// const [isPasswordResetModalActive, setIsPasswordResetModalActive] = useState(false);
	// const [error, setError] = useState<Error>();
	// const [isBusy, setIsBusy] = useState(false);

	// const onConfirmDelete = () => setIsConfirmModalActive(true);

	// const onConfirmCancel = () => setIsConfirmModalActive(false);

	// const handleEdit = () => {
	// 	onEdit(user.sub);
	// };

	// const handleDelete = () => {
	// 	setIsConfirmModalActive(false);
	// 	onDelete(user.sub);
	// };

	// const onPasswordReset = () => {
	// 	setError(undefined);
	// 	setIsPasswordResetModalActive(true);
	// };

	// const onPasswordResetSubmit = async () => {
	// 	setIsBusy(true);
	// 	try {
	// 		await Auth.forgotPassword(user.sub);
	// 		setError(
	// 			new Error(
	// 				`Password has been reset. A new temporary password has been sent to the registered email address ${user.email}`
	// 			)
	// 		);
	// 		setIsPasswordResetModalActive(false);
	// 	} catch (err) {
	// 		setError(err);
	// 	}
	// 	setIsBusy(false);
	// };

	// const onPasswordResetCancel = () => {
	// 	setIsPasswordResetModalActive(false);
	// 	setError(undefined);
	// };

	const {
		error: userError,
		isBusy: userIsBusy,
		onConfirmOpen: userOnConfirmOpen,
		onConfirmCancel: userOnConfirmCancel,
		onEdit: userOnEdit,
		onDelete: userOnDelete,
		onSelect: userOnSelect,
	} = useCrudContext<IBytemineUser>();

	const handleDelete = () => {
		const onSubmit = () => async () => {
			await userOnDelete(user.id, {}, {}, {});
			window.dispatchEvent(new Event('logs.refresh'));
		};
		const onCancel = () => async () => {
			await userOnConfirmCancel();
			window.dispatchEvent(new Event('logs.refresh'));
		};
		userOnConfirmOpen('Delete seeding mailbox?', 'Are you sure you want to delete this seeding mailbox? This can not be undone!', onSubmit, onCancel);
	};

	const handleEdit = () => {
		userOnEdit(user.id);
	};

	const handleSelect = (isSelected: boolean) => {
		userOnSelect(user.id, isSelected);
	};

	const counterId = <span>{(index + 1).toString().padStart(6, '0')}</span>;

	const fullName = (
		<span className="has-text-weight-normal">
			{user.givenName} {user.familyName}
		</span>
	);

	const userRole = <span className="has-text-primary">{user.role}</span>;

	const lastLogin = (
		<span className="has-text-weight-normal">
			Last log in on
			<br />
			{/* {formatDate(user.lastLoginAt)} */}
		</span>
	);

	const createdAt = (
		<span className="has-text-weight-normal">
			Created on
			<br />
			{formatDate(user.createdAt)}
		</span>
	);

	const controls = user?.role === 'Admin' ? null : (
		<>
			{/* <FormButton
				onClick={onPasswordReset}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconReset />}
				size="is-small"
			/> */}
			{/* <FormButton className="ml-3" onClick={handleEdit} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconEdit />} size="is-small" />
			<FormButton
				className="ml-3"
				onClick={handleDelete}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconDelete />}
				color="is-danger"
				size="is-small"
			/> */}
			<span className="is-clickable icon-text" onClick={handleDelete}>
				<span className="icon">
					<IconDelete width={24} />
				</span>
			</span>
			<span className="is-clickable icon-text" onClick={handleEdit}>
				<span className="icon">
					<IconEdit width={24} />
				</span>
			</span>
		</>
	);

	const errorInfo = userError ? (
		<Message color="is-info" size="is-normal">
			{userError?.message}
		</Message>
	) : null;

	const dialogs = (
		<>
			{/* <DeleteConfirm
				title="Delete User"
				msg="Are you sure that you would like to delete this user?"
				isActive={isConfirmModalActive}
				onCancel={onConfirmCancel}
				onSubmit={handleDelete}
			/> */}
			{/* <DeleteConfirm
				title="Reset Password"
				msg="Are you sure that you would like to reset password for this user?"
				submitLabel="Yes, Reset"
				cancelLabel="No, Exit"
				isActive={isPasswordResetModalActive}
				onCancel={onPasswordResetCancel}
				onSubmit={onPasswordResetSubmit}
			>
				<ErrorNotificaition error={error} />
			</DeleteConfirm> */}
		</>
	);

	const userLoader = userIsBusy ? <LoaderFullscreen /> : null;

	if (isListMode) {
		return (
			<>
				{errorInfo ? (
					<tr>
						<td colSpan={6}>{errorInfo}</td>
					</tr>
				) : null}
				<tr>
					<td>
						{counterId}
						{dialogs}
						{userLoader}
					</td>
					<td>{fullName}</td>
					<td>{userRole}</td>
					<td>{lastLogin}</td>
					<td>{createdAt}</td>
					<td className="action-buttons">{controls}</td>
				</tr>
			</>
		);
	}

	return (
		<>
			<motion.div layout className="panel-block is-block">
				{errorInfo}
				<div className="columns is-mobile is-multiline is-align-items-center">
					<div className="column is-12-mobile is-5-tablet">
						<div className="columns is-mobile is-align-items-center">
							<div className="column is-5-mobile is-4-tablet">{counterId}</div>
							<div className="column is-5-mobile is-4-tablet">{fullName}</div>
							<div className="column is-2-mobile is-3-tablet has-text-right has-text-left-tablet">{userRole}</div>
						</div>
					</div>
					<div className="column is-12-mobile is-7-tablet">
						<div className="columns is-mobile is-align-items-center">
							<div className="column is-5">{lastLogin}</div>
							<div className="column is-5">{createdAt}</div>
							<div className="column is-2 is-flex is-justify-content-flex-end">{controls}</div>
						</div>
					</div>
				</div>
			</motion.div>
			{dialogs}
			{userLoader}
		</>
	);
};

export default UserEntry;
