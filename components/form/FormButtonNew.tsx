import classNames from 'classnames';
import React from 'react';

type ButtonVariant = 'default' | 'active' | 'muted' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconVariant = 'left' | 'right';

interface FormButtonNewProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	icon?: React.ReactNode;
	loading?: boolean;
	size?: ButtonSize;
	iconVariant?: IconVariant;
}

const FormButtonNew: React.FC<FormButtonNewProps> = ({
	children,
	variant = 'default',
	icon,
	loading = false,
	className,
	style,
	disabled,
	size = 'md',
	iconVariant = 'left',
	...props
}) => {
	const stylesByVariant: Record<Exclude<ButtonVariant, 'icon'>, React.CSSProperties> = {
		default: {
			backgroundColor: '#F9F9F9',
			color: '#1F2937',
			border: '1px solid #D1D5DB',
		},
		active: {
			backgroundColor: '#0F0F0F',
			color: '#FFFFFF',
			border: '1px solid #0F0F0F',
		},
		muted: {
			backgroundColor: '#F1F3F5',
			color: '#A0AEC0',
			border: '1px solid transparent',
		},
	};

	const sizeMap: Record<ButtonSize, { height: string; fontSize: string; iconSize: number }> = {
		sm: { height: '2rem', fontSize: '0.875rem', iconSize: 16 },
		md: { height: '2.75rem', fontSize: '1rem', iconSize: 20 },
		lg: { height: '3.25rem', fontSize: '1.125rem', iconSize: 24 },
	};

	const { height, fontSize, iconSize } = sizeMap[size];

	const sharedStyles: React.CSSProperties = {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: variant === 'icon' ? 0 : '0.5rem',
		borderRadius: '0.5rem',
		cursor: loading ? 'not-allowed' : 'pointer',
		fontWeight: 600,
		fontSize,
		height,
		padding: variant === 'icon' ? 0 : '1em',
		width: variant === 'icon' ? height : undefined, // Square shape
	};

	const styles = {
		...sharedStyles,
		...(variant !== 'icon' ? stylesByVariant[variant as Exclude<ButtonVariant, 'icon'>] : {}),
		...style,
	};

	const renderIcon = () =>
		icon || variant === 'icon' ? (
			<span
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: iconSize,
					height: iconSize,
				}}
			>
				{icon || children}
			</span>
		) : null;

	return (
		<button className={classNames('btn', className, { 'is-loading': loading })} style={styles} disabled={loading || disabled} {...props}>
			{loading ? (
				<span
					className="is-absolute is-flex is-align-items-center is-justify-content-center has-background-white has-radius"
					style={{ top: 0, right: 0, bottom: 0, left: 0 }}
				>
					<span
						className="loader"
						style={{
							border: '2px solid #f3f3f3',
							borderTop: '2px solid #555',
							borderRadius: '50%',
							width: '1em',
							height: '1em',
							animation: 'spin 0.6s linear infinite',
						}}
					/>
				</span>
			) : null}
			{variant === 'icon' ? (
				renderIcon()
			) : (
				<>
					{iconVariant === 'left' && renderIcon()}
					{children}
					{iconVariant === 'right' && renderIcon()}
				</>
			)}
		</button>
	);
};

export default FormButtonNew;
