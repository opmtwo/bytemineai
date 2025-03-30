import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from 'uuid';
import classNames from 'classnames';
import FormField from './FormField';
import FormLabel from './FormLabel';

const FormImage = ({
	children,
	name,
	value,
	label,
	placeholder = 'Select Image',
	className,
	color,
	error,
	isLast = false,
	onChange,
}: {
	children: ReactNode;
	name?: string;
	value?: string | number;
	label?: string;
	placeholder?: string;
	className?: string;
	color?: 'is-primary' | 'is-secondary' | 'is-error' | 'is-info' | 'is-success' | 'is-warning';
	error?: Error;
	isLast?: boolean;
	onChange?: Function;
}) => {
	const [id, setId] = useState(v4());
	const [base64, setBase64] = useState('');

	const fileRef = useRef<HTMLInputElement>(null);

	const getImageAsBase64 = () =>
		new Promise((resolve, reject) => {
			if (!fileRef.current?.files?.length) {
				return reject();
			}
			const reader = new FileReader();
			reader.readAsDataURL(fileRef.current?.files[0] as Blob);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const handleChange = async (e: ChangeEvent<HTMLInputElement | undefined>) => {
		if (!e.target || !e.target.files || !e.target.files.length) {
			return;
		}
		const selectedFile = e.target.files[0];
		if (!selectedFile || ['image/jpeg', 'image/jpg', 'image/png'].includes(selectedFile.type) === false) {
			return alert('Please select a valid jpg / png / svg image');
		}
		console.log({ selectedFile });
		let imageBase64;
		try {
			imageBase64 = await getImageAsBase64();
			setBase64(imageBase64 as string);
		} catch (err) {
			console.log('Error updating live preview', err);
			return;
		}
		onChange && onChange(imageBase64);
	};

	const cssClassNames = classNames(
		'input is-flex is-align-items-center is-justify-content-center is-overlay is-clickable has-text-grey p-5',
		color,
		className
	);

	return (
		<FormField isLast={isLast}>
			<FormLabel label={label} />
			<div className={classNames('control')} style={{ height: 200 }}>
				<input ref={fileRef} id={id} type="file" name={name} placeholder={placeholder} onChange={handleChange} className="is-hidden" accept="image/*" />
				<label htmlFor={id} className={cssClassNames} style={{ height: 'auto' }}>
					{base64 ? <img className="has-radius" src={base64} alt="" style={{ maxHeight: '100%' }} /> : children ? children : placeholder}
				</label>
			</div>
			<AnimatePresence>{error ? <motion.p className="help is-danger">{error.message}</motion.p> : null}</AnimatePresence>
		</FormField>
	);
};

export default FormImage;
