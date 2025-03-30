import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ColorResult, ChromePicker } from 'react-color';
import CardAnimatePresence from '../cards/CardAnimatePresence';
import FormField from './FormField';
import FormLabel from './FormLabel';

const FormInput = ({
	type = 'text',
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
	isColorPicker = false,
	iconLeft,
	iconRight,
	required,
	readonly,
	disabled,
	multiline = false,
	onChange,
	iconLabel
}: {
	type?: InputHTMLAttributes<unknown>['type'];
	name?: string;
	value?: string | number;
	label?: string;
	placeholder?: string;
	className?: string;
	fieldClassName?: string;
	color?: 'is-primary' | 'is-secondary' | 'is-error' | 'is-info' | 'is-success' | 'is-warning';
	size?: 'is-small' | 'is-normal' | 'is-medium' | 'is-large';
	error?: Error;
	isLast?: boolean;
	isColorPicker?: boolean;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	multiline?: boolean;
	onChange?: Function;
	iconLabel?:ReactNode
}) => {
	const [isColorPickerActive, setisColorPickerActive] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | undefined>) => {
		if (onChange && e && e.target) {
			onChange(e.target.value);
		}
	};

	const onColorPickerToggle = () => setisColorPickerActive(!isColorPickerActive);

	const onColorChange = (color: ColorResult, e: ChangeEvent) => {
		onChange && onChange(color.hex);
	};

	const cssClassNames = classNames('input', color, size, className, {'is-danger': error});

	return (
		<>
			<FormField isLast={isLast} className={fieldClassName}>
				{isColorPickerActive === true && <span className="is-overlay is-fixed" style={{ zIndex: 1 }} onClick={onColorPickerToggle}></span>}
				<FormLabel label={label} error={error} iconLabel={iconLabel}  /> 
				<div className={classNames('control', { 'has-icons-left': iconLeft }, { 'has-icons-right': iconRight || isColorPicker })}>
					{multiline ? (
						<textarea
							name={name}
							value={value}
							placeholder={placeholder}
							className={cssClassNames}
							onChange={handleChange}
							required={required}
							readOnly={readonly}
							disabled={disabled}
						/>
					) : (
						<input
							type={type}
							name={name}
							value={value}
							placeholder={placeholder}
							className={cssClassNames}
							onChange={handleChange}
							required={required}
							readOnly={readonly}
							disabled={disabled}
						/>
					)}
					{iconLeft && <span className={classNames('icon is-left', size)}>{iconLeft}</span>}
					{iconRight && <span className={classNames('icon is-right', size)}>{iconRight}</span>}
					{isColorPicker === true && (
						<>
							<span className="icon is-small is-right is-clickable is-clipped" onClick={onColorPickerToggle}>
								<span className="is-overlay m-3" style={{ backgroundColor: value?.toString(), borderRadius: 2 }}></span>
							</span>
							{isColorPickerActive === true && (
								<span style={{ zIndex: 1, position: 'absolute', right: 0, bottom: '100%' }}>
									<ChromePicker color={value?.toString()} onChange={onColorChange} disableAlpha={true} />
								</span>
							)}
							<span className="is-overlay is-clickable" onClick={onColorPickerToggle}></span>
						</>
					)}
				</div>
				<CardAnimatePresence isActive={error !== undefined}>
					<p className="help is-danger m-0 pt-3">{error?.message}</p>
				</CardAnimatePresence>
			</FormField>
		</>
	);
};

export default FormInput;
