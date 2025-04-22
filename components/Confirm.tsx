import { ReactNode } from 'react';

import Card from './Card';
import CardTitle from './CardTitle';
import FormButtonNew from './form/FormButtonNew';
import IconNewClose from './icons/IconNewClose';
import Modal from './Modal';

const Confirm = ({
	isActive,
	title,
	msg,
	children,
	submitLabel = 'Yes, delete',
	cancelLabel = 'No, cancel',
	onSubmit,
	onCancel,
}: {
	isActive: boolean;
	title: string;
	msg: string;
	children?: ReactNode;
	submitLabel?: string;
	cancelLabel?: string;
	onSubmit: Function;
	onCancel: () => void;
}) => (
	<Modal isActive={isActive} onCancel={onCancel}>
		<Card card={{ className: 'box' }} footer={{ justifyContent: 'space-between' }}>
			<header>
				<CardTitle className="has-text-danger has-text-weight-bold">{title}</CardTitle>
				<span className="is-clickable" onClick={onCancel}>
					<IconNewClose width={16} />
				</span>
			</header>
			<main>
				<div className="panel-block is-block">
					<div className="columns is-mobile">
						<div className="column is-8">
							<p>{msg}</p>
							{children}
						</div>
					</div>
				</div>
			</main>
			<footer>
				<FormButtonNew variant="default" onClick={() => onCancel()}>{cancelLabel}</FormButtonNew>
				<FormButtonNew variant="active" onClick={() => onSubmit()}>{submitLabel}</FormButtonNew>
			</footer>
		</Card>
	</Modal>
);

export default Confirm;
