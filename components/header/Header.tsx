import classNames from 'classnames';
import { useState } from 'react';

import HeaderMenu from './HeaderMenu';
import HeaderMenuToggle from './HeaderMenuToggle';
import HeaderQuickMenu from './HeaderQuickMenu';
import HeaderLogo from './NavbarLogo';
import { useAuthContext } from '../../providers/auth-data-provider';

const Header = ({ onUpgrade }: { onUpgrade: () => void }) => {
	const [isMenuActive, setIsMenuActive] = useState(false);

	const { self, refresh } = useAuthContext();

	const avatarUrl = self?.avatarS3Url ?? '/avatar.png';

	const onMenuToggle = () => {
		setIsMenuActive(!isMenuActive);
	};

	return (
		<nav className="navbar is-fixed-top is-flex is-align-items-center has-border" role="navigation" aria-label="main navigation">
			<div className="navbar-start">
				<div className="navbar-brand is-flex is-align-items-center is-justify-content-center">
					<HeaderLogo />
				</div>
			</div>
			{/* <HeaderMenuToggle onToggle={onMenuToggle} />
			<div className={classNames('navbar-menu', { 'is-active': isMenuActive })}>
				<HeaderMenu />
			</div>
			<HeaderQuickMenu /> */}
			<div className="navbar-end">
				{/* <div className="is-clipped image is-48x48 has-radius is-rounded">
					<img src={avatarUrl} alt="" />
				</div> */}
				<HeaderQuickMenu />
			</div>
		</nav>
	);
};

export default Header;
