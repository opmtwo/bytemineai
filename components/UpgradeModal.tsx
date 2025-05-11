import { CSSProperties, useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { Contact } from '../types';
import { arrayToCsv, download } from '../utils/helper-utils';
import Card from './cards/Card';
import CardTitle from './CardTitle';
import ExportContactRadio from './ExportContactRadio';
import FormButton from './form/FormButton';
import IconClose from './icons/IconClose';
import Modal from './modals/Modal';
import Slot from './Slot';
import EmailStatusIndicator from './EmailStatusIndicator';
import { atDataCatchAllEmailCodes, atDataValidEmailCodes, exportLabels, keysToExport } from '../consts';
import { getEmailValidityStatus } from '../utils/contact-utilsx';
import IconUnlock from './icons/IconUnlock';
import { useRouter } from 'next/router';
import FormButtonNew from './form/FormButtonNew';

const UpgradeModal = ({ contacts, isActive, onCancel }: { contacts: Contact[]; isActive: boolean; onCancel: () => void }) => {
	const [exportType, setExportType] = useState<'valid' | 'catchAll' | 'all'>('all');
	const [isBusy, setIsBusy] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!isActive) {
			return;
		}
		// handleSubmit();
	}, [isActive]);


	const handleSubmit = async () => {
		setIsBusy(true);

		await router.push({ pathname: '/account-settings/subscription-billing/plan' });

		setIsBusy(false);
		//onSubmit && onSubmit();
	};

	const indicatorStyles: CSSProperties = {
		position: 'absolute',
		top: 10,
		right: 5,
	};

	return (
		<Modal isActive={isActive} onCancel={onCancel}>
			<Card>
				<Slot slot="header">
					<CardTitle>Unlock Full Access</CardTitle>
					<span className="is-clickable" onClick={onCancel}>
						<IconClose />
					</span>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<div className="columns is-mobile">

							<div className="m-6">
								<div className="m-6 is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
									<div className="nymbl-circle">
										<IconUnlock />
									</div>
								</div>
								<div className="mx-6 is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
									<span className="is-size-6  has-text-centered my-4">Sorry, free accounts are limited to prevent abuse and improve performance. Upgrade to get full access with more credits and unlimited searches.</span>
								</div>
							</div>
						</div>
					</div>
				</Slot>
				<Slot slot="footer">
					<span className="is-flex-grow-1 has-text-weight-normal">{/* Up to 10 credits will be used */}</span>
					<div className="mr-5">
						<FormButtonNew type="button" onClick={handleSubmit} disabled={isBusy} loading={isBusy}>
							View Plans
						</FormButtonNew>
					</div>
					<FormButtonNew type="button" variant="active" onClick={handleSubmit} disabled={isBusy} loading={isBusy}>
						Upgrade
					</FormButtonNew>
				</Slot>
			</Card>
		</Modal>
	);
};

export default UpgradeModal;
