import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../providers/auth-data-provider';
import { getDisplayTime } from '../utils/helper-utils';
import { EmailAccountModel } from './../types';
import DeleteConfirm from './DeleteConfirm';
import FormButton from './form/FormButton';
import IconArrowRight from './icons/IconArrowRight';
import IconDelete from './icons/IconDelete';
import FormButtonNew from './form/FormButtonNew';

const EmailAccountEntry = ({
	item,
	isListMode,
	onActivate,
	onDelete,
	isBusy,
}: {
	item: EmailAccountModel;
	isListMode?: boolean;
	onActivate: Function;
	onDelete: Function;
	isBusy: boolean;
}) => {
	const [shouldConfirm, setShouldConfirm] = useState(false);

	const { user } = useAuthContext();
	const emailToken = user?.attributes['custom:connect_email_token'];

	const handleActivate = () => onActivate(item.id);

	const handleDelete = () => setShouldConfirm(true);

	const handleDeleteSubmit = () => {
		onDelete(item.id);
		setShouldConfirm(false);
	};

	const handleDeleteCancel = () => setShouldConfirm(false);

	const itemStatus =
		emailToken === item.token ? (
			<strong className="has-text-success">Active</strong>
		) : (
			<span className="has-text-grey">Idle</span>
		);

	const connectAt = <span className="has-text-weight-normal">Connected {getDisplayTime(item.createdAt)}</span>;

	const controls = (
		<>
			<FormButtonNew
				type="button"
				className="ml-3"
				onClick={handleActivate}
				variant="icon"
				icon={<IconArrowRight />}
				disabled={isBusy}
			/>
			<FormButtonNew
				type="button"
				className="ml-3"
				onClick={handleDelete}
				variant="icon"
				icon={<IconDelete />}
				disabled={isBusy}
			/>
		</>
	);

	const dialog = (
		<DeleteConfirm
			title="Delete Email Account"
			msg="Are you sure you want to delete this email account?"
			isActive={shouldConfirm}
			onSubmit={handleDeleteSubmit}
			onCancel={handleDeleteCancel}
		/>
	);

	if (isListMode) {
		return (
			<tr>
				<td>
					{item.email}
					{dialog}
				</td>
				<td>{itemStatus}</td>
				<td>{connectAt}</td>
				<td className="action-buttons">{controls}</td>
			</tr>
		);
	}

	return (
		<>
			<motion.div layout className="panel-block is-block">
				<div className="columns is-mobile is-align-items-center">
					<div className="column is-4 is-word-break-break-all">{item.email}</div>
					<div className="column is-3">{itemStatus}</div>
					<div className="column is-3">{connectAt}</div>
					<div className="column is-2 is-flex is-justify-content-flex-end action-buttons">{controls}</div>
				</div>
			</motion.div>
			{dialog}
		</>
	);
};

export default EmailAccountEntry;
