import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import shortHash from 'shorthash2';
import { createContext, useState, useEffect, useContext } from 'react';
import { UrlObject } from 'url';
import { AccountType, AuthContextInterface, CognitoUserExt } from '../types';
import moment from 'moment';

export const AuthContext = createContext<AuthContextInterface>({
	isAuthBusy: false,
	isRoot: false,
	isAdmin: false,
	isManager: false,
	groups: [],
	allGroups: [],
	isExpired: () => false,
	onSignIn: () => {},
	onSignOut: () => {},
	updateAttributes: () => {},
	getGroupName: () => {},
	getUserGroups: () => {},
});

const defaultUser = {};

const AuthDataProvider = (props: any) => {
	const router = useRouter();

	const [user, setUser] = useState<CognitoUserExt>();
	const [authError, setAuthError] = useState();
	const [isAuthBusy, setIsAuthBusy] = useState(true);
	const [isRoot, setIsRoot] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [groups, setGroups] = useState<string[]>([]);
	const [allGroups, setAllGroups] = useState<string[]>([]);

	/**
	 * Get current authenticated user from Cognito
	 * Set authData & authError accordingly
	 */
	useEffect(() => {
		setIsAuthBusy(true);
		getCurrentAuthenticatedUser();
		setIsAuthBusy(false);
	}, []);

	/**
	 * Get current authenticated user from Cognito
	 * Set authData & authError accordingly
	 */
	useEffect(() => {
		(async () => {
			const shouldSetBusy = !user || !user.attributes.sub;
			if (shouldSetBusy) {
				setIsAuthBusy(true)
			}
			await getCurrentAuthenticatedUser();
			if (shouldSetBusy) {
				setIsAuthBusy(false);
			}
		})();
	}, [router.pathname]);

	/**
	 * Get current authenticated user
	 * @returns {Void}
	 */
	const getCurrentAuthenticatedUser = async () => {
		try {
			const newUser = await Auth.currentAuthenticatedUser();
			const newGroups = newUser?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
			console.log('newUser - ', newUser);
			setUser(newUser);
			setAllGroups(newGroups);
			setGroups(newGroups.filter((name: string) => ['Default', 'Admin', 'Root'].includes(name) === false));
			setIsRoot(newGroups.indexOf('Root') !== -1);
			setIsAdmin(newGroups.indexOf('Admin') !== -1);
		} catch (err) {
			setAuthError(err);
		}
	};

	/**
	 * Handle signout
	 * @returns {void}
	 */
	const onSignOut = async () => {
		await Auth.signOut();
		setUser(undefined);
		await router.push('/');
	};

	/**
	 * @summary
	 * Update Cognito attributes of current user
	 * @param params Cognito User attributes
	 * @returns
	 */
	const updateAttributes = async (params: Record<string, string>) => {
		let user = await Auth.currentAuthenticatedUser();
		try {
			await Auth.updateUserAttributes(user, params);
		} catch (err: any) {
			alert('Something went wrong trying to update the profile, please try again');
			return;
		}
		user = await Auth.currentAuthenticatedUser();
		setUser(user);
	};



	/**
	 * Handle sign in and redirect event
	 * Set auth status to busy before redirection to stop guards from redirecting
	 * @param {Object} newAuthData auth data
	 * @param {urlObject} urlObject Redirection params
	 * @returns {HttpResponse} HTTP redirect response
	 */
	const onSignIn = async (newAuthData: CognitoUserExt, urlObject: UrlObject) => {
		console.log({ newAuthData });
		setIsAuthBusy(true);
		setUser(newAuthData);
		await await updateAttributes({ 'custom:last_login_at': (+new Date()).toString() });
		await router.push(
			urlObject || {
				pathname: '/',
			}
		);
		setIsAuthBusy(false);
	};

	/**
	 * @summary
	 * Get users group name
	 * @param usrname {string} email or phone number - must be unique
	 * @returns {string}
	 */
	const getGroupName = (username: string) => shortHash(username);

	/**
	 * @summary
	 * Get the users own group name / admin users group name
	 */
	const getUserGroups = () => {
		let groups = [];
		if (user?.attributes['custom:group_name']) {
			groups.push(user?.attributes['custom:group_name']);
		}
		return groups;
	};

	/**
	 * @summary
	 * Check whether trial has expired or not
	 * 
	 * @description
	 * Always returns false for active customers
	 *
	 * @returns boolean
	 */
	const isExpired = () => {
		if (user?.attributes['custom:account_type'] !== AccountType.Trial) {
			return false;
		}
		if (!user?.attributes['custom:created_at']) {
			return true;
		}
		const now = moment();
		const then = moment.unix(parseInt(user?.attributes['custom:created_at'] || '') / 1000).add(7, 'days');
		return now > then;
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthBusy,
				isRoot,
				isAdmin,
				groups,
				allGroups,
				user,
				authError,
				isExpired,
				onSignIn,
				onSignOut,
				updateAttributes,
				getGroupName,
				getUserGroups,
			}}
			{...props}
		/>
	);
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthDataProvider;
