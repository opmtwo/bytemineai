import { ReactNode } from 'react';

import Card from '../../cards/Card';
import CardTitle from '../../CardTitle';
import IconClose from '../../icons/IconClose';
import Modal from '../../modals/Modal';
import Slot from '../../Slot';
import FormButtonNew from '../../form/FormButtonNew';

const ProspectWarningModel = ({
	isActive,
	title,
	msg,
	submitLabel = 'Yes, delete',
	cancelLabel = 'No, cancel',
	onReject,
	onCancel,
	onAllow,
}: {
	isActive: boolean;
	title: string;
	msg: string;
	children?: ReactNode;
	submitLabel?: string;
	cancelLabel?: string;
	onCancel: () => void;
	onAllow: () => void;
	onReject: () => void;
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
						</div>
					</div>
				</div>
			</Slot>
			<Slot slot="footer">
				<FormButtonNew onClick={onReject} className="mr-3">
					{cancelLabel}
				</FormButtonNew>
				<FormButtonNew onClick={onAllow} color="is-danger">
					{submitLabel}
				</FormButtonNew>
			</Slot>
		</Card>
	</Modal>
);

export default ProspectWarningModel;
