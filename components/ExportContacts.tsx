import { sentenceCase } from 'change-case';
import { CSSProperties, useEffect, useState } from 'react';

import { atDataCatchAllEmailCodes, atDataValidEmailCodes, exportLabels, keysToExport } from '../consts';
import { IBytemineContact } from '../types';
import { getEmailValidityStatus } from '../utils/contact-utilsx';
import { arrayToCsv, download } from '../utils/helper-utils';
import Card from './cards/Card';
import CardTitle from './CardTitle';
import ExportContactRadio from './ExportContactRadio';
import FormButtonNew from './form/FormButtonNew';
import IconClose from './icons/IconClose';
import IconNewExportAll from './icons/IconNewExportAll';
import IconNewExportCircle from './icons/IconNewExportCircle';
import IconNewExportValid from './icons/IconNewExportValid';
import IconNewExportValidAll from './icons/IconNewExportValidAll';
import Modal from './modals/Modal';
import Slot from './Slot';

const ExportContacts = ({
	contacts,
	isActive,
	onSubmit,
	onCancel,
}: {
	contacts: IBytemineContact[];
	isActive: boolean;
	onSubmit: () => void;
	onCancel: () => void;
}) => {
	const [exportType, setExportType] = useState<'valid' | 'catchAll' | 'all'>('all');
	const [isBusy, setIsBusy] = useState(false);

	useEffect(() => {
		if (!isActive) {
			return;
		}
		// handleSubmit();
	}, [isActive]);

	/**
	 * @summary
	 * Filter the list of contacts to export
	 *
	 * @note
	 * the following lines of code have to duplicated in contact entry
	 *
	 * @returns {boolean}
	 */
	const getExportContacts = () =>
		contacts.filter((item) => {
			// export all
			if (exportType === 'all') {
				return true;
			}

			// catch all
			if (exportType === 'catchAll') {
				return (
					atDataCatchAllEmailCodes.includes(parseInt(item.contact_email_status_code)) ||
					atDataCatchAllEmailCodes.includes(parseInt(item.personal_email_status_code)) ||
					atDataCatchAllEmailCodes.includes(parseInt(item.contact_personal_email_status_code))
				);
			}

			// export valid only
			return (
				atDataValidEmailCodes.includes(parseInt(item.contact_email_status_code)) ||
				atDataValidEmailCodes.includes(parseInt(item.personal_email_status_code)) ||
				atDataValidEmailCodes.includes(parseInt(item.contact_personal_email_status_code))
			);
		});

	const getExportList = () => {
		let items: any[] = getExportContacts();
		let exportList = items.map((item) => {
			const newItem: any = {};
			keysToExport.map((key) => {
				newItem[key] = item[key];
			});
			newItem.emailStatus = getEmailValidityStatus(item);
			return newItem;
		});
		if (exportList.length) {
			const labels = keysToExport.map((key) => {
				const label = (exportLabels as any)[key];
				if (label) {
					return label;
				}
				return sentenceCase(key);
			});
			exportList.unshift(labels as any);
		}
		return exportList;
	};

	const handleSubmit = () => {
		setIsBusy(true);
		const items = getExportList();
		const str = arrayToCsv(items).replace(/,/g, '&&&').replace(/\|/g, ',').replace(/&&&/g, '|');
		download(str, `contacts-${new Date().toISOString()}.csv`, 'data:text/csv');
		setIsBusy(false);
		onSubmit && onSubmit();
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
					<CardTitle>
						<span className="is-flex is-align-items-center">
							<IconNewExportCircle width={48} />
							<span className="ml-5">
								Export Contacts to CSV
								<br />
								<span className="is-size-7 has-text-weight-light">Quickly Export Your Contacts to CSV for Easy Access & Use.</span>
							</span>
						</span>
					</CardTitle>
					<span className="is-clickable" onClick={onCancel}>
						<IconClose />
					</span>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<div className="columns is-mobile">
							<div className="column is-4 is-flex">
								<ExportContactRadio name="exportType" value="valid" checkedValue={exportType} onSelect={setExportType}>
									<IconNewExportValid width={48} />
									<div className="has-text-weight-bold mb-3">Valid</div>
									<div className="has-text-weight-light has-text-dark is-size-7">Export Contacts With Valid Email Only.</div>
								</ExportContactRadio>
							</div>
							<div className="column is-4 is-flex">
								<ExportContactRadio name="exportType" value="catchAll" checkedValue={exportType} onSelect={setExportType}>
									<IconNewExportValidAll width={48} />
									<div className="has-text-weight-bold mb-3">Valid + Accept All</div>
									<div className="has-text-weight-light has-text-dark is-size-7">Export contacts with valid and catch all emails.</div>
								</ExportContactRadio>
							</div>
							<div className="column is-4 is-flex">
								<ExportContactRadio name="exportType" value="all" checkedValue={exportType} onSelect={setExportType}>
									<IconNewExportAll width={48} />
									<div className="has-text-weight-bold mb-3">All Contacts</div>
									<div className="has-text-weight-light has-text-dark is-size-7">Export all selected contacts.</div>
								</ExportContactRadio>
							</div>
						</div>
					</div>
				</Slot>
				<Slot slot="footer">
					<span className="is-flex-grow-1 has-text-weight-normal">{/* Up to 10 credits will be used */}</span>
					<FormButtonNew type="button" variant="active" onClick={handleSubmit} disabled={isBusy} loading={isBusy}>
						Export
					</FormButtonNew>
				</Slot>
			</Card>
		</Modal>
	);
};

export default ExportContacts;
