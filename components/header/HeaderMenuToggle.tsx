import { MouseEventHandler } from 'react';

const HeaderMenuToggle = ({ onToggle }: { onToggle: MouseEventHandler }) => (
	<a role="button" className="navbar-burger" onClick={onToggle}>
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
	</a>
);

export default HeaderMenuToggle;
