import { confirmSignIn, updatePassword } from 'aws-amplify/auth';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { notifyError, notifySuccess } from '../../../utils/helper-utils';
import { isPasswordValid } from '../../../utils/user-utils';
import Card from '../../cards/Card';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Logo from '../../Logo';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Slot from '../../Slot';

const NewPasswordFormNew = ({ oldPass, isNewPassword, onSubmit }: { oldPass?: string; isNewPassword?: boolean; onSubmit?: () => void }) => {
	const router = useRouter();
	const { user } = useAuthContext();

	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [pwd, setPwd] = useState('');
	const [pwdError, setPwdError] = useState<Error>();
	const [pwdConfirm, setPwdConfirm] = useState('');
	const [pwdConfirmError, setPwdConfirmError] = useState<Error>();

	useEffect(() => {
		if (typeof router.query.username === 'string') {
			setUsername(router.query.username);
		}
	}, [router.query.username]);

	useEffect(() => {
		if (typeof router.query.password === 'string') {
			setPassword(router.query.password);
		}
	}, [router.query.password]);

	useEffect(() => {
		if (!oldPass) {
			return;
		}
		setPassword(oldPass);
	}, [oldPass]);

	const resetForm = () => {
		setPassword('');
		setPwd('');
		setPwdConfirm('');
	};

	const isFormValid = async () => {
		let err;
		let isValid = true;

		// if (!user?.attributes && !router.query.oldPassword) {
		// 	err = (await isPasswordValid(password ?? ''))
		// 		? undefined
		// 		: new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces');
		// 	isValid = err ? false : isValid;
		// 	setPwdError(err);
		// }

		err = (await isPasswordValid(pwd ?? ''))
			? undefined
			: new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces');
		isValid = err ? false : isValid;
		setPwdError(err);

		err = pwd === pwdConfirm && pwd && pwd === pwdConfirm ? undefined : new Error('Password confirmation does not match');
		isValid = err ? false : isValid;
		setPwdConfirmError(err);

		return isValid;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const isValid = await isFormValid();
		if (!isValid) {
			return;
		}
		try {
			setIsBusy(true);
			if (isNewPassword) {
				await confirmSignIn({ challengeResponse: pwd as string });
			} else {
				await updatePassword({ oldPassword: password!, newPassword: pwd!.trim() });
			}
			setIsBusy(false);
			if (onSubmit) {
				onSubmit();
			} else {
				notifySuccess('Your password has been updated successfully.');
				resetForm();
			}
		} catch (err: any) {
			setError(err);
			setIsBusy(false);
			notifyError(err, 'We encountered an issue while updating your password. Please try again later. If the issue persists, contact support.');
		}
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<div className="has-text-centered" style={{ marginBottom: 80 }}>
				<Logo />
			</div>
			<Card>
				<Slot slot="header">
					<big>
						<strong>New Password</strong>
					</big>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="pwd" value={pwd} label="New password" required={true} error={pwdError} onChange={setPwd} type="password" />
						<FormInput
							name="pwdConfirm"
							value={pwdConfirm}
							label="Confirm password"
							required={true}
							error={pwdConfirmError}
							onChange={setPwdConfirm}
							type="password"
						/>
						<ErrorNotificaition error={error} />
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButton type="submit" disabled={isBusy} loading={isBusy} className="ml-5" variant={['is-ui-button']}>
						Update Password
					</FormButton>
				</Slot>
			</Card>
		</form>
	);
};

export default NewPasswordFormNew;
