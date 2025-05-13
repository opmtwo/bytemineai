import { HTMLAttributes, ReactNode } from 'react';

interface AuthLayoutProps extends HTMLAttributes<HTMLDivElement> {
	//
}

const AuthLayout = ({ children, className = 'modal-card is-flex is-flex-direction-column is-justify-content-center p-5', ...rest }: AuthLayoutProps) => (
	<div className={className} {...rest}>
		{children}
	</div>
);

export default AuthLayout;
