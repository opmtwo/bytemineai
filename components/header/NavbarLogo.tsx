import { useSettingsContext } from '../../providers/settings-provider';
import Anchor from '../Anchor';

const HeaderLogo = () => {
	const { logoUrl, isLogoLoading } = useSettingsContext();

	if (isLogoLoading) {
		return null;
	}

	return (
		<Anchor href="/" className="navbar-item">
			{logoUrl ? (
				<img src={logoUrl} alt="" />
			) : (
				<img src="/logo.png" alt="" />
			)}
		</Anchor>
	);
};

export default HeaderLogo;
