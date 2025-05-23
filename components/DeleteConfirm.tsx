import { ReactNode } from 'react';
import Modal from './modals/Modal';
import Card from './cards/Card';
import Slot from './Slot';
import CardTitle from './CardTitle';
import FormButton from './form/FormButton';
import IconClose from './icons/IconClose';
import FormButtonNew from './form/FormButtonNew';

const DeleteConfirm = ({
	isActive,
	title,
	msg,
	children,
	loading = false,
	submitLabel = 'Yes, delete',
	cancelLabel = 'No, cancel',
	onSubmit,
	onCancel,
}: {
	isActive: boolean;
	title: string;
	msg: string;
	children?: ReactNode;
	loading?: boolean;
	submitLabel?: string;
	cancelLabel?: string;
	onSubmit: Function;
	onCancel: () => void;
}) => (
	<Modal isActive={isActive} onCancel={onCancel}>
		<Card>
			<Slot slot="header">
				<CardTitle className="has-text-danger">{title}</CardTitle>
				<span className="is-clickable" onClick={onCancel}>
					<IconClose />
				</span>
			</Slot>
			<Slot slot="body">
				<div className="panel-block is-block">
					<div className="columns is-mobile">
						<div className="column is-8">
							<p>{msg}</p>
							{children}
						</div>
					</div>
				</div>
			</Slot>
			<Slot slot="footer">
				<FormButtonNew type="button" onClick={onCancel} className="mr-3">
					{cancelLabel}
				</FormButtonNew>
				<FormButtonNew type="button" variant="active" onClick={() => onSubmit()} color="is-danger" loading={loading}>
					{submitLabel}
				</FormButtonNew>
			</Slot>
		</Card>
	</Modal>
);

export default DeleteConfirm;
