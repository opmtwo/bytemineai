import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => (
	<section className="section">
		<div
			className="modal-card is-flex is-flex-direction-column is-justify-content-center p-5"
			style={{ height: 'auto', maxHeight: 'none', minHeight: 'calc(100vh - 6rem)' }}
		>
			{children}
		</div>
	</section>
);

export default AuthLayout;
