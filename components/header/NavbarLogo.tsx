// import { useSettingsContext } from '../../providers/settings-provider';
import Anchor from '../Anchor';

const HeaderLogo = () => {
	// const { logoUrl, isLogoLoading } = useSettingsContext();

	// if (isLogoLoading) {
	// 	return null;
	// }

	return (
		<Anchor href="/" className="mx-5" style={{ maxWidth: 175 }}>
			{/* {logoUrl ? (
				<img src={logoUrl} alt="" />
			) : (
				<img src="/logo.png" alt="" />
			)} */}
			<img src="/logo.png" alt="" />
		</Anchor>
	);
};

export default HeaderLogo;
