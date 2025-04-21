import { Children, ReactElement, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAuthContext } from '../../providers/auth-data-provider';
import { useSettingsContext } from '../../providers/settings-provider';
import ContactForm from '../ContactForm';
import Header from '../header/Header';
import Modal from '../modals/Modal';
import { useRouter } from "next/router"


const PageLayout = ({
	children,
	size = 'is-fullhd',
}: {
	children: ReactNode;
	size?: 'is-fullhd' | 'is-widescreen' | 'is-max-desktop' | 'is-max-widescreen' | "";
}) => {
	const router = useRouter();
	const pathName = router?.asPath;
	const childrenArray = Children.toArray(children) as unknown as ReactElement[];
	const [isContactModalActive, setIsContactModalActive] = useState(false);

	const { user } = useAuthContext();
	const { settings, initSettings } = useSettingsContext();
	const groupName = user?.attributes['custom:group_name'];
		const currentPathName = (pathName ==="/campaigns/summary/" || pathName === "/campaigns/contacts/" ||  pathName ===  "/campaigns/settings/" ||  pathName ===  "/campaigns/builder/")
	useEffect(() => {
		groupName && initSettings(groupName);
	}, [groupName]);

	useEffect(() => {
		document.body.style.setProperty('--primary', settings?.['custom:color_code'] || '');
	}, [settings?.['custom:color_code']]);

	const onUpgrade = () => setIsContactModalActive(true);

	const onUpgradeCancel = () => setIsContactModalActive(false);

	const onUpgradeSubmit = () => { };

	return (
		<>
			<Header onUpgrade={onUpgrade} />
			<section className="section">
				<main
					className={classNames(currentPathName === true   ? "" : 'container', size)}
				>
					{children}
				</main>
			</section>
			<Modal isActive={isContactModalActive} onCancel={onUpgradeCancel}>
				<ContactForm onSubmit={onUpgradeSubmit} onCancel={onUpgradeCancel} />
			</Modal>
		</>
	);
};

export default PageLayout;
