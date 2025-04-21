import moment from 'moment';
import Auth from '@aws-amplify/auth';
import { motion } from 'framer-motion';
import { UserAttributes } from '../types';
import FormButton from './form/FormButton';
import React, { useState } from 'react';
import DeleteConfirm from './DeleteConfirm';
import { formatDate } from '../utils/helper-utils';
import IconEdit from './icons/IconEdit';
import IconDelete from './icons/IconDelete';
import IconReset from './icons/IconReset';
import LoaderFullscreen from './LoaderFullscreen';
import ErrorNotificaition from './notifications/ErrorNotification';
import Message from './Message';

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
	const [isPasswordResetModalActive, setIsPasswordResetModalActive] = useState(false);
	const [error, setError] = useState<Error>();
	const [isBusy, setIsBusy] = useState(false);

	const onConfirmDelete = () => setIsConfirmModalActive(true);

	const onConfirmCancel = () => setIsConfirmModalActive(false);

	const handleEdit = () => {
		onEdit(user.sub);
	};

	const handleDelete = () => {
		setIsConfirmModalActive(false);
		onDelete(user.sub);
	};

	const onPasswordReset = () => {
		setError(undefined);
		setIsPasswordResetModalActive(true);
	};

	const onPasswordResetSubmit = async () => {
		setIsBusy(true);
		try {
			await Auth.forgotPassword(user.sub);
			setError(
				new Error(
					`Password has been reset. A new temporary password has been sent to the registered email address ${user.email}`
				)
			);
			setIsPasswordResetModalActive(false);
		} catch (err) {
			setError(err);
		}
		setIsBusy(false);
	};

	const onPasswordResetCancel = () => {
		setIsPasswordResetModalActive(false);
		setError(undefined);
	};

	const counterId = <span>{(index + 1).toString().padStart(6, '0')}</span>;

	const fullName = (
		<span className="has-text-weight-normal">
			{user.given_name} {user.family_name}
		</span>
	);

	const userRole = <span className="has-text-primary">{user['custom:role']}</span>;

	const lastLogin = (
		<span className="has-text-weight-normal">
			Last log in on
			<br />
			{formatDate(user['custom:last_login_at'])}
		</span>
	);

	const createdAt = (
		<span className="has-text-weight-normal">
			Created on
			<br />
			{formatDate(user['custom:created_at'])}
		</span>
	);

	const controls = (
		<>
			<FormButton
				onClick={onPasswordReset}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconReset />}
				size="is-small"
			/>
			<FormButton
				className="ml-3"
				onClick={handleEdit}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconEdit />}
				size="is-small"
			/>
			<FormButton
				className="ml-3"
				onClick={onConfirmDelete}
				variant={['is-icon', 'is-outlined', 'is-rounded']}
				icon={<IconDelete />}
				color="is-danger"
				size="is-small"
			/>
		</>
	);

	const errorInfo = error ? (
		<Message color="is-info" size="is-normal">
			{error?.message}
		</Message>
	) : null;

	const dialogs = (
		<>
			<DeleteConfirm
				title="Delete User"
				msg="Are you sure that you would like to delete this user?"
				isActive={isConfirmModalActive}
				onCancel={onConfirmCancel}
				onSubmit={handleDelete}
			/>
			<DeleteConfirm
				title="Reset Password"
				msg="Are you sure that you would like to reset password for this user?"
				submitLabel="Yes, Reset"
				cancelLabel="No, Exit"
				isActive={isPasswordResetModalActive}
				onCancel={onPasswordResetCancel}
				onSubmit={onPasswordResetSubmit}
			>
				<ErrorNotificaition error={error} />
			</DeleteConfirm>
		</>
	);

	const userLoader = isBusy ? <LoaderFullscreen /> : null;

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
							<div className="column is-2-mobile is-3-tablet has-text-right has-text-left-tablet">
								{userRole}
							</div>
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
