import classNames from "classnames";

const FormLabel = ({ label, labelFor, error, iconLabel }: { label?: string; labelFor?: string; error?: Error; iconLabel?: any }) => {
	if (!label) {
		return null;
	}
	const cssClassNames = classNames('label is-size-7 has-text-weight-medium', { 'has-text-danger': error });
	return (
		<div>
			<label className={cssClassNames} htmlFor={labelFor}>{label}
			<span className=" ml-2">
				{iconLabel}
			 </span>
			</label>
			
			
		</div>
	);
};

export default FormLabel;
