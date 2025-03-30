import { useState } from 'react';
import classNames from 'classnames';
import HeaderMenu from './HeaderMenu';
import HeaderMenuToggle from './HeaderMenuToggle';
import HeaderQuickMenu from './HeaderQuickMenu';
import HeaderLogo from './NavbarLogo';

const Header = ({ onUpgrade }: { onUpgrade: () => void }) => {
	const [isMenuActive, setIsMenuActive] = useState(false);

	const onMenuToggle = () => {
		setIsMenuActive(!isMenuActive);
	};

	return (
		<nav className="navbar has-shadow is-fixed-top is-spaced is-flex is-align-items-center" role="navigation" aria-label="main navigation">
			<div className="navbar-brand is-flex is-align-items-center">
				<HeaderLogo />
			</div>
			<HeaderMenuToggle onToggle={onMenuToggle} />
			<div className={classNames('navbar-menu', { 'is-active': isMenuActive })}>
				<HeaderMenu />
			</div>
			<HeaderQuickMenu />
		</nav>
	);
};

export default Header;
