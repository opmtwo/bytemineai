import { ChangeEvent, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import FormField from './FormField';
import FormLabel from './FormLabel';
import CardAnimatePresence from '../cards/CardAnimatePresence';

const FormSelect = ({
	options,
	idField = 'id',
	nameField = 'name',
	name,
	value,
	label,
	placeholder,
	className,
	color,
	size = 'is-normal',
	error,
	isLast = false,
	iconLeft,
	iconRight,
	required,
	onChange,
}: {
	options: any[];
	idField?: string;
	nameField?: string;
	name?: string;
	value?: string | number;
	label?: string;
	placeholder?: string;
	className?: string;
	color?: 'is-primary' | 'is-secondary' | 'is-error' | 'is-info' | 'is-success' | 'is-warning';
	size?: 'is-small' | 'is-normal' | 'is-medium' | 'is-large';
	error?: Error;
	isLast?: boolean;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	required?: boolean;
	onChange?: Function;
}) => {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		if (onChange && e && e.target) {
			onChange(e.target.value);
		}
	};

	const cssClassNames = classNames('is-fullwidth', color, size, className);

	const optionsList = options.map((option, index) => (
		<option key={option[idField]} value={option[idField]}>
			{option[nameField]}
		</option>
	));

	return (
		<FormField isLast={isLast}>
			<FormLabel label={label} error={error} />
			<p className={classNames('select is-fullwidth', { 'has-icons-left': iconLeft }, { 'has-icons-right': iconRight }, {'is-danger': error})}>
				<select name={name} value={value} className={cssClassNames} onChange={handleChange} required={required}>
					<option value="">{placeholder}</option>
					{optionsList}
				</select>
				{iconLeft && <span className={classNames('icon is-left', size)}>{iconLeft}</span>}
				{iconRight && <span className={classNames('icon is-right', size)}>{iconRight}</span>}
			</p>
			<CardAnimatePresence isActive={error !== undefined}>
				<p className="help is-danger m-0 pt-3">{error?.message}</p>
			</CardAnimatePresence>
		</FormField>
	);
};

export default FormSelect;
