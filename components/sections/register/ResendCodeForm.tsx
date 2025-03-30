import { FormEvent, useState } from 'react';
import { API } from 'aws-amplify';
import { useAuthContext } from '../../../providers/auth-data-provider';
import FormInput from '../../form/FormInput';
import FormButton from '../../form/FormButton';
import Slot from '../../Slot';
import Card from '../../cards/Card';
import CardRelated from '../../cards/CardRelated';
import Logo from '../../Logo';
import Anchor from "../../Anchor";
import {useRouter} from 'next/router';

const ResendCodeForm = ({  }: {  }) => {
	const { onSignIn } = useAuthContext();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();
	const [isBusy, setIsBusy] = useState(false);
	const [isResent, setIsResent] = useState(false);

	/**
	 * Handle resend verification code button clieck event
	 * @returns {Void}
	 */


	/**
	 * Handle verification code change event
	 * @param {string} code the verification code
	 * @returns {Void}
	 */
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsBusy(true);
		setEmailError(undefined);
		const emailNormalized = email.trim();
		if (emailNormalized.length === 0) {
			setEmailError(new Error('Invalid Email'));
			return;
		}
		try {

			const email_resend_req = {
				body: {
					email: email
				}
			}
			console.log('email_resend_req',email_resend_req);
			const email_resend_resp = await API.post('nymblrRegisterApi','/resend-email-verification',email_resend_req);
			console.log('email_resend_resp', email_resend_resp);
			if (email_resend_resp.message==='sent'){
				router.push({pathname:'/verify-email',query:{email:email}});
				setIsBusy(false);
			}


		} catch (err) {
			setEmailError(err);
			setIsBusy(false);
		}
	};

	return (
		<form method="POST" onSubmit={onSubmit}>
			<div className="has-text-centered" style={{ marginBottom: 20 }}>
				<Logo />
			</div>
			<Card>
				<Slot slot="header">
					<big>
						<strong>Enter your e-mail and we&apos;ll resend your verification code</strong>
					</big>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="code" value={email} label="E-Mail" onChange={setEmail} required={true} error={emailError} />
					</div>
				</Slot>
				<Slot slot="footer">

					<FormButton type="submit" className="ml-5" loading={isBusy} disabled={isBusy} variant={['is-ui-button']}>
						Resend
					</FormButton>
				</Slot>
			</Card>
			<CardRelated>
				{isResent
					? `A new verification code was sent to your email`
					: ``}
			</CardRelated>

		</form>
	);
};

export default ResendCodeForm;
