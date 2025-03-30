import classNames from 'classnames';
import { useRouter } from 'next/router';
import Anchor from './Anchor';
import IconEnrichApi from './icons/IconEnrichApi';
import IconEnrichBulk from './icons/IconEnrichBulk';
import IconEnrichRecord from './icons/IconEnrichRecord';

const EnrichMenu = () => {
	const router = useRouter();

	const menuItems = [
		{
			title: 'Record Enrichment',
			href: '/enrich/record',
			icon: (fill?: string) => <IconEnrichRecord fill={fill} />,
		},
		{
			title: 'Bulk Enrichment',
			href: '/enrich/bulk',
			icon: (fill?: string) => <IconEnrichBulk fill={fill} />,
		},
		{
			title: 'API Enrichment',
			href: '/enrich/api',
			icon: (fill?: string) => <IconEnrichApi fill={fill} />,
		},
	];

	const items = menuItems.map((item) => {
		const isActive = router.pathname === item.href;
		const icon = item.icon(isActive ? 'var(--primary)' : undefined);
		return (
			<li key={item.title} className="is-relative">
				<span className={classNames('is-overlay is-clickable', isActive ? 'has-background-white' : 'has-background-grey-light')}></span>
				<Anchor href={item.href} className={classNames('is-borderless has-background-transparent', isActive ? 'has-text-primary' : 'has-text-grey')}>
					<span className={classNames('icon ml-0 mr-3 enrichicon')}>{icon}</span>
					{item.title}
				</Anchor>
			</li>
		);
	});

	return (
		<div className="tabs is-toggle is-fullwidth has-radius">
			<ul className="has-radius">{items}</ul>
		</div>
	);
};

export default EnrichMenu;
