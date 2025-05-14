import classNames from 'classnames';
import { useState } from 'react';

import { atDataValidEmailCodes } from '../../../consts';
import { EmailAccountModel, IBytemineContact, SortData } from '../../../types';
import { toHttpsUrl } from '../../../utils/helper-utils';
import Anchor from '../../Anchor';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import ContactEmailStatus from '../../ContactEmailStatus';
import ContactIcon from '../../ContactIcon';
import ContactIcon2 from '../../ContactIcon2';
import FormButtonNew from '../../form/FormButtonNew';
import FormDoubleCheckbox from '../../form/FormDoubleCheckbox';
import IconNewCompany from '../../icons/IconNewCompany';
import IconNewDownload from '../../icons/IconNewDownload';
import IconNewEmail from '../../icons/IconNewEmail';
import IconNewFacebook from '../../icons/IconNewFacebook';
import IconNewJobTitle from '../../icons/IconNewJobTitle';
import IconNewLinkedin from '../../icons/IconNewLinkedin';
import IconNewPhone from '../../icons/IconNewPhone';
import IconNewPlusCircle from '../../icons/IconNewPlusCircle';
import IconNewUnlock from '../../icons/IconNewUnlock';
import Loader from '../../Loader';

const ProspectContactEntry = ({
	item,
	sortMap,
	emailAccounts = [],
	isLocked = false,
	isListMode = false,
	onSelect,
	onAdd,
	onDownload,
	onUnlock,
	isAudienceMember = false,
}: {
	item: IBytemineContact;
	sortMap: SortData[];
	emailAccounts: EmailAccountModel[];
	isLocked?: boolean;
	isListMode?: boolean;
	onSelect: (id: string, isChecked: boolean) => void;
	onAdd: (contact: IBytemineContact) => void;
	onDownload: (contact: IBytemineContact) => void;
	onUnlock: (contact: IBytemineContact) => void;
	isAudienceMember?: boolean;
}) => {
	const handleDownload = () => onDownload(item);

	const handleAdd = () => onAdd(item);

	const handleUnlock = () => onUnlock(item);

	const hasValidEmail = item.work_email ? true : false;
	const hasPersonalEmail = item.personal_email || item.personal_email2 ? true : false;
	const hasWorkPhone = item.direct_dial || item.work_number ? true : false;
	const hasMobilePhone = item.mobile_number ? true : false;
	const hasDirectDial = item.direct_dial ? true : false;
	const isCatchAll = !hasValidEmail && !hasDirectDial;

	const contactEmail = item.work_email || item.personal_email || item.personal_email2;
	const contactName = `${item.first_name} ${item.last_name}`;

	const itemCheckbox = (
		<FormDoubleCheckbox
			value={item.id}
			className="is-filter-checkbox"
			isChecked={item.isSelected}
			onChange={(isChecked: boolean) => {
				onSelect(item.pid, isChecked);
			}}
		/>
	);

	const info = (
		<div className="is-flex mr-auto">
			{!isAudienceMember ? <div className="field mr-2 mt-2">{itemCheckbox}</div> : null}
			<div>
				<h2 className="is-flex is-align-items-center title is-5 mb-3">
					<span className="is-flex is-align-items-center mr-2">
						{item.first_name} {item.last_name}
					</span>

					{item.linkedin_profile ? (
						<>
							<Anchor
								className="is-flex is-align-items-center mr-2"
								target="_blank"
								href={item.is_unlocked ? item.linkedin_profile : ''}
								onClick={(e) => {
									if (!item.is_unlocked) {
										e.preventDefault();
									}
								}}
							>
								<IconNewLinkedin width={16} />
							</Anchor>
						</>
					) : null}
					{item.facebook_profile ? (
						<>
							<Anchor
								className="is-flex is-align-items-center mr-2"
								target="_blank"
								href={item.is_unlocked ? item.facebook_profile : ''}
								onClick={(e) => {
									if (!item.is_unlocked) {
										e.preventDefault();
									}
								}}
							>
								<IconNewFacebook width={16} />
							</Anchor>
						</>
					) : null}
				</h2>
				<p className="is-flex is-flex-wrap-wrap is-align-items-center has-text-weight-medium mb-1">
					{item.job_title ? (
						<span className="is-flex is-align-items-center mr-2">
							<IconNewJobTitle width={16} />
							<span className="ml-1">{item.job_title}</span>
						</span>
					) : null}
					{item.company_name && item.company_domain ? (
						<Anchor
							href={item.is_unlocked ? toHttpsUrl(item.company_domain) : ''}
							target="_blank"
							className="is-flex is-align-items-center mr-2"
							onClick={(e) => {
								if (!item.is_unlocked) {
									e.preventDefault();
								}
							}}
						>
							<IconNewCompany width={16} />
							<span className="ml-1">{item.company_name}</span>
						</Anchor>
					) : null}
				</p>
				{item.is_unlocked ? (
					<p className="is-flex is-flex-wrap-wrap is-align-items-center has-text-weight-medium">
						{item.is_unlocked ? null : <span className="has-text-weight-normal mr-2">Contact:</span>}
						{item.is_unlocked ? (
							<>
								{item.direct_dial ? (
									<span className="is-flex is-align-items-center mr-2">
										<IconNewPhone width={16} />
										<span className="ml-1">{item.direct_dial}</span>
									</span>
								) : null}
								{item.mobile_number ? (
									<span className="is-flex is-align-items-center mr-2">
										<IconNewPhone width={16} />
										<span className="ml-1">{item.mobile_number}</span>
									</span>
								) : null}
								{item.work_email ? (
									<span className="is-flex is-align-items-center mr-2">
										<IconNewEmail width={16} />
										<span className="ml-1">{item.work_email}</span>
										<ContactEmailStatus statusCode={item.contact_email_status_code} />
									</span>
								) : null}
								{item.personal_email ? (
									<span className="is-flex is-align-items-center mr-2">
										<IconNewEmail width={16} />
										<span className="ml-1">{item.personal_email}</span>
										<ContactEmailStatus statusCode={item.personal_email_status_code} />
									</span>
								) : null}
							</>
						) : null}
					</p>
				) : null}
			</div>
		</div>
	);

	const domain = (
		<>
			{item.company_domain ? (
				<>
					<Anchor target="_blank" href={toHttpsUrl(item.company_domain)}>
						<span className="has-text-weight-normal">{item.company_name || item.company_domain}</span>
					</Anchor>
				</>
			) : (
				<>
					<span className="has-text-weight-normal">{item.company_name || item.company_domain}</span>
				</>
			)}
		</>
	);

	const unlocker = (
		<>
			<CardAnimatePresence isActive={item.isUnlocking ? true : false}>
				<div className="is-flex">
					<span className="mr-5">Veryfing</span>
					<Loader width={16} height={16} classNames="p-0" />
				</div>
			</CardAnimatePresence>
			<CardAnimatePresence isActive={!item.isUnlocking ? true : false}>
				<Anchor href="#" onClick={handleUnlock} className="has-text-primary">
					Unlock
				</Anchor>
			</CardAnimatePresence>
		</>
	);
	const phone = (
		<>
			{item.is_unlocked || isAudienceMember ? (
				<>
					{hasDirectDial ? (
						<div className="mb-2">
							<ContactIcon color="info" initial="C">
								<span className="has-text-weight-normal">{item.direct_dial}</span>
							</ContactIcon>
						</div>
					) : (
						<>
							{hasWorkPhone && !isAudienceMember ? (
								<div className="mb-2">
									<ContactIcon color="danger" initial="W">
										<span className="has-text-weight-normal">{item.work_number}</span>
									</ContactIcon>
								</div>
							) : null}
							{hasMobilePhone ? (
								<div className="mb-2">
									<ContactIcon color="dark" initial="C">
										<span className="has-text-weight-normal">{item.mobile_number}</span>
									</ContactIcon>
								</div>
							) : null}
						</>
					)}
				</>
			) : (
				unlocker
			)}
		</>
	);

	// the following lines of code have to duplicated in export contacts
	const isContactEmailValid = atDataValidEmailCodes.includes(parseInt(item.contact_email_status_code));

	const isPersonalEmailValid = atDataValidEmailCodes.includes(parseInt(item.personal_email_status_code));
	const isContactPersonalEmailValid = atDataValidEmailCodes.includes(parseInt(item.contact_personal_email_status_code));
	const isEmailValid = isContactEmailValid || isPersonalEmailValid || isContactPersonalEmailValid;

	const email = (
		<>
			{item.is_unlocked || isAudienceMember ? (
				<>
					{/* email is verified */}
					{item.is_email_verified === true ? (
						<>
							{hasValidEmail ? (
								<div className="mb-2">
									<ContactIcon2 initial="W" statusCode={parseInt(item.contact_email_status_code)}>
										<span className="has-text-weight-normal">{item.work_email}</span>
									</ContactIcon2>
								</div>
							) : null}
							{hasPersonalEmail ? (
								<div className="mb-2">
									<ContactIcon2 initial="P" statusCode={parseInt(item.personal_email_status_code)}>
										<span className="has-text-weight-normal">{item.personal_email}</span>
									</ContactIcon2>
								</div>
							) : null}
							{item.personal_email2 ? (
								<div className="mb-2">
									<ContactIcon2 initial="P" statusCode={parseInt(item.contact_personal_email_status_code)}>
										<span className="has-text-weight-normal">{item.personal_email2}</span>
									</ContactIcon2>
								</div>
							) : null}
						</>
					) : null}
					{/* email is not yet verified */}
					{item.is_email_verified !== true ? (
						<>
							{hasValidEmail ? (
								<div className="mb-2">
									<ContactIcon color="success" initial="W">
										<span className="has-text-weight-normal">{item.work_email}</span>
									</ContactIcon>
								</div>
							) : null}
							{hasPersonalEmail ? (
								<div className="mb-2">
									<ContactIcon color="warning" initial="P">
										<span className="has-text-weight-normal">{item.personal_email}</span>
									</ContactIcon>
								</div>
							) : null}
						</>
					) : null}
				</>
			) : (
				<>
					<CardAnimatePresence isActive={item.isUnlocking ? true : false}>
						<div className="is-flex">
							<span className="mr-5">Veryfing</span>
							<Loader width={16} height={16} classNames="p-0" />
						</div>
					</CardAnimatePresence>
					<CardAnimatePresence isActive={!item.isUnlocking ? true : false}>
						<Anchor href="#" onClick={handleUnlock} className="has-text-primary">
							Unlock
						</Anchor>
					</CardAnimatePresence>
				</>
			)}
		</>
	);

	const controls = (
		<>
			<FormButtonNew size="sm" variant="icon" className="ml-3" onClick={handleAdd}>
				<IconNewPlusCircle width={16} />
			</FormButtonNew>
			<FormButtonNew size="sm" variant="icon" className="ml-3" onClick={handleDownload}>
				<IconNewDownload width={16} />
			</FormButtonNew>
			{item.is_unlocked ? null : (
				<FormButtonNew size="sm" className="ml-3" onClick={handleUnlock} loading={item.isUnlocking}>
					<IconNewUnlock width={16} />
					<span>Unlock</span>
				</FormButtonNew>
			)}
		</>
	);

	if (isListMode) {
		return (
			<tr>
				{/* <td width="30%">
					{info}
					{composer}
				</td>
				<td>{domain}</td>
				<td>{email}</td>
				<td>{phone}</td>
				<td className="action-buttons">{controls}</td> */}
				<td className="action-select is-sticky">{itemCheckbox}</td>
				{sortMap.map((value, index) => {
					if (!item.is_unlocked && !isAudienceMember) {
						// item is locked - show the unlocker button for the specified keys
						if (['contactEmail', 'personalEmail', 'historicalEmails', 'contactPhone', 'companyPhone'].includes(value.id)) {
							return <td key={value.id}>{unlocker}</td>;
						}
					}
					if (item.is_email_verified && value.id === 'emailStatus') {
						return (
							<td key={value.id}>
								<ContactEmailStatus
									statusCode={item.contact_email_status_code || item.personal_email_status_code || item.contact_personal_email_status_code}
								/>
							</td>
						);
					}
					return <td key={value.id}>{(item as any)[value.id]}</td>;
				})}
				<td className="action-buttons is-sticky">{controls}</td>
			</tr>
		);
	}

	return (
		<div className={classNames('has-border has-radius p-5 mb-5')}>
			<div className="is-flex is-align-items-center is-justify-content-center">
				{info}
				{controls}
			</div>
		</div>
	);
};

export default ProspectContactEntry;
