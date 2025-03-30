import { FormEvent, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { sortBy } from 'lodash';
import { EnrichSearchObj, EnrichType } from '../types';
import { useAuthContext } from '../providers/auth-data-provider';
import FormButton from './form/FormButton';
import FormInput from './form/FormInput';
import IconSearch from './icons/IconSearch';
import QueryLoader from './QueryLoader';
import { createEnrichSearch } from '../src/graphql/mutations';
import { listEnrichSearchByType } from '../src/graphql/queries';
import CardAnimatePresence from './cards/CardAnimatePresence';

const EnrichSearch = ({
	type,
	placeholder,
	getTerm,
	getIsTermValid,
	getIsFormValid,
	onSubmit,
}: {
	type: EnrichType;
	placeholder: string;
	getTerm: (query: string) => string;
	getIsTermValid: (query: string) => boolean;
	getIsFormValid: (query: string) => Promise<Error | true>;
	onSubmit: (query: string) => void;
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const [query, setQuery] = useState('');
	const [queryError, setQueryError] = useState<Error>();
	const [searches, setSearches] = useState<EnrichSearchObj[]>([]);
	const [isGoodDomain, setIsValid] = useState(false);

	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	const onChange = (value: string) => {
		const term = getTerm(value);
		setQuery(term);
		setIsValid(getIsTermValid(term));
	};

	const saveSearch = async (term: string) => {
		try {
			const response: any = await API.graphql(graphqlOperation(createEnrichSearch, { input: { type, term, tenants: [groupname] } }));
			return response?.data?.createEnrichSearch;
		} catch (err) {
			console.log('Error saving search term', err);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setQueryError(undefined);
		const queryNormalized = query.trim();
		const isValid = await getIsFormValid(query);
		if (isValid instanceof Error) {
			setQueryError(isValid);
			return;
		}
		setIsBusy(true);
		await onSubmit(queryNormalized);
		await saveSearch(queryNormalized);
		setIsBusy(false);
	};

	const recentSearches = sortBy(searches, 'createdAt')
		.reverse()
		.slice(0, 5)
		.map((search) => {
			const onClick = () => {
				setQuery(search.term);
				setIsValid(getIsTermValid(search.term));
			};
			return (
				<span key={search.id} className="has-text-primary is-clickable mr-5" onClick={onClick}>
					{search.term}
				</span>
			);
		});

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<div className="field has-addons">
				<div className="control is-flex-grow-1">
					<FormInput
						name="query"
						value={query}
						placeholder={placeholder}
						onChange={onChange}
						required={true}
						error={queryError}
						iconLeft={<IconSearch />}
						className={isGoodDomain ? 'has-border-primary' : ''}
					/>
				</div>
				<div className="control">
					<FormButton
						type="submit"
						variant={['is-outlined', 'is-ui-button']}
						color={isGoodDomain ? 'is-primary' : 'is-default'}
						loading={isBusy}
						disabled={isBusy}
					>
						Search
					</FormButton>
				</div>
			</div>
			<CardAnimatePresence isActive={searches.length > 0}>
				<div className="is-block mt-6">
					<span className="has-text-grey mr-3">Recent Searches: </span>
					<span className="is-word-break-break-all">{recentSearches}</span>
				</div>
			</CardAnimatePresence>
			<QueryLoader
				onLoad={setSearches}
				isLoadMoreHidden={true}
				query={listEnrichSearchByType}
				rootKey="listEnrichSearchByType"
				dataKey="items"
				options={{ type, limit: 1999 }}
			/>
		</form>
	);
};

export default EnrichSearch;
