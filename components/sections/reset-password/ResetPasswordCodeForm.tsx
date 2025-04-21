import classNames from 'classnames';
import generator from 'generate-password';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';

import { confirmResetPassword, resetPassword, signIn } from '@aws-amplify/auth';

import { useAuthContext } from '../../../providers/auth-data-provider';
import Card from '../../cards/Card';
import CardRelated from '../../cards/CardRelated';
import FormButton from '../../form/FormButton';
import FormField from '../../form/FormField';
import Logo from '../../Logo';
import Notification from '../../Notification';
import Slot from '../../Slot';

const ResetPasswordCodeForm = ({ email, onCancel }: { email: string; onCancel: Function }) => {
	const { onSignIn } = useAuthContext();

	const router = useRouter();

	const [otp, setOtp] = useState('');
	const [oldOtp, setOldOtp] = useState('');
	const [otpError, setOtpError] = useState<Error>();

	const [isBusy, setIsBusy] = useState(false);
	const [isResent, setIsResent] = useState(false);
	const [code, setCode] = useState('');
	const [codeError, setCodeError] = useState<Error>();

	useEffect(() => {
		if (oldOtp.length !== 6 && otp.length === 6) {
			handleSubmit();
		}
	}, [otp]);

	const handleSubmit = async (e?: FormEvent) => {
		e?.preventDefault();

		const otpCode = otp.trim();
		const pwd = generator.generate({
			length: 8,
			numbers: true,
			strict: true,
		});

		setIsBusy(true);
		setCodeError(undefined);
		try {
			await confirmResetPassword({ username: email, confirmationCode: otpCode, newPassword: pwd });
			const user = await signIn({
				username: email,
				password: pwd,
			});
			setIsBusy(false);
			// onSignIn(user, {
			// 	pathname: '/change-password',
			// 	query: {
			// 		oldPassword: pwd,
			// 	},
			// });
			router.push(`/change-password?oldPassword=${pwd}`);
		} catch (err) {
			setIsBusy(false);
			setCodeError(err);
		}
	};

	const onOtpChange = (newOtp: string) => {
		setOtp((value) => {
			setOldOtp(value);
			return newOtp;
		});
	};

	const onResend = async () => {
		setIsBusy(true);
		try {
			await resetPassword({ username: email });
			setIsResent(true);
		} catch (err) {
			setCodeError(err);
		}
		setIsBusy(false);
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
					{/* <div className="panel-block is-block">
						<FormInput name="code" value={code} label="Verification code" required={true} error={codeError} onChange={setCode} />
					</div> */}
					<div className="panel-block is-flex is-justify-content-center">
						{/* <FormInput name="email" value={email} label="E-Mail" required={true} error={emailError} disabled={true} /> */}
						{/* <FormInput name="code" value={otp} label="Verification code" onChange={setOtp} required={true} error={otpError} /> */}
						<FormField>
							<OTPInput
								value={otp}
								onChange={onOtpChange}
								numInputs={6}
								inputStyle="input is-large px-0"
								renderSeparator={<span className="mx-2"></span>}
								renderInput={(props) => {
									const { className, ...rest } = props;
									return (
										<input
											className={classNames(className, 'input is-medium has-background-light has-text-dark has-text-centered mx-1')}
											{...rest}
											style={{ width: '2.5rem' }}
										/>
									);
								}}
							/>
						</FormField>
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButton variant="is-inverted" onClick={onCancel} disabled={isBusy}>
						Back
					</FormButton>
					<FormButton type="submit" disabled={isBusy} loading={isBusy} className="ml-5" onClick={handleSubmit}>
						Next
					</FormButton>
				</Slot>
			</Card>
			<CardRelated>
				<Notification error={codeError} />
				{isResent ? 'A new verification code was sent to your email' : 'A verification code was sent to your email. Enter the code to continue.'}
			</CardRelated>
			<FormButton variant="is-inverted" size="is-small" className="is-block mx-auto mt-3" onClick={onResend} disabled={isResent || isBusy}>
				Did&apos;nt receive code? Click here to resend
			</FormButton>
		</form>
	);
};

export default ResetPasswordCodeForm;
