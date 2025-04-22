import React from 'react';
import classNames from 'classnames';

type ButtonVariant = 'default' | 'active' | 'muted';

interface FormButtonNewProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	icon?: React.ReactNode;
}

const FormButtonNew: React.FC<FormButtonNewProps> = ({ children, variant = 'default', icon, className, style, ...props }) => {
	const stylesByVariant: Record<ButtonVariant, React.CSSProperties> = {
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

	const sharedStyles: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '0.5rem',
		height: '2.75rem',
		padding: '0.5rem 1.25rem',
		borderRadius: '0.75rem',
		cursor: 'pointer',
		fontWeight: 600,
		fontSize: '1rem',
	};

	const styles = {
		...sharedStyles,
		...stylesByVariant[variant],
		...style,
	};

	return (
		<button className={classNames('btn', className)} style={styles} {...props}>
			{icon}
			{children}
		</button>
	);
};

export default FormButtonNew;
