import { MouseEvent, useEffect, useState } from 'react';

import { atDataValidEmailCodes } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { EmailAccountModel, IBytemineContact, SortData } from '../../../types';
import Anchor from '../../Anchor';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import ContactEmailStatus from '../../ContactEmailStatus';
import ContactIcon from '../../ContactIcon';
import ContactIcon2 from '../../ContactIcon2';
import FormCheckbox from '../../form/FormCheckbox';
import IconEmail from '../../icons/IconEmail';
import IconFacebook from '../../icons/IconFacebook';
import IconLinkedin from '../../icons/IconLinkedin';
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
	const [isComposerActive, setIsComposerActive] = useState(false);

	const { user, updateAttributes } = useAuthContext();
	// const { settings } = useSettingsContext();
	const emailToken = user?.attributes['custom:connect_email_token'];

	const handleDownload = () => onDownload(item);

	const handleAdd = () => onAdd(item);

	const handleUnlock = (e: MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		onUnlock(item);
	};

	const hasValidEmail = item.work_email ? true : false;
	const hasPersonalEmail = item.personal_email || item.personal_email2 ? true : false;
	const hasWorkPhone = item.direct_dial || item.work_number ? true : false;
	const hasMobilePhone = item.mobile_number ? true : false;
	const hasDirectDial = item.direct_dial ? true : false;
	const isCatchAll = !hasValidEmail && !hasDirectDial;

	const contactEmail = item.work_email || item.personal_email || item.personal_email2;
	const contactName = `${item.first_name} ${item.last_name}`;

	const itemCheckbox = (
		<FormCheckbox
			value={item.id}
			isChecked={item.isSelected}
			onChange={(isChecked: boolean) => {
				onSelect(item.id, isChecked);
			}}
		/>
	);

	const info = (
		<div className="is-flex">
			{!isAudienceMember ? <span className="mr-2 mt-2">{itemCheckbox}</span> : null}
			<span>
				{item.first_name} {item.last_name}
				{item.job_title ? (
					<>
						<br />
						<span className="has-text-weight-normal">{item.job_title}</span>
					</>
				) : null}
				{item.linkedin_profile ? (
					<>
						<Anchor className="contact-social" target="_blank" href={item.linkedin_profile}>
							<IconLinkedin />
						</Anchor>
					</>
				) : null}
				{item.facebook_profile ? (
					<>
						<Anchor className="contact-social" target="_blank" href={item.facebook_profile}>
							<IconFacebook />
						</Anchor>
					</>
				) : null}
			</span>
		</div>
	);

	const domain = (
		<>
			{item.company_domain ? (
				<>
					<Anchor target="_blank" href={item.company_domain}>
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
			{item.isUnlocked || isAudienceMember ? (
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
	const isContactEmailValid = atDataValidEmailCodes.includes(parseInt(item.contactEmailStatusCode));

	const isPersonalEmailValid = atDataValidEmailCodes.includes(parseInt(item.personalEmailStatusCode));
	const isContactPersonalEmailValid = atDataValidEmailCodes.includes(parseInt(item.contactPersonalEmailStatusCode));
	const isEmailValid = isContactEmailValid || isPersonalEmailValid || isContactPersonalEmailValid;

	const email = (
		<>
			{item.isUnlocked || isAudienceMember ? (
				<>
					{/* email is verified */}
					{item.isEmailVerified === true ? (
						<>
							{hasValidEmail ? (
								<div className="mb-2">
									<ContactIcon2 initial="W" statusCode={parseInt(item.contactEmailStatusCode)}>
										<span className="has-text-weight-normal">{item.work_email}</span>
									</ContactIcon2>
								</div>
							) : null}
							{hasPersonalEmail ? (
								<div className="mb-2">
									<ContactIcon2 initial="P" statusCode={parseInt(item.personalEmailStatusCode)}>
										<span className="has-text-weight-normal">{item.personal_email}</span>
									</ContactIcon2>
								</div>
							) : null}
							{item.personal_email2 ? (
								<div className="mb-2">
									<ContactIcon2 initial="P" statusCode={parseInt(item.contactPersonalEmailStatusCode)}>
										<span className="has-text-weight-normal">{item.personal_email2}</span>
									</ContactIcon2>
								</div>
							) : null}
						</>
					) : null}
					{/* email is not yet verified */}
					{item.isEmailVerified !== true ? (
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
			{hasValidEmail || hasPersonalEmail ? (
				<Anchor
					href={`mailto:${item.work_email || item.personal_email || item.personal_email2}`}
					className="button is-primary is-icon is-outlined is-rounded ml-3"
				>
					<span className="icon">
						<IconEmail />
					</span>
				</Anchor>
			) : null}
			{/* <FormButton className="ml-3" onClick={handleAdd} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconAdd />} /> */}
			{/* <FormButton className="ml-3" onClick={handleDownload} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconDownload />} /> */}
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
					if (!item.isUnlocked && !isAudienceMember) {
						// item is locked - show the unlocker button for the specified keys
						if (['contactEmail', 'personalEmail', 'historicalEmails', 'contactPhone', 'companyPhone'].includes(value.id)) {
							return <td key={value.id}>{unlocker}</td>;
						}
					}
					if (item.isEmailVerified && value.id === 'emailStatus') {
						return (
							<td key={value.id}>
								<ContactEmailStatus contact={item} />
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
		<>
			<div className="panel-block is-block">
				<div className="columns is-mobile is-multiline is-align-items-centerr">
					<div className="column is-12-mobile is-5-tablet">
						<div className="columns is-mobile is-align-items-centerr">
							<div className="column is-7 is-flex is-align-items-centerr">{info}</div>
							<div className="column is-5">{domain}</div>
						</div>
					</div>
					<div className="column is-12-mobile is-7-tablet">
						<div className="columns is-mobile is-align-items-centerr">
							<div className="column is-6">{email}</div>
							<div className="column is-3">{phone}</div>
							{!isAudienceMember ? <div className="column is-3 is-flex is-justify-content-flex-end action-buttons">{controls}</div> : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProspectContactEntry;
