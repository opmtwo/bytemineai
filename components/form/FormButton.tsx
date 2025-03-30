import { CSSProperties, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

type ButtonVariant = 'is-outlined' | 'is-inverted' | 'is-rounded' | 'is-icon' | 'is-ui-button';

const FormButton = ({
	children,
	icon,
	className,
	style,
	type = 'button',
	color = 'is-primary',
	size,
	variant,
	disabled = false,
	loading = false,
	onClick,
}: {
	children?: ReactNode;
	icon?: ReactNode;
	className?: string;
	style?: CSSProperties;
	type?: 'button' | 'submit' | 'reset';
	color?: 'is-primary' | 'is-link' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger' | 'is-dark' | 'is-default' ;
	size?: 'is-small' | 'is-normal' | 'is-medium' | 'is-large';
	variant?: ButtonVariant[] | ButtonVariant;
	disabled?: boolean;
	loading?: boolean;
	onClick?: Function;
}) => {
	const handleClick = (event: MouseEvent) => {
		onClick && onClick(event);
	};

	const cssClassNames = classNames('button', color, size, variant, className, loading ? 'is-loading' : '');

	return (
		<button onClick={handleClick} className={cssClassNames} type={type} disabled={disabled} style={style}>
			{children || null}
			{icon && (
				<span className={classNames('icon', size)}>
					{icon}
				</span>
			)}
		</button>
	);
};

export default FormButton;
