import Head from 'next/head';
import { useSettingsContext } from '../providers/settings-provider';

const Favicon = () => {
	const { settings } = useSettingsContext();
	if (!settings?.sub) {
		return null;
	}
	const url = settings['custom:icon_s3_url']  || '/favicon.png';
	return (
		<Head>
			<link rel="icon" href={url} />
		</Head>
	);
};

export default Favicon;
