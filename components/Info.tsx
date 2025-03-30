const Info = ({ name, value }: { name: string; value: number | string }) => (
	<div className="has-text-centered has-text-weight-normal is-info-card">
		<span className="is-block title is-3 has-text-primary has-text-weight-normal">{value}</span>
		<span className="is-size-6 has-text-grey">{name}</span>
	</div>
);

export default Info;
