import { ReactNode } from 'react';

const EnrichTitle = ({
	icon,
	children,
	enrichLabel = 'Enriched',
	className = 'is-capitalized',
}: {
	icon: ReactNode;
	children: ReactNode;
	enrichLabel?: string;
	className?: string;
}) => (
	<h2 className="is-inline-flex is-align-items-center has-text-weight-medium">
		<span className="icon is-large is-relative mr-3">
			<span className="is-overlay has-background-primary has-radius" style={{ opacity: 0.15 }}></span>
			<span className="material-icons has-text-grey-dark is-size-4">{icon}</span>
		</span>
		<span className={className}>{children}</span>
		{enrichLabel ? (
			<small className="tag is-success ml-3" style={{ padding: '1px 8px', fontSize: '0.8em', height: 'auto' }}>
				{enrichLabel}
			</small>
		) : null}
	</h2>
);

export default EnrichTitle;
