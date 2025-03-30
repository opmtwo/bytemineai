import { FormEvent, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { genericErrorMessage } from '../consts';
import Card from './cards/Card';
import CardTitle from './CardTitle';
import FormButton from './form/FormButton';
import FormSelectCreatable from './form/FormSelectCreatable';
import Modal from './modals/Modal';
import Slot from './Slot';
import ErrorNotificaition from './notifications/ErrorNotification';
import { EmailAccountModel, SelectOption } from '../types';
import Auth from '@aws-amplify/auth';
import { useAuthContext } from '../providers/auth-data-provider';
import API from '@aws-amplify/api';
import FormInput from './form/FormInput';
import FormSelectSearchable from './form/FormSelectSearchable';
import IconEmail from './icons/IconEmail';

const tinyMceConfig = {
	height: 240,
	resize: false,
	statusbar: false,
	menubar: false,
	plugins: [],
	branding: false,
	placeholder: 'start typing here...',
	toolbar: 'bold italic underline forecolor alignleft aligncenter alignright alignjustify removeformat',
};

const EmailComposer = ({
	isActive,
	token,
	emailAccounts,
	toName,
	toEmail,
	onSubmit,
	onCancel,
}: {
	isActive: boolean;
	token: string;
	emailAccounts: EmailAccountModel[];
	toName: string;
	toEmail: string;
	onSubmit: () => void;
	onCancel: () => void;
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [to, setTo] = useState<SelectOption[]>([{ label: toName, value: toEmail }]);
	const [toError, setToError] = useState<Error>();
	const [cc, setCc] = useState<SelectOption[]>([]);
	const [ccError, setCcError] = useState<Error>();
	const [bcc, setBcc] = useState<SelectOption[]>([]);
	const [bccError, setBccError] = useState<Error>();
	const [content, setContent] = useState('');
	const [contentError, setContentError] = useState<Error>();
	const [subject, setSubject] = useState('');
	const [subjectError, setSubjectError] = useState<Error>();
	const [initialValue, setInitialValue] = useState('');
	const [account, setAccount] = useState<SelectOption | null>(null);
	const [accountError, setAccountError] = useState<Error>();

	const { user, updateAttributes } = useAuthContext();
	const emailToken = user?.attributes['custom:connect_email_token'];

	useEffect(() => {
		if (!emailAccounts.length) {
			return;
		}
		for (let i = 0; i < emailAccounts.length; i++) {
			if (emailAccounts[i].token === user?.attributes['custom:connect_email_token']) {
				setAccount({ value: emailAccounts[i].token, label: emailAccounts[i].email });
			}
		}
	}, [emailAccounts]);

	useEffect(() => {
		setInitialValue(content);
	}, [isActive]);

	const onEditorChange = (newText: string) => setContent(newText);

	const isFormValid = async () => {
		let err;
		let isValid = true;

		// err = to.length > 0 ? undefined : new Error('Enter atleast 1 receipient');
		// isValid = err ? false : isValid;
		// setToError(err);

		// if (!err) {
		// 	err = to.every((entry) => isEmail(entry?.value)) ? undefined : new Error('1 or more invalid emails found');
		// 	isValid = err ? false : isValid;
		// 	setToError(err);
		// }

		// err = cc.every((entry) => isEmail(entry?.value)) ? undefined : new Error('1 or more invalid emails found');
		// isValid = err ? false : isValid;
		// setCcError(err);

		// err = bcc.every((entry) => isEmail(entry?.value)) ? undefined : new Error('1 or more invalid emails found');
		// isValid = err ? false : isValid;
		// setBccError(err);

		err = !isEmpty(account?.value || '') ? undefined : new Error('Select account');
		isValid = err ? false : isValid;
		setAccountError(err);

		err = !isEmpty(subject) ? undefined : new Error('Enter subject');
		isValid = err ? false : isValid;
		setSubjectError(err);

		err = !isEmpty(content) ? undefined : new Error('Enter message');
		isValid = err ? false : isValid;
		setContentError(err);

		return isValid;
	};

	const getPayload = () => ({
		method: 'POST',
		token: account?.value,
		to: to,
		subject: subject,
		body: content,
	});

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(undefined);
		if (!(await isFormValid())) {
			return;
		}
		setIsBusy(true);
		const options = await getInput(getPayload());
		try {
			const response = await API.post('nymblrConnectApi', '/send/email', options);
			onSubmit();
		} catch (err) {
			console.log('updateUser - error', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
		setIsBusy(false);
	};

	const accountOptions = emailAccounts.map((item) => ({
		value: item.token,
		label: item.email,
	}));

	return (
		<Modal isActive={isActive} onCancel={onCancel}>
			<Card>
				<Slot slot="header">
					<CardTitle>New Message</CardTitle>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-flex is-align-items-center has-text-grey is-size-7 py-2 px-5">
						<div className="icon contact-social mr-3 mb-1">
							<IconEmail />
						</div>
						<div className="is-flex-grow-1">
							<FormSelectSearchable
								name="account"
								value={account as any}
								placeholder="Email account"
								options={accountOptions}
								onChange={setAccount}
								required={true}
								error={accountError}
								isClearable={false}
							/>
						</div>
					</div>
					<div className="panel-block is-block py-2">
						<FormSelectCreatable
							name="urls"
							placeholder="To"
							value={to}
							onChange={setTo}
							options={[]}
							size="is-normal"
							isMulti={true}
							error={toError}
						/>
					</div>
					{/* <div className="panel-block is-block py-2">
						<FormSelectCreatable
							name="urls"
							placeholder="CC"
							value={cc}
							onChange={setCc}
							options={[]}
							size="is-normal"
							isMulti={true}
							error={ccError}
						/>
					</div>
					<div className="panel-block is-block py-2">
						<FormSelectCreatable
							name="urls"
							placeholder="BCC"
							value={bcc}
							onChange={setBcc}
							options={[]}
							size="is-normal"
							isMulti={true}
							error={bccError}
						/>
					</div> */}
					<div className="panel-block is-block py-2">
						<FormInput
							name="firstName"
							value={subject}
							placeholder="Enter subject"
							onChange={setSubject}
							required={true}
							error={subjectError}
						/>
					</div>
					<div className="panel-block is-block p-0">
						<Editor
							apiKey="y5auksdt43xjco4icw1i6pp6u9aiy2tzda9iuzz38mcpz72u"
							init={tinyMceConfig}
							initialValue={initialValue}
							onEditorChange={onEditorChange}
						/>
						<ErrorNotificaition error={contentError || error} className="p-5" />
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButton
						type="submit"
						onClick={handleSubmit}
						disabled={isBusy}
						loading={isBusy}
						variant={['is-outlined', 'is-ui-button']}
					>
						Send
					</FormButton>
				</Slot>
			</Card>
		</Modal>
	);
};

export default EmailComposer;
