import { Dispatch, SetStateAction, useEffect } from 'react';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { parseCognitoUser } from '../utils/user-utils';
import { UserAttributes } from '../types';

const UserLoader = ({
	username,
	onLoad,
	isBusy,
	onBusy,
}: {
	username: string;
	onLoad: Dispatch<SetStateAction<UserAttributes | undefined>>;
	isBusy: boolean;
	onBusy: Dispatch<SetStateAction<boolean>>;
}) => {
	useEffect(() => {
		if (username) {
			loadUser();
		}
	}, [username]);

	const getOptions = async () => {
		const options = {
			queryStringParameters: {
				username,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const loadUser = async () => {
		onBusy(true);
		const options = await getOptions();
		const apiName = 'AdminQueries';
		const path = '/getUser';
		try {
			const userData = await API.get(apiName, path, options);
			onLoad(parseCognitoUser({ ...userData, Attributes: userData.UserAttributes }));
		} catch (err) {
			console.log('Error loading users', err);
		}
		onBusy(false);
	};

	return null;
};

export default UserLoader;
