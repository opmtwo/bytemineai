import { ReactNode } from 'react';
import Logo from '../Logo';

const Overlay = () => <div className="is-overlay has-background-primary" style={{ zIndex: 1, opacity: 0.75 }}></div>;

const AuthLayout = ({ children }: { children: ReactNode }) => (
	<div className="auth hero is-fullheight is-flex is-flex-wrap-wrap is-flex-direction-row">
		<div className="column is-12-mobile is-12-tablet is-6-widescreen is-relative p-0 is-hidden-touch is-hidden-desktop-only"  style={{ backgroundImage: `linear-gradient(to bottom, #fff, #051551)`, height: '100vh' }}>
			{/* <img src="/welcome.jpg" alt="" className="is-overlay" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top right' }} /> */}
			{/* <Overlay /> */}
			<div className="is-relative columns hero is-fullheight is-tablet is-vcentered is-centered" style={{ zIndex: 1 }}>
				<span className="mb-5" style={{ 
					// filter: `invert()` 
					}}>
					<Logo maxWidth={300} maxHeight={300} />
				</span>
				<h1 className="title is-3 has-text-white has-text-centered has-text-weight-normal" style={{ maxWidth: 550 }}>
					Get accurate lead & contact data at scale via REST APIs and our platform.
				</h1>
			</div>
		</div>
		<div className="column is-12-mobile is-12-tablet is-6-widescreen" style={{ height: '100vh', overflowY: 'auto' }}>
			<div className="is-hidden-widescreen">
				<Overlay />
			</div>
			<img src="/welcome.jpg" alt="" className="is-overlay is-hidden-widescreen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
			<div className="columns hero is-fullheight is-tablet is-vcentered is-centered py-6">
				<div className="column is-10-mobile is-9-tablet is-8-widescreen" style={{ zIndex: 1 }}>
					{children}
				</div>
			</div>
		</div>
	</div>
);

export default AuthLayout;
