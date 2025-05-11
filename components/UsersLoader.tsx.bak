import { useEffect } from 'react';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

const UsersLoader = ({
	limit = 50,
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
		if (groupname) {
			listUsers();
		}
	}, [groupname]);

	useEffect(() => {
		if (groupname && nextToken) {
			listUsers();
		}
	}, [nextToken]);

	const getOptions = async () => {
		const options = {
			queryStringParameters: {
				groupname,
				limit,
				token: nextToken,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const listUsers = async (token?: string) => {
		onBusy(true);
		const options = await getOptions();
		const apiName = 'AdminQueries';
		const path = '/listUsersInGroup';
		try {
			const response = await API.get(apiName, path, options);
			onLoad(response.Users, response?.NextToken);
		} catch (err) {
			console.log('Error loading users', err);
		}
		onBusy(false);
	};

	return null;
};

export default UsersLoader;
