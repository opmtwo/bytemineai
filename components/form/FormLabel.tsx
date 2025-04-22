import classNames from 'classnames';

const FormLabel = ({
	label,
	labelFor,
	error,
	iconLabel,
	required,
}: {
	label?: string;
	labelFor?: string;
	error?: Error;
	iconLabel?: any;
	required?: boolean;
}) => {
	if (!label) {
		return null;
	}
	const cssClassNames = classNames('label has-text-weight-medium', { 'has-text-danger': error });
	return (
		<div>
			<label className={cssClassNames} htmlFor={labelFor}>
				{label}
				{required ? <span className="has-text-info">*</span> : null}
				<span className=" ml-2">{iconLabel}</span>
			</label>
		</div>
	);
};

export default FormLabel;
