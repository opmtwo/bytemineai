import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useState } from 'react';

import { useCrudContext } from '../providers/crud-provider';
import { IBytemineUser } from '../types';
import { formatDate } from '../utils/helper-utils';
import IconNewEdit from './icons/IconNewEdit';
import IconNewTrash from './icons/IconNewTrash';
import LoaderFullscreen from './LoaderFullscreen';
import Message from './Message';

const UserEntry = ({ index, user, isListMode = false }: { index: number; user: IBytemineUser; isListMode?: boolean }) => {
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
		userOnConfirmOpen('Delete user?', 'Are you sure you want to delete this user? This can not be undone!', onSubmit, onCancel);
	};

	const handleEdit = () => {
		userOnEdit(user.id);
	};

	const handleSelect = (isSelected: boolean) => {
		userOnSelect(user.id, isSelected);
	};

	const counterId = <span>{(index + 1).toString().padStart(3, '0')}</span>;

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

	const controls =
		user?.role === 'Admin' ? null : (
			<>
				<span className="is-clickable icon-text" onClick={handleDelete}>
					<span className="icon has-text-danger ml-3">
						<IconNewTrash width={12} stroke="currentColor" />
					</span>
				</span>
				<span className="is-clickable icon-text" onClick={handleEdit}>
					<span className="icon ml-3">
						<IconNewEdit width={12} />
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
					<div className="column is-10">
						<div className="columns is-mobile is-align-items-center">
							<div className="column is-3">
								<span className="is-inline-flex" style={{ width: 50 }}>
									{counterId}
								</span>
								<span>{fullName}</span>
							</div>
							<div className="column is-3">{user.role}</div>
							<div className="column is-3">{moment(user.createdAt).format('MM/DD/YYYY')}</div>
							<div className="column is-3">{user.lastLoginAt ? moment(user.lastLoginAt).format('ddd Do MMM, h:mm a') : null}</div>
						</div>
					</div>
					<div className="column is-2 is-flex is-justify-content-flex-end">{controls}</div>
				</div>
			</motion.div>
			{dialogs}
			{userLoader}
		</>
	);
};

export default UserEntry;
