import { KeyboardEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ActionMeta, MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import CardAnimatePresence from '../cards/CardAnimatePresence';
import FormField from './FormField';
import FormLabel from './FormLabel';

const styles = {
	control: (provided: object, state: any) => ({
		...provided,
		borderWidth: '0 0 1px 0',
		minHeight: '42px',
		borderRadius: '0',
		boxShadow: 'none',
		borderColor: state.isFocused ? 'var(--primary)' : 'transparent',
		'&:hover': {
			borderColor: state.isFocused ? 'var(--primary)' : '#b5b5b5',
		},
	}),
	valueContainer: (provided: object, state: any) => ({
		...provided,
		borderWidth: '0 0 1px 0',
		minHeight: '40px',
		padding: '6px 0',
		borderRadius: '0',
		boxShadow: 'none',
		borderColor: state.isFocused ? 'var(--primary)' : 'transparent',
		'&:hover': {
			borderColor: state.isFocused ? 'var(--primary)' : '#b5b5b5',
		},
	}),
	indicatorsContainer: (provided: object, state: any) => ({
		...provided,
		borderWidth: '0 0 1px 0',
		minHeight: '36px',
		borderRadius: '0',
		boxShadow: 'none',
		borderColor: state.isFocused ? 'var(--primary)' : 'transparent',
		'&:hover': {
			borderColor: state.isFocused ? 'var(--primary)' : '#b5b5b5',
		},
	}),
	menu: (provided: object, state: any) => ({
		...provided,
		margin: 0,
		border: 'none',
		borderRadius: '0 0 6px 6px',
		boxShadow: '0 0 30px 5px rgba(0, 0, 0, 0.1)',
	}),
	menuList: (provided: object, state: any) => ({
		...provided,
	}),
	singleValue: (provided: object, state: any) => ({
		...provided,
	}),
	multiValue: (provided: object, state: any) => ({
		...provided,
		zIndex: 1,
		position: 'relative',
		backgroundColor: '#90EE90',
		borderRadius: '20px',
		'&::after': {
			content: "''",
			zIndex: -1,
			opacity: 0.1,
			position: 'absolute',
			top: 0,
			right: 0,
			left: 0,
			bottom: 0,
			backgroundColor: 'var(--primary)',
			borderRadius: '20px',
		},
	}),
};

const FormSelectCreatable = ({
	options,
	children,
	hasComponents = false,
	idField = 'id',
	nameField = 'name',
	isMulti = false,
	minChars = 0,
	name,
	value,
	label,
	placeholder,
	className,
	fieldClassName,
	color,
	size = 'is-normal',
	error,
	isLast = false,
	isClearable = true,
	onChange,
	iconLeft = null,
	iconRight = null,
	onSubmit,
}: {
	options: any[];
	children?: ReactNode;
	hasComponents?: boolean;
	idField?: string;
	nameField?: string;
	name?: string;
	value?: any[];
	isMulti?: boolean;
	minChars?: number;
	label?: string;
	placeholder?: string;
	className?: string;
	fieldClassName?: string;
	color?: 'is-primary' | 'is-secondary' | 'is-error' | 'is-info' | 'is-success' | 'is-warning';
	size?: 'is-small' | 'is-normal' | 'is-medium' | 'is-large';
	error?: Error;
	isLast?: boolean;
	isClearable?: boolean;
	required?: boolean;
	onChange: Function;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	onSubmit?: Function;
}) => {
	const [textValue, setTextValue] = useState('');
	const [showOptions, setShowOptions] = useState(false);
	const [lastKey, setLastKey] = useState<string>();

	useEffect(() => {
		setShowOptions(textValue.trim().length >= minChars);
	}, [value]);

	const handleInputChange = useCallback((newValue: string) => {
		setShowOptions(newValue.trim().length >= minChars);
		setTextValue(newValue);
	}, []);

	const handleChange = (newValue: MultiValue<string | number>, actionMeta: ActionMeta<string | number>) =>
		onChange(newValue);

	const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
		setLastKey(e.key);
		if (lastKey === e.key && e.key === 'Enter') {
			onSubmit && onSubmit();
		}
	};

	const cssClassNames = classNames('is-react-select', color, size, className, { 'is-danger': error });
	const multiValueRemoveStyles = (baseStyles: any, state: any) => ({
		...baseStyles,
		// display: "none",
		backgroundColor: "#90EE90",
		opacity: 0.5,
		borderRadius: "20px",
		color: "#00000",
		borderLeft: "1px solid #d8d8d8",
		zIndex: 1,

	});
	return (
		<FormField className={fieldClassName} isLast={isLast}>
			<FormLabel label={label} error={error} />
			<FormField>
				{iconLeft}
				<CreatableSelect
					name={name}
					placeholder={placeholder}
					className={cssClassNames}
					isMulti={isMulti}
					onChange={handleChange}
					onInputChange={handleInputChange}
					options={showOptions ? options : []}
					noOptionsMessage={({ inputValue }) =>
						showOptions ? 'No results found' : `Type atleast ${minChars} characters`
					}
					value={value}
					styles={{
						...(styles as any),
						multiValueRemove: multiValueRemoveStyles
					}}
					isClearable={isClearable}
					components={hasComponents ? undefined : {
						Menu: () => null,
						MenuList: () => null,
						DropdownIndicator: () => null,
						IndicatorSeparator: () => null,
					}}
					onKeyDown={onKeyDown}
				/>
				{iconRight}
			</FormField>
			<CardAnimatePresence isActive={error !== undefined}>
				<p className="help is-danger m-0 pt-3">{error?.message}</p>
			</CardAnimatePresence>
			{children}
		</FormField>
	);
};

export default FormSelectCreatable;
