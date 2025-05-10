import { ReactElement, useEffect, useState } from 'react';

import { genericErrorMessage, MAXIMUM_CONTACTS_TO_UNLOCK } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { IBytemineCollection, IBytemineContact } from '../../../types';
import { callApi, notifyError, notifySuccess } from '../../../utils/helper-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import FormButton from '../../form/FormButton';
import AnimatedIconSuccess from '../../icons/animated/AnimatedIconSuccess';
import Loader from '../../Loader';
import Modal from '../../Modal';
import Slot from '../../Slot';

const ProspectUnlockContacts = ({
	contacts,
	isActive,
	onSuccess,
	onStart,
	onError,
	onCancel,
}: {
	contacts: IBytemineContact[];
	isActive: boolean;
	onStart: (ruids: string[]) => void;
	onError: (ruids: string[]) => void;
	onCancel: () => void;
	onSuccess: (items: IBytemineContact[]) => void;
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const [isStarted, setIsStarted] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [error, setError] = useState<Error>();

	useEffect(() => {
		if (isActive) {
			handleUnlock();
			return;
		}
		setIsBusy(false);
		setError(undefined);
		setIsStarted(false);
		setIsCompleted(false);
	}, [isActive]);

	const { user } = useAuthContext();

	const getInput = async () => {
		const ruids = contacts.map((item) => item.pid).filter((id) => id?.trim()?.length);
		// const options = {
		// 	body: {
		// 		ruids: Array.from(new Set(ruids)),
		// 		groupId: user?.attributes['custom:group_name'],
		// 		userId: user?.attributes.sub,
		// 	},
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
		// 	},
		// };
		// return options;
	};

	const handleUnlock = async () => {
		if (contacts.length > MAXIMUM_CONTACTS_TO_UNLOCK) {
			setIsStarted(true);
			const err = new Error(`Maximum ${MAXIMUM_CONTACTS_TO_UNLOCK} contacts can be unlocked at once.`);
			setError(err);
			notifyError(err);
			onError([]);
			return;
		}

		setIsBusy(true);
		setIsStarted(true);
		setError(undefined);

		let response;
		try {
			const pids = contacts.map((item) => item.pid).filter((id) => id?.trim()?.length);
			// const options = await getInput();
			onStart(pids);
			// response = await API.post('nymblrRestApi', '/api/contact-details', options);
			const response = (await callApi(null, '/api/v1/contacts/unlock', {
				method: 'POST',
				body: JSON.stringify({ pids }),
			})) as IBytemineContact[];
			onSuccess(response);
			notifySuccess(`${pids.length} contacts unlocked`);
			setIsCompleted(true);
		} catch (err) {
			// setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
			onError([]);
			notifyError(err);
		}

		setIsBusy(false);
	};

	const onContinue = () => onCancel();

	let title: string | ReactElement = `Unlock ${contacts.length} contact(s)`;
	if (error) {
		title = 'Error';
	}

	if (isCompleted) {
		title = (
			<>
				Success!
				<br />
				Contacts unlocked
			</>
		);
	}

	return (
		<Modal isActive={false} onCancel={isBusy ? () => {} : onCancel}>
			<Card>
				<Slot slot="body">
					<div className="panel-block is-block has-text-centered" style={{ padding: '3rem' }}>
						{/* title */}
						<h3 className="title is-4 m-0 pb-5">{title}</h3>

						{/* body */}
						<div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center" style={{ padding: '2rem' }}>
							{/* error message */}
							<CardAnimatePresence isActive={error !== undefined}>
								<p className="is-size-5 has-text-danger">{error?.message || genericErrorMessage}</p>
							</CardAnimatePresence>

							{/* loader */}
							<CardAnimatePresence isActive={isBusy}>
								<Loader />
							</CardAnimatePresence>

							{/* success icon */}
							<CardAnimatePresence isActive={isCompleted}>
								<AnimatedIconSuccess isActive={isCompleted} />
							</CardAnimatePresence>
						</div>

						{/* unlock complete - continue */}
						<CardAnimatePresence isActive={isCompleted}>
							<FormButton onClick={onContinue} variant={['is-outlined', 'is-ui-button']} className="is-fullwidth" size="is-medium">
								Continue
							</FormButton>
						</CardAnimatePresence>

						{/* error - continue button */}
						<CardAnimatePresence isActive={error !== undefined}>
							<FormButton onClick={onCancel} variant={['is-outlined', 'is-ui-button']} className="is-fullwidth" size="is-medium">
								Close
							</FormButton>
						</CardAnimatePresence>

						{/* start unlocking process */}
						<CardAnimatePresence isActive={!isStarted}>
							<FormButton onClick={handleUnlock} variant={['is-outlined', 'is-ui-button']} className="is-fullwidth" size="is-medium">
								Start
							</FormButton>
						</CardAnimatePresence>
					</div>
				</Slot>
			</Card>
		</Modal>
	);
};

export default ProspectUnlockContacts;
