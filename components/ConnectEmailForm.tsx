import React, { useEffect, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import { genericErrorMessage } from '../consts';
import Loader from './Loader';
import CardAnimatePresence from './cards/CardAnimatePresence';
import { useAuthContext } from '../providers/auth-data-provider';
import { useRouter } from 'next/router';
import { EmailAccountModel, NylasEmailAccount } from '../types';
import Message from './Message';
import { createEmailAccount, deleteEmailAccount } from '../src/graphql/mutations';
import QueryLoader from './QueryLoader';
import { listEmailAccountsByUserId } from '../src/graphql/queries';
import EmailAccountItems from './EmailAccountItems';

const ConnectEmailForm = () => {
	const [code, setCode] = useState('');
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [isConnected, setIsConnected] = useState(false);
	const [account, setAccount] = useState<NylasEmailAccount>();
	const [isConnecting, setIsConnecting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [emailAccounts, setEmailAccounts] = useState<EmailAccountModel[]>([]);
	const [isEmailAccountsLoading, setIsEmailAccountsLoading] = useState(true);

	const router = useRouter();
	const { user, updateAttributes } = useAuthContext();
	const emailToken = user?.attributes['custom:connect_email_token'];
	const groupname = user?.attributes['custom:group_name'];

	useEffect(() => {
		if (typeof router.query.code === 'string') {
			setCode(router.query.code);
			onCallback(router.query.code);
		}
	}, [router.query.code]);

	useEffect(() => {
		if (emailToken && !isBusy) {
			getAccount(emailToken);
		}
	}, [emailToken]);

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

	const onConnect = async () => {
		setIsLoading(true);
		const options = await getInput({ method: 'GET', origin: window.location.origin });
		try {
			const response = await API.post('nymblrConnectApi', '/connect/email', options);
			window.location = response.url;
		} catch (err) {
			console.log('updateUser - error', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
			setIsLoading(false);
		}
	};

	const createNewEmailAccount = async (email: string, code: string, token: string) => {
		try {
			const response: any = await API.graphql(
				graphqlOperation(createEmailAccount, {
					input: {
						userId: user?.attributes.sub,
						groupId: groupname,
						tenants: [groupname],
						email,
						code,
						token,
					},
				})
			);
			return response.data.createEmailAccount;
		} catch (err) {
			console.log('Error while creating new list', err);
			setError(new Error('Could not save email account'));
		}
	};

	const onCallback = async (newCode: string) => {
		setIsConnecting(true);
		const options = await getInput({ method: 'POST', code: newCode });
		try {
			const token = await API.post('nymblrConnectApi', '/connect/email', options);
			if (!emailToken) {
				await updateAttributes({
					'custom:connect_email_code': newCode,
					'custom:connect_email_token': token.access_token,
				});
			}
			await createNewEmailAccount(token.email_address, newCode, token.access_token);
			window.location.href = window.location.origin + window.location.pathname;
		} catch (err) {
			console.log('updateUser - error', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
			setIsConnecting(false);
		}
	};

	const getAccount = async (token: string) => {
		setIsBusy(true);
		setError(undefined);
		const options = await getInput({ method: 'GET', token: token });
		try {
			const newAccount = await API.post('nymblrConnectApi', '/send/email', options);
			setAccount(newAccount);
		} catch (err) {
			console.log('updateUser - error', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
		setIsBusy(false);
	};

	const onActivate = async (id: string) => {
		const index = emailAccounts.findIndex((item) => item.id === id);
		if (index === -1) {
			return;
		}
		setIsEmailAccountsLoading(true);
		const account = emailAccounts[index];
		try {
			if (emailToken !== account.token) {
				await updateAttributes({
					'custom:connect_email_code': account.code,
					'custom:connect_email_token': account.token,
				});
			}
		} catch (err) {
			const msg = 'Error while trying to active email account';
			console.log(msg, err);
			setError(new Error(msg));
		}
		setIsEmailAccountsLoading(false);
	};

	const onDelete = async (id: string) => {
		const index = emailAccounts.findIndex((item) => item.id === id);
		if (index === -1) {
			return;
		}
		const account = { ...emailAccounts[index] };
		const newAccounts = [...emailAccounts];
		newAccounts.splice(index, 1);
		setEmailAccounts(newAccounts);
		try {
			const options = await getInput({ method: 'DELETE', token: account.token });
			await API.post('nymblrConnectApi', '/connect/email', options);
			if (emailToken === account.token) {
				await updateAttributes({
					'custom:connect_email_code': '',
					'custom:connect_email_token': '',
				});
			}
			API.graphql(graphqlOperation(deleteEmailAccount, { input: { id } }));
		} catch (err) {
			const msg = 'Error while trying to delete email account';
			console.log(msg, err);
			setError(new Error(msg));
		}
	};

	return (
		<>
			<CardAnimatePresence isActive={isConnecting || isLoading}>
				<Loader />
			</CardAnimatePresence>
			<CardAnimatePresence isActive={error?.message !== undefined}>
				<div className="pb-5 has-text-centered">
					<Message color="is-info">
						<p>{error?.message}</p>
					</Message>
				</div>
			</CardAnimatePresence>
			<EmailAccountItems
				items={emailAccounts}
				isBusy={isEmailAccountsLoading}
				onNew={onConnect}
				onActivate={onActivate}
				onDelete={onDelete}
			/>
			{user?.attributes.sub ? (
				<QueryLoader
					onLoad={setEmailAccounts}
					query={listEmailAccountsByUserId}
					rootKey="listEmailAccountsByUserId"
					dataKey="items"
					onBusyToggle={setIsEmailAccountsLoading}
					options={{ userId: user?.attributes.sub }}
				/>
			) : null}
		</>
	);
};

export default ConnectEmailForm;
