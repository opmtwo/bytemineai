import { useSettingsContext } from '../providers/settings-provider';
import Anchor from './Anchor';
import CardAnimatePresence from './cards/CardAnimatePresence';

const Logo = ({
	href = '/',
	maxWidth = 256,
	maxHeight = 100,
}: {
	href?: string;
	maxWidth?: number | string;
	maxHeight?: string | number;
}) => {
	const { logoUrl, isLogoLoading } = useSettingsContext();

	return (
		<CardAnimatePresence isActive={!isLogoLoading}>
			<Anchor className="is-block" href="/">
				{logoUrl ? (
					<img src={logoUrl} alt="" style={{ maxWidth, maxHeight }} />
				) : (
					<img src="/logo.png" alt="" style={{ maxWidth, maxHeight }} />
				)}
			</Anchor>
		</CardAnimatePresence>
	);
};

export default Logo;
