import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';

import { atDataResponseCodes } from '../consts';
import classNames from 'classnames';

interface ContactEmailStatusProps extends HTMLAttributes<HTMLSpanElement> {
	statusCode: string;
}

const ContactEmailStatus = ({ statusCode, className = 'ml-2' }: ContactEmailStatusProps) => {
	const [status, setStatus] = useState<ReactNode>();

	useEffect(() => {
		const newStatus = getEmailValidityStatus(statusCode);
		setStatus(newStatus);
	}, [statusCode]);

	const getCodeInfo = (status: string) => {
		if (['valid'].includes(status)) {
			return { bg: '#edfcf2', fg: '#099250', value: 'Valid' };
		}
		if (['unknown', 'unverifiable'].includes(status)) {
			return { bg: '#fff4e2', fg: '#db9729', value: 'Accept-All' };
		}
		return { bg: '#fff0f1', fg: '#ed1a15', value: 'Invalid' };
	};

	const getEmailValidityStatus = (code: string) => {
		if (!code) {
			return null;
		}
		const status = (atDataResponseCodes as any)[code]?.status;
		const { bg, fg, value } = getCodeInfo(status);
		return (
			<span className={classNames('has-radius px-3 py-1', className)} style={{ backgroundColor: bg, color: fg }}>
				{value}
			</span>
		);
	};

	return status;
};

export default ContactEmailStatus;
