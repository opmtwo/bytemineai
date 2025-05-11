import {FormEvent, useEffect, useState } from 'react';
import { API,Auth } from 'aws-amplify';
import { useAuthContext } from '../../../providers/auth-data-provider';
import FormInput from '../../form/FormInput';
import FormButton from '../../form/FormButton';
import Slot from '../../Slot';
import Card from '../../cards/Card';
import CardRelated from '../../cards/CardRelated';
import Logo from '../../Logo';
import Anchor from "../../Anchor";
import { useRouter } from 'next/router';


const RegisterCodeForm = ({  }: {  }) => {
	const { onSignIn } = useAuthContext();
    const router = useRouter();
	const [otp, setOtp] = useState('');
	const { onSignOut } = useAuthContext();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();
	const [otpError, setOtpError] = useState<Error>();
	const [isBusy, setIsBusy] = useState(false);
	const [isResent, setIsResent] = useState(false);
	const query = router.query;

	useEffect(() => {
		const send_email = async () => {

			if (query?.email && query.email.toString().trim()){
				const email_resend_req = {
					body: {
						email: query.email.toString().trim()
					}
				}
				console.log('email_resend_req',email_resend_req);
				const email_resend_resp = await API.post('nymblrRegisterApi','/resend-email-verification',email_resend_req);
				console.log('email_resend_resp', email_resend_resp);
			} else{
				console.log('didnt send');
			}
		}
		//send_email();


	},[query])
	const checkIfValid = async (in_token: string) => {
		setIsBusy(true);
		setOtpError(undefined);
		let otpNormalized = '';
		if (in_token.length>0){
			otpNormalized = in_token.trim();
		} else {
			otpNormalized = otp.trim();
		}

		if (otpNormalized.length === 0) {
			setOtpError(new Error('Invalid OTP'));
			return;
		}
		try {

			let verify_request = {
				body:{
					email:query.email,
					token:otpNormalized
				}
			}
			let now = new Date();
			let now_int = now.getTime();
			console.log('verify_request - ',verify_request);
			let verify_response = await API.post('nymblrRegisterApi','/verify-email',verify_request);

			let newuser = await Auth.currentAuthenticatedUser();
			onSignIn(newuser);
			console.log('verify_response - ',verify_response);
			setIsBusy(false);

		} catch (err) {
			console.log(err);
			setOtpError(err);
			setIsBusy(false);
		}
	}

	useEffect(()=>{
		let in_token = '';
		let in_email = '';

		if (query?.token && query.token.toString()){
			in_token = query.token.toString().trim();
			setOtp(in_token);
		}
		if (query?.email && query.email.toString()){
			in_email = query.email.toString().trim();
			setEmail(in_email)
		}

		if (in_token != '' && in_email != ''){
			checkIfValid(in_token);
		}
	},[query]);


	/**
	 * Handle resend verification code button clieck event
	 * @returns {Void}
	 */
	const onResend = async () => {
		setIsBusy(true);
		try {
			//await Auth.resendSignUp(username);
			//resend email here

			setIsResent(true);
		} catch (err) {
			setOtpError(err);
		}
		setIsBusy(false);
	};

	/**
	 * Handle verification code change event
	 * @param {string} code the verification code
	 * @returns {Void}
	 */
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		checkIfValid('');
	};

	return (
		<form method="POST" onSubmit={onSubmit}>
			<div className="has-text-centered" style={{ marginBottom: 20 }}>
				<Logo />
			</div>
			<div className="has-text-centered"  style={{ marginBottom: 20 }}><strong>{isResent
				? `A new verification code was sent to your email`
				: `A verification code was sent to your email. Enter the code to continue.`}</strong></div>
			<Card>
				<Slot slot="header">
					<big>
						<strong>Enter verification code</strong>
					</big>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="email" value={email} label="E-Mail"  required={true} error={emailError} disabled={true} />
						<FormInput name="code" value={otp} label="Verification code" onChange={setOtp} required={true} error={otpError} />
					</div>
				</Slot>
				<Slot slot="footer">
					<Anchor href={"/resend"}  className="is-block">Resend Code</Anchor>
					<FormButton type="submit" className="ml-5" loading={isBusy} disabled={isBusy} variant={['is-ui-button']}>
						Verify
					</FormButton>
				</Slot>
			</Card>

			<div className="has-text-centered is-small">
				<Anchor href={"/logout"}  className="is-block mx-auto mt-3 is-center is-small">Logout</Anchor>
			</div>
		</form>
	);
};

export default RegisterCodeForm;
