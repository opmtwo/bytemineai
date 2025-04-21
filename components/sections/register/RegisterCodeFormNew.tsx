import { confirmSignUp, resendSignUpCode, signIn, SignInOutput } from 'aws-amplify/auth';
import classNames from 'classnames';
import { FormEvent, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { UrlObject } from 'url';

import Anchor from '../../Anchor';
import Card from '../../cards/Card';
import FormButton from '../../form/FormButton';
import Logo from '../../Logo';
import Slot from '../../Slot';
import FormField from '../../form/FormField';
import { callApi } from '../../../utils/helper-utils';

const RegisterCodeFormNew = ({
	username,
	password,
	onSubmit,
	onCancel,
}: {
	email: string;
	username: string;
	password: string;
	onSubmit: (user: SignInOutput, urlObject?: UrlObject) => void;
	onCancel: () => void;
}) => {
	const [isBusy, setIsBusy] = useState(false);

	const [otp, setOtp] = useState('');
	const [oldOtp, setOldOtp] = useState('');
	const [otpError, setOtpError] = useState<Error>();

	const [isResent, setIsResent] = useState(false);

	useEffect(() => {
		if (oldOtp.length !== 6 && otp.length === 6) {
			handleSubmit();
		}
	}, [otp]);

	const onResend = async () => {
		setIsBusy(true);
		try {
			await resendSignUpCode({ username });
			setIsResent(true);
		} catch (err: any) {
			setOtpError(err);
		}
		setIsBusy(false);
	};

	const handleSubmit = async (e?: FormEvent) => {
		e?.preventDefault();
		setOtpError(undefined);
		const otpClean = otp.trim();
		if (otpClean.length === 0) {
			setOtpError(new Error('Invalid OTP'));
			return;
		}
		setIsBusy(true);
		try {
			await confirmSignUp({ username, confirmationCode: otpClean });
			const user = await signIn({ username, password });
			await callApi(null, '/api/v1/me/onboard', {
				method: 'POST',
				body: JSON.stringify({}),
			});
			onSubmit(user);
		} catch (err: any) {
			console.log('handleSubmit - error', err);
			setOtpError(err);
		}
		setIsBusy(false);
	};

	const onOtpChange = (newOtp: string) => {
		setOtp((value) => {
			setOldOtp(value);
			return newOtp;
		});
	};

	return (
		<>
			<form method="POST" onSubmit={handleSubmit}>
				<div className="has-text-centered" style={{ marginBottom: 20 }}>
					<Logo />
				</div>
				<div className={classNames('has-text-weight-bold has-text-centered', isResent ? 'has-text-danger' : '')} style={{ marginBottom: 20 }}>
					{isResent
						? `A new verification code was sent to your email ${username}`
						: `A verification code was sent to your email ${username}. Enter the code to continue.`}
				</div>
				<Card>
					<Slot slot="header">
						<big>
							<strong>Enter verification code</strong>
						</big>
					</Slot>
					<Slot slot="body">
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
						{/* <Notification error={otpError} /> */}
						{/* <Anchor href={'/resend'} className="is-block">
							Resend Code
						</Anchor> */}
						<FormButton onClick={onResend}>Resend Code</FormButton>
						<FormButton type="submit" className="ml-5" loading={isBusy} disabled={isBusy} variant={['is-ui-button']}>
							Verify
						</FormButton>
					</Slot>
				</Card>

				<div className="has-text-centered is-small">
					<Anchor href={'/logout'} className="is-block mx-auto mt-3 is-center is-small">
						Logout
					</Anchor>
				</div>
			</form>

			{/* <form method="POST" onSubmit={handleSubmit}>
				<header className="text-center mb-md">
					<Title>{getI18n(locale, 'codeHeadline')}</Title>
				</header>
				<section>
					<FormField className="flex items-center justify-center">
						<OTPInput
							value={otp}
							onChange={onOtpChange}
							numInputs={6}
							inputStyle="input is-large px-0"
							renderSeparator={<span className="mx-xxs"></span>}
							renderInput={(props) => {
								const { className, ...rest } = props;
								return (
									<input
										className={classNames(className, 'py-sm min-w-[2.5rem] text-lg rounded-md bg-slate-200 text-dark mx-xs')}
										{...rest}
									/>
								);
							}}
						/>
					</FormField>
				</section>
				<footer className="text-center">
					<p className="my-lg">
						{isResent ? (
							<>
								<ReplaceableText
									text={getI18n(locale, 'sharedCodeResent') || ''}
									placeholders={{
										target: (
											<a href={`mailto:${username}`} className="underline hover:text-primary">
												{username}
											</a>
										),
									}}
								/>
							</>
						) : (
							<>
								<ReplaceableText
									text={getI18n(locale, 'sharedCodeSent') || ''}
									placeholders={{
										target: (
											<a href={`mailto:${username}`} className="underline hover:text-primary">
												{username}
											</a>
										),
									}}
								/>
							</>
						)}
					</p>
					<Notification error={otpError} />
					<FormButton size="sm" className="px-lg" onClick={onResend} disabled={isResent || isBusy}>
						{getI18n(locale, 'sharedCodeSendAgain')}
					</FormButton>
				</footer>
			</form>
			{isBusy ? <LoaderFullscreen /> : null} */}
		</>
	);
};

export default RegisterCodeFormNew;
