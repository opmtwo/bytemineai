import moment from 'moment';

const EnrichDuration = ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
	let start;
	if (startDate) {
		start = moment(startDate).format('MMM YYYY');
	}
	let end;
	if (endDate) {
		end = moment(endDate).format('MMM YYYY');
	}

	const duration = [start, end].filter((val) => val).join(' - ');

	return <>{duration}</>;
};

export default EnrichDuration;
