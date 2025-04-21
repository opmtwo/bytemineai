import classNames from 'classnames';

const FormLabel = ({ label, labelFor, error, iconLabel }: { label?: string; labelFor?: string; error?: Error; iconLabel?: any }) => {
	if (!label) {
		return null;
	}
	const cssClassNames = classNames('label has-text-weight-semibold', { 'has-text-danger': error });
	return (
		<div>
			<label className={cssClassNames} htmlFor={labelFor} style={{ fontSize: '0.88rem' }}>
				{label}
				<span className=" ml-2">{iconLabel}</span>
			</label>
		</div>
	);
};

export default FormLabel;
