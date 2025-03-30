import { useEffect, useState } from 'react';
import { Contact } from '../types';
import { getEmailValidityStatus } from '../utils/contact-utilsx';

const ContactEmailStatus = ({ contact }: { contact: Contact }) => {
	const [status, setStatus] = useState('');

	useEffect(() => {
		const newStatus = getEmailValidityStatus(contact);
		setStatus(newStatus);
	}, [contact]);

	return <span>{status}</span>;
};

export default ContactEmailStatus;
