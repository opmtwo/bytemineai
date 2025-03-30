import classNames from 'classnames';
import { CSSProperties } from 'react';
import FormField from './FormField';
import FormLabel from './FormLabel';

const FormProgressBar = ({
	value,
	total = 100,
	label,
	width,
	height = 3,
	bg = '#D8D8D8',
	fg = 'var(--primary)',
	className,
	style,
	isLast = false,
	fieldStyle,
	fieldClassName,
}: {
	value: number;
	total?: number;
	label?: string;
	width?: number;
	height?: number;
	bg?: string;
	fg?: string;
	className?: string;
	style?: CSSProperties;
	isLast?: boolean;
	fieldStyle?: CSSProperties;
	fieldClassName?: string;
}) => {
	return (
		<FormField className={fieldClassName} style={fieldStyle} isLast={isLast}>
			{label ? <FormLabel label={label} /> : null}
			<div className={classNames('is-relative has-radius is-clipped', className)} style={{ width, height, backgroundColor: bg, ...style }}>
				<div
					className="is-overlay has-radius"
					style={{ backgroundColor: fg, width: `${(value / total) * 100}%`, transition: 'width 0.3s ease-in-out' }}
				></div>
			</div>
		</FormField>
	);
};

export default FormProgressBar;
