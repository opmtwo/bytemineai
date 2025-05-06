import { useEffect, useState } from 'react';

import { IBytemineContact } from '../types';
import { getEmailValidityStatus } from '../utils/contact-utilsx';

const ContactEmailStatus = ({ contact }: { contact: IBytemineContact }) => {
	const [status, setStatus] = useState('');

	useEffect(() => {
		const newStatus = getEmailValidityStatus(contact);
		setStatus(newStatus);
	}, [contact]);

	return <span>{status}</span>;
};

export default ContactEmailStatus;
