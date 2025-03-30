import { Location } from '../../types';
import isEmpty from 'validator/lib/isEmpty';

const EnrichLocation = ({ location }: { location: Location }) => {
	const address = [ location.majorMetroCity, location.locality,location.majorMetroState, location.countryISO2]
		.filter((value) => !isEmpty(value || '') && value?.trim()?.length)

	const finalAddress = Array.from(new Set(address)).join(', ');

	if (!finalAddress || !finalAddress?.trim()?.length) {
		return null;
	}

	return <>{finalAddress}</>;
};

export default EnrichLocation;
