import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { useEffect, useState } from 'react';
import { useSettingsContext } from '../providers/settings-provider';
import { CognitoUserExt } from '../types';
import { getSubdomain } from '../utils/helper-utils';
import { parseCognitoUser } from '../utils/user-utils';
import CardAnimatePresence from './cards/CardAnimatePresence';
import Loader from './Loader';

const SettingsLoader = () => {
	const [isBusy, setIsBusy] = useState(true);

	const { initSettings } = useSettingsContext();

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return options;
	};

	const getSettings = async (subdomain: string) => {
		const options = await getInput({ groupId: subdomain });
		let response;
		try {
			response = await API.post('nymblrRestApi', '/api/settings', options);
			const account = response?.account;
			const attributes = parseCognitoUser(account);
			return attributes;
		} catch (err) {
			console.log('Error fetching settings', err);
		}
	};

	const loadSettings = async () => {
		let groupname;
		try {
			groupname = getSubdomain();
			if (!groupname) {
				const user: CognitoUserExt = await Auth.currentAuthenticatedUser();
				groupname = user?.attributes?.['custom:group_name'];
			}
		} catch (err) {
			console.log('Error initializing setup ', err);
		}
		const settings = await initSettings(groupname || '');
		if (!settings) {
			setIsBusy(false);
			return;
		}
		const { attributes } = settings as any;
		document.body.style.setProperty('--primary', attributes?.['custom:color_code'] || '');
		setIsBusy(false);
	};

	useEffect(() => {
		loadSettings();
	}, []);

	const fullPageLoader = (
		<div
			className="is-overlay is-flex is-align-items-center is-justify-content-center has-background-white"
			style={{ zIndex: 20000, position: 'fixed' }}
		>
			<Loader />
		</div>
	);

	return (
		<>
			<CardAnimatePresence isActive={isBusy}>{fullPageLoader}</CardAnimatePresence>
			{isBusy ? fullPageLoader : null}
		</>
	);
};

export default SettingsLoader;
