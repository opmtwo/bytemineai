import {MouseEvent, useEffect, useState} from 'react';
import { atDataValidEmailCodes } from '../consts';
import { useAuthContext } from '../providers/auth-data-provider';
import { useSettingsContext } from '../providers/settings-provider';
import { Contact, EmailAccountModel, SortData, SortOrder } from '../types';
import Anchor from './Anchor';
import CardAnimatePresence from './cards/CardAnimatePresence';
import ContactEmailStatus from './ContactEmailStatus';
import ContactIcon from './ContactIcon';
import ContactIcon2 from './ContactIcon2';
import EmailComposer from './EmailComposer';
import FormButton from './form/FormButton';
import FormCheckbox from './form/FormCheckbox';
import IconAdd from './icons/IconAdd';
import IconDownload from './icons/IconDownload';
import IconEmail from './icons/IconEmail';
import IconFacebook from './icons/IconFacebook';
import IconLinkedin from './icons/IconLinkedin';
import Loader from './Loader';

const ContactEntry = ({
	item,
	sortMap,
	emailAccounts = [],
	isLocked = false,
	isListMode = false,
	onSelect,
	onAdd,
	onDownload,
	onUnlock,
	isAudienceMember = false
}: {
	item: Contact;
	sortMap: SortData[];
	emailAccounts: EmailAccountModel[];
	isLocked?: boolean;
	isListMode?: boolean;
	onSelect: (id: string, isChecked: boolean) => void;
	onAdd: (contact: Contact) => void;
	onDownload: (contact: Contact) => void;
	onUnlock: (contact: Contact) => void;
	isAudienceMember?: boolean
}) => {
	const [isComposerActive, setIsComposerActive] = useState(false);

	const { user, updateAttributes } = useAuthContext();
	const { settings } = useSettingsContext();
	const emailToken = user?.attributes['custom:connect_email_token'];


	const handleDownload = () => onDownload(item);

	const handleAdd = () => onAdd(item);

	const handleUnlock = (e: MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		onUnlock(item);
	};

	const onEmail = (e: MouseEvent<HTMLAnchorElement>): void => {
		// email account is not connected yet
		if (!emailToken) {
			return;
		}
		// composer is not enabled for this account
		if (!settings?.['custom:has_email']) {
			return;
		}
		e.preventDefault();
		setIsComposerActive(true);
	};

	const onEmailSubmit = () => setIsComposerActive(false);

	const onEmailCancel = () => setIsComposerActive(false);

	const hasValidEmail = item.contactEmail ? true : false;
	const hasPersonalEmail = item.personalEmail ? true : false;
	const hasWorkPhone = item.companyPhone ? true : false;
	const hasMobilePhone = item.contactPhone ? true : false;
	const hasDirectDial = item.directDialType ? true : false;
	const isCatchAll = !hasValidEmail && !hasDirectDial;

	const contactEmail = item.contactEmail || item.personalEmail;
	const contactName = `${item.contactFirstName} ${item.contactLastName}`;

	const composer =
		emailToken && contactEmail ? (
			<EmailComposer
				isActive={isComposerActive}
				token={emailToken}
				emailAccounts={emailAccounts}
				toName={contactName}
				toEmail={contactEmail}
				onSubmit={onEmailSubmit}
				onCancel={onEmailCancel}
			/>
		) : null;

	const itemCheckbox = (
		<FormCheckbox
			value={item.ruid}
			isChecked={item.isSelected}
			onChange={(isChecked: boolean) => {
				onSelect(item.ruid, isChecked);
			}}
		/>
	);

	const info = (
		<div className="is-flex">
			{!isAudienceMember ? (<span className="mr-2 mt-2">{itemCheckbox}</span>) : null}
			<span>
				{item.contactFirstName} {item.contactLastName}
				{item.contactTitle ? (
					<>
						<br />
						<span className="has-text-weight-normal">{item.contactTitle}</span>
					</>
				) : null}
				{!isAudienceMember && (item.contactLinkedinURL || item.contactFacebook) ? <br /> : null}
				{!isAudienceMember && item.contactLinkedinURL ? (
					<>
						<Anchor className="contact-social" target="_blank" href={`https://${(item.contactLinkedinURL).replace('https://','')}`}>
							<IconLinkedin />
						</Anchor>
					</>
				) : null}
				{!isAudienceMember && item.contactFacebook ? (
					<>
						<Anchor className="contact-social" target="_blank" href={`https://${(item.contactFacebook).replace('https://','')}`}>
							<IconFacebook />
						</Anchor>
					</>
				) : null}
			</span>
		</div>
	);

	const domain = (
		<>
			{item.companyDomain ? (
				<>
					<Anchor target="_blank" href={`https://${item.companyDomain}`}>
						<span className="has-text-weight-normal">{item.companyName || item.companyDomain}</span>
					</Anchor>
				</>
			) : (
				<>
					<span className="has-text-weight-normal">{item.companyName || item.companyDomain}</span>
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
	if (isAudienceMember){
		if(item.contactEmail && item.contactEmail != ''){
			item.contactEmail = item.contactEmail.toString().substring(0,1)+'****@****.***';
		}
		if(item.contactPersonalEmail && item.contactPersonalEmail != ''){
			item.contactPersonalEmail = item.contactPersonalEmail.toString().substring(0,1)+'****@****.***'; //+'****@****.com'
		}
		if(item.personalEmail && item.personalEmail != ''){
			item.personalEmail = item.personalEmail.toString().substring(0,1)+'****@****.***'; //+'****@****.com'
		}
		if(item.directDialPhone && item.directDialPhone != ''){
			item.directDialPhone = '+1**********'
		}
		if(item.companyPhone && item.companyPhone != ''){
			item.companyPhone = '+1**********'
		}
		if(item.contactPhone && item.contactPhone != ''){
			item.contactPhone = '+1**********'
		}
	}
	const phone = (
		<>
			{(item.isUnlocked || isAudienceMember) ? (
				<>
					{hasDirectDial ? (
						<div className="mb-2">
							<ContactIcon color="info" initial="C">
								<span className="has-text-weight-normal">{item.directDialPhone}</span>
							</ContactIcon>
						</div>
					) : (
						<>
							{(hasWorkPhone && !isAudienceMember) ? (
								<div className="mb-2">
									<ContactIcon color="danger" initial="W">
										<span className="has-text-weight-normal">{item.companyPhone}</span>
									</ContactIcon>
								</div>
							) : null}
							{hasMobilePhone ? (
								<div className="mb-2">
									<ContactIcon color="dark" initial="C">
										<span className="has-text-weight-normal">{item.contactPhone}</span>
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
			{(item.isUnlocked || isAudienceMember) ? (
				<>
					{/* email is verified */}
					{item.isEmailVerified === true ? (
						<>
							{hasValidEmail ? (
								<div className="mb-2">
									<ContactIcon2 initial="W" statusCode={parseInt(item.contactEmailStatusCode)}>
										<span className="has-text-weight-normal">{item.contactEmail}</span>
									</ContactIcon2>
								</div>
							) : null}
							{hasPersonalEmail ? (
								<div className="mb-2">
									<ContactIcon2 initial="P" statusCode={parseInt(item.personalEmailStatusCode)}>
										<span className="has-text-weight-normal">{item.personalEmail}</span>
									</ContactIcon2>
								</div>
							) : null}
							{item.contactPersonalEmail ? (
								<div className="mb-2">
									<ContactIcon2 initial="P" statusCode={parseInt(item.contactPersonalEmailStatusCode)}>
										<span className="has-text-weight-normal">{item.contactPersonalEmail}</span>
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
										<span className="has-text-weight-normal">{item.contactEmail}</span>
									</ContactIcon>
								</div>
							) : null}
							{hasPersonalEmail ? (
								<div className="mb-2">
									<ContactIcon color="warning" initial="P">
										<span className="has-text-weight-normal">{item.personalEmail}</span>
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
					href={`mailto:${item.contactEmail || item.personalEmail}`}
					className="button is-primary is-icon is-outlined is-rounded ml-3"
					onClick={onEmail}
				>
					<span className="icon">
						<IconEmail />
					</span>
				</Anchor>
			) : null}
			<FormButton className="ml-3" onClick={handleAdd} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconAdd />} />
			<FormButton className="ml-3" onClick={handleDownload} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconDownload />} />
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
							{!isAudienceMember ? (  <div className="column is-3 is-flex is-justify-content-flex-end action-buttons">{controls}</div> ) : null }
						</div>
					</div>
				</div>
			</div>
			{composer}
		</>
	);
};

export default ContactEntry;
