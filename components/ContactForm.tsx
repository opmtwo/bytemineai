import { FormEvent, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import Card from './cards/Card';
import FormButton from './form/FormButton';
import FormInput from './form/FormInput';
import ErrorNotificaition from './notifications/ErrorNotification';
import Slot from './Slot';
import { createContactForm } from '../src/graphql/mutations';
import CardTitle from './CardTitle';
import CardAnimatePresence from './cards/CardAnimatePresence';
import AnimatedIconSuccess from './icons/animated/AnimatedIconSuccess';
import { useAuthContext } from '../providers/auth-data-provider';
import { genericErrorMessage } from '../consts';

const ContactForm = ({ onSubmit, onCancel }: { onSubmit: Function; onCancel: () => void }) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState<Error>();
	const [lastName, setLastName] = useState('');
	const [lastNameError, setLastNameError] = useState<Error>();
	const [message, setMessage] = useState('');
	const [messageError, setMessageError] = useState<Error>();
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { user } = useAuthContext();

	const isFirstNameValid = async () => firstName && firstName.trim().length > 0;

	const isLastNameValid = async () => lastName && lastName.trim().length > 0;

	const isMessageValid = async () => message && message.trim().length > 0;

	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = (await isFirstNameValid()) ? undefined : new Error('Invalid first name');
		isValid = err ? false : isValid;
		setFirstNameError(err);

		err = (await isLastNameValid()) ? undefined : new Error('Invalid last name');
		isValid = err ? false : isValid;
		setLastNameError(err);

		err = (await isMessageValid()) ? undefined : new Error('Invalid message');
		isValid = err ? false : isValid;
		setMessageError(err);

		return isValid;
	};

	const getInput = () => {
		let operation = createContactForm;
		let operationName = 'createContactForm';
		let input = {
			firstName,
			lastName,
			message,
		};
		return { operation, operationName, input };
	};

	const save = async () => {
		const { operation, operationName, input } = getInput();
		const response: any = await API.graphql(graphqlOperation(operation, { input }));
		return response;
	};

	const sendEmail = async () => {
		const email = user?.attributes.email;
		const options = {
			body: { email, firstName, lastName, message },
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
			},
		};
		const response = await API.post('nymblrRestApi', '/api/contact-form', options);
		return response;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(undefined);
		if (!(await isFormValid())) {
			return;
		}
		setIsBusy(true);
		try {
			const model = await save();
			await sendEmail();
			setIsSubmitted(true);
			await onSubmit(model);
		} catch (err) {
			console.log('Error in contact form - ', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<Card>
				<Slot slot="header">
					<CardTitle>Contact Us</CardTitle>
				</Slot>
				<Slot slot="body">
					<CardAnimatePresence isActive={!isSubmitted}>
						<div className="panel-block is-block">
							<FormInput
								name="firstName"
								value={firstName}
								label="First Name"
								placeholder="Enter first name"
								onChange={setFirstName}
								required={true}
								error={firstNameError}
							/>
							<FormInput
								name="lastName"
								value={lastName}
								label="Last Name"
								placeholder="Enter last name"
								onChange={setLastName}
								required={true}
								error={lastNameError}
							/>
							<FormInput
								name="message"
								value={message}
								label="Message"
								placeholder="How can we help?"
								onChange={setMessage}
								required={true}
								multiline={true}
								error={messageError}
							/>
							<ErrorNotificaition error={error} />
						</div>
					</CardAnimatePresence>
					<CardAnimatePresence isActive={isSubmitted}>
						<div className="is-flex is-flex-direction-column is-align-items-center p-6 has-text-centered">
							<h4 className="title is-4 py-6">
								Thank you for contacting us. <br />
								We will get back to you shortly
							</h4>
							<AnimatedIconSuccess isActive={isSubmitted} />
							<div className="py-6"></div>
							<FormButton
								type="submit"
								onClick={onCancel}
								disabled={isBusy}
								variant={['is-outlined', 'is-ui-button']}
							>
								Continue
							</FormButton>
						</div>
					</CardAnimatePresence>
				</Slot>
				<Slot slot="footer">
					<CardAnimatePresence isActive={!isSubmitted}>
						<FormButton
							type="submit"
							onClick={handleSubmit}
							disabled={isBusy}
							loading={isBusy}
							variant={['is-outlined', 'is-ui-button']}
						>
							Submit
						</FormButton>
					</CardAnimatePresence>
				</Slot>
			</Card>
		</form>
	);
};

export default ContactForm;
