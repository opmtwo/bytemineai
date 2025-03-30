const EnrichSpecialties = ({ values }: { values: string[] }) => {
	const items = values.map((value) => (
		<small key={value} className="tag is-ui is-relative is-light mr-3 mb-3 is-size-7" style={{ backgroundColor: '#ece9df' }}>
			{value}
		</small>
	));
	return <>{items}</>;
};

export default EnrichSpecialties;
