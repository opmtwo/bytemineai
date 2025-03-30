import { Location } from '../../types';
import isEmpty from 'validator/lib/isEmpty';
import { GOOGLE_MAP_API_KEY } from '../../consts';

const EnrichMap = ({ location }: { location: Location }) => {
	let address = [location.locality, location.streetAddress, location.majorMetroCity, location.majorMetroState].filter((value) => !isEmpty(value || ''));

	const finalAddress = Array.from(new Set(address)).join(', ');	

	const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}&q=${finalAddress}`;

	return <iframe className="is-block is-fullwidth has-background-white-ter" loading="lazy" src={url}></iframe>;
};

export default EnrichMap;
