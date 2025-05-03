import Link from 'next/link';
import { HTMLAttributes } from 'react';

import IconNewHome from './icons/IconNewHome';
import IconNewBreadcrumbArrow from './icons/IconNewBreadcrumbArrow';

interface BreadcrumbItem {
	label: string;
	href?: string;
	isCurrent?: boolean;
}

interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
	items: BreadcrumbItem[];
}

const Breadcrumb = ({ title, items, className = 'is-flex is-align-items-center is-size-6 has-text-weight-semibold', ...rest }: BreadcrumbProps) => {
	return (
		<aside>
			<nav className={className} aria-label="Breadcrumb" {...rest}>
				<Link href="/" className="is-flex is-align-items-center">
					<IconNewHome width={16} />
				</Link>
				{items.map((item, index) => (
					<div key={index} className="is-flex is-align-items-center">
						<span className="mx-5">
							<IconNewBreadcrumbArrow width={6} />
						</span>
						{item.isCurrent ? (
							<span>{item.label}</span>
						) : (
							<Link href={item.href || '#'}>
								{item.label}
							</Link>
						)}
					</div>
				))}
			</nav>
			<h1 className="title is-3 has-text-weight-bold has-text-dark my-5">{title}</h1>
		</aside>
	);
};

export default Breadcrumb;
