import { useEffect } from 'react';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

const UsersLoaderNonAdmin = ({
	limit = 50,
	isBusy = false,
	groupname,
	nextToken,
	onLoad,
	onBusy,
}: {
	limit?: number;
	isBusy: boolean;
	groupname: string;
	nextToken?: string;
	onLoad: Function;
	onBusy: Function;
}) => {
	useEffect(() => {
		listUsers();
	}, [groupname]);

	useEffect(() => {
		if (groupname && nextToken) {
			listUsers();
		}
	}, [nextToken, groupname]);

	const getOptions = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const listUsers = async (token?: string) => {
		onBusy(true);
		const options = await getOptions({ groupname, limit, token });
		try {
			const response = await API.post('nymblrRestApi', '/api/list-users', options);
			onLoad(response.Users, response?.NextToken);
		} catch (err) {
			console.log('Error loading users', err);
		}
		onBusy(false);
	};

	return null;
};

export default UsersLoaderNonAdmin;
