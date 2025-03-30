import { ReactNode } from 'react';

const EnrichInfo = ({ name, description }: { name: ReactNode; description: ReactNode }) => {
	if (!name || !description) {
		return null;
	}

	return (
		<div className="mb-6">
			<div className="has-text-grey has-text-normal mb-2">{name}</div>
			<div className="has-text-dark is-capitalized">{description}</div>
		</div>
	);
};

export default EnrichInfo;
