import {
	AuthUser,
	fetchUserAttributes,
	FetchUserAttributesOutput,
	getCurrentUser,
	SignInOutput,
	signOut,
	updateUserAttributes,
	UpdateUserAttributesInput,
} from 'aws-amplify/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import shortHash from 'shorthash2';
import Stripe from 'stripe';
import { UrlObject } from 'url';

import { AccountType, AuthContextInterface, CognitoUserExt, IBytemineSub, IBytemineUser, Roles } from '../types';
import { callApi } from '../utils/helper-utils';

export const AuthContext = createContext<AuthContextInterface>({
	isAuthBusy: false,
	isLoading: false,
	isActive: false,
	isTrial: false,
	isMonthly: false,
	isYearly: false,
	isRoot: false,
	isAdmin: false,
	isManager: false,
	isEditor: false,
	isViewer: false,
	isExpired: () => false,
	onSignIn: () => {},
	onSignOut: () => {},
	updateAttributes: () => {},
	refresh: () => {},
});

const defaultUser = {};

const AuthDataProvider = (props: any) => {
	const router = useRouter();

	const [authError, setAuthError] = useState();
	const [isAuthBusy, setIsAuthBusy] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	const [self, setSelf] = useState<IBytemineUser>();
	const [team, setTeam] = useState<IBytemineUser>();

	const [subscription, setSubscription] = useState<IBytemineSub>();

	const [stripeCustomer, setStripeCustomer] = useState<Stripe.Customer>();
	const [stripeSubscription, setStripeSubscription] = useState<Stripe.Subscription>();

	const [isActive, setIsActive] = useState(false);
	const [isTrial, setIsTrial] = useState(false);
	const [isMonthly, setIsMonthly] = useState(false);
	const [isYearly, setIsYearly] = useState(false);

	const [isRoot, setIsRoot] = useState(false);
	const [isAdmin, setisAdmin] = useState(false);
	const [isManager, setisManager] = useState(false);
	const [isEditor, setisEditor] = useState(false);
	const [isViewer, setisViewer] = useState(false);

	// current logged in user
	const [user, setUser] = useState<AuthUser>();

	// current logged in users attributes
	const [attributes, setAttributes] = useState<FetchUserAttributesOutput>();

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
			const shouldSetBusy = !user || !attributes?.sub;
			if (shouldSetBusy) {
				setIsAuthBusy(true);
			}
			await getCurrentAuthenticatedUser();
			if (shouldSetBusy) {
				setIsAuthBusy(false);
			}
		})();
	}, [router.pathname]);

	useEffect(() => {
		if (!attributes?.sub) {
			return;
		}
		getUserAndTeam();
	}, [attributes?.sub]);

	/**
	 * Get current authenticated user
	 * @returns {Void}
	 */
	const getCurrentAuthenticatedUser = async () => {
		try {
			const currentUser = await getCurrentUser();
			const attributes = await fetchUserAttributes();
			setUser(currentUser);
			setAttributes(attributes);
			return { user: currentUser, attributes: attributes };
		} catch (err: any) {
			console.log('getCurrentAuthenticatedUser - error', err);
			setAuthError(err);
		}
	};

	const getUserAndTeam = async () => {
		setIsLoading(true);
		try {
			const res = (await callApi(null, '/api/v1/subscriptions/me', {})) as {
				self: IBytemineUser;
				owner: IBytemineUser;
				subscription: IBytemineSub;
				stripeCustomer: Stripe.Customer;
				stripeSubscription: Stripe.Subscription;
			};
			setSelf(res.self);
			setTeam(res.owner);
			setSubscription(res.subscription);
			setStripeCustomer(res.stripeCustomer);
			setStripeSubscription(res.stripeSubscription);

			const latestPlan = (res.stripeSubscription as any).plan as Stripe.Plan;

			setIsActive(res.subscription?.subscriptionStatus?.toLowerCase().trim() === 'activecustomer');
			setIsTrial(res.subscription?.subscriptionStatus?.toLowerCase().trim() === 'trial');
			setIsMonthly(latestPlan?.interval === 'month');
			setIsYearly(latestPlan?.interval === 'year');

			const { role } = res.self;
			setisAdmin(role === Roles.Admin);
			setisManager(role === Roles.Manager);
			setisEditor(role === Roles.Editor);
			setisViewer(role === Roles.Viewer);
		} catch (err) {
			console.log('getUserAndTeam - error', err);
		}
		setIsLoading(false);
	};

	/**
	 * Handle signout
	 * @returns {void}
	 */
	const onSignOut = async () => {
		await signOut();
		setUser(undefined);
		await router.push('/');
	};

	/**
	 * @summary
	 * Update Cognito attributes of current user
	 * @param params Cognito User attributes
	 * @returns
	 */
	const updateAttributes = async (attributes: UpdateUserAttributesInput) => {
		try {
			const newAttributes = await updateUserAttributes(attributes);
			const updatedAttributes = await fetchUserAttributes();
			setAttributes(updatedAttributes);
		} catch (err: any) {
			console.log('updateAttributes - error', err);
			throw err;
		}
	};

	/**
	 * Handle sign in and redirect event
	 * Set auth status to busy before redirection to stop guards from redirecting
	 * @param {Object} newAuthData auth data
	 * @param {urlObject} urlObject Redirection params
	 * @returns {HttpResponse} HTTP redirect response
	 */
	const onSignIn = async (user: SignInOutput, urlObject?: UrlObject) => {
		// setIsAuthBusy(true);
		// setUser(newAuthData);
		if (!user.isSignedIn) {
			return;
		}
		// await updateAttributes({ userAttributes: { 'custom:last_login_at': new Date().toISOString() } });
		await getCurrentAuthenticatedUser();
		// await trackSignIn();
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
	 * Check whether trial has expired or not
	 *
	 * @description
	 * Always returns false for active customers
	 *
	 * @returns boolean
	 */
	const isExpired = () => {
		// if (user?.attributes['custom:account_type'] !== AccountType.Trial) {
		// 	return false;
		// }
		// if (!user?.attributes['custom:created_at']) {
		// 	return true;
		// }
		// const now = moment();
		// const then = moment.unix(parseInt(user?.attributes['custom:created_at'] || '') / 1000).add(7, 'days');
		// return now > then;
		return false;
	};

	const refresh = async () => {
		await Promise.all([getCurrentAuthenticatedUser(), getUserAndTeam()]);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthBusy,
				isLoading,
				user,
				self,
				team,
				subscription,
				stripeCustomer,
				stripeSubscription,
				isActive,
				isTrial,
				isMonthly,
				isYearly,
				isRoot,
				isAdmin,
				isManager,
				isEditor,
				isViewer,
				attributes,
				authError,
				isExpired,
				onSignIn,
				onSignOut,
				updateAttributes,
				refresh,
			}}
			{...props}
		/>
	);
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthDataProvider;
