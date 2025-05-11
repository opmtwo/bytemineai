import { updatePassword } from 'aws-amplify/auth';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

import Card from '../../cards/Card';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Logo from '../../Logo';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Slot from '../../Slot';
import FormButtonNew from '../../form/FormButtonNew';

const ChangePasswordForm = () => {
	const router = useRouter();

	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [oldPwd, setOldPwd] = useState('');
	const [pwd, setPwd] = useState('');
	const [pwdError, setPwdError] = useState<Error>();
	const [pwdConfirm, setPwdConfirm] = useState('');
	const [pwdConfirmError, setPwdConfirmError] = useState<Error>();

	useEffect(() => {
		if (typeof router.query.oldPassword === 'string') {
			setOldPwd(router.query.oldPassword);
		}
	}, [router.query.oldPassword]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const pwdNormalized = pwd.trim();
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/;
		const isValidPassword = passwordRegex.test(pwdNormalized);
		setError(undefined);
		setPwdError(undefined);
		setPwdConfirmError(undefined);

		if (!isValidPassword) {
			setPwdError(new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces'));
			return;
		}

		if (pwdNormalized !== pwdConfirm) {
			setPwdConfirmError(new Error("Passwords don't match"));
			return;
		}

		try {
			setIsBusy(true);
			await updatePassword({ oldPassword: oldPwd, newPassword: pwdNormalized });
			setIsBusy(false);
			// router.push({ pathname: '/' });
			window.location.href = '/';
		} catch (err) {
			setError(err);
			setIsBusy(false);
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
						<strong>Change Password</strong>
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
					<FormButtonNew type="submit" variant="active" disabled={isBusy} loading={isBusy} className="ml-5">
						Change Password
					</FormButtonNew>
				</Slot>
			</Card>
		</form>
	);
};

export default ChangePasswordForm;
