import { FormEvent, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { sortBy } from 'lodash';
import isValidDomain from 'is-valid-domain';
import { DomainSearch } from '../types';
import { useAuthContext } from '../providers/auth-data-provider';
import Card from './cards/Card';
import FormButton from './form/FormButton';
import FormInput from './form/FormInput';
import IconSearch from './icons/IconSearch';
import Slot from './Slot';
import QueryLoader from './QueryLoader';
import { createDomainSearch } from '../src/graphql/mutations';
import { listDomainSearchs } from '../src/graphql/queries';
import CardAnimatePresence from './cards/CardAnimatePresence';
import { getHostname } from '../utils/helper-utils';

const DomainSearch = ({ onSubmit }: { onSubmit: (query: string) => void }) => {
	const [isBusy, setIsBusy] = useState(false);
	const [query, setQuery] = useState('');
	const [queryError, setQueryError] = useState<Error>();
	const [searches, setSearches] = useState<DomainSearch[]>([]);
	const [isGoodDomain, setIsGoodDomain] = useState(false);

	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	const onDomainChange = (value: string) => {
		const hostname = getHostname(value);
		setQuery(hostname);
		setIsGoodDomain(isValidDomain(hostname));
	}

	const saveSearch = async (term: string) => {
		try {
			const response: any = await API.graphql(graphqlOperation(createDomainSearch, { input: { term, tenants: [groupname] } }));
			return response?.data?.createDomainSearch;
		} catch (err) {
			console.log('Error saving search term', err);
		}
	};

	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = isValidDomain(query) ? undefined : new Error('Please enter a valid domain');
		isValid = err ? false : isValid;
		setQueryError(err);

		return isValid;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const queryNormalized = query.trim();
		if (!(await isFormValid())) {
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
				setIsGoodDomain(isValidDomain(search.term));
			}
			return (
				<span key={search.id} className="has-text-primary is-clickable ml-5" onClick={onClick}>
					{search.term}
				</span>
			);
		});

	return (
		<Card>
			<Slot slot="body">
				<form className="panel-block is-block" method="POST" onSubmit={handleSubmit} style={{ paddingTop: 50, paddingBottom: 50 }}>
					<h2 className="title has-text-primary" style={{ fontSize: '1.625rem' }}>
						Domain Search
					</h2>
					<p className="is-size-5 mb-6">Get access to decision makers at top companies.</p>
					<div className="field has-addons">
						<div className="control is-flex-grow-1">
							<FormInput
								name="query"
								value={query}
								placeholder="Enter company website"
								onChange={onDomainChange}
								required={true}
								error={queryError}
								iconLeft={<IconSearch />}
								className={isGoodDomain ? 'has-border-primary' : ''}
							/>
						</div>
						<div className="control">
							<FormButton type="submit" variant={['is-outlined', 'is-ui-button']} color={isGoodDomain ? 'is-primary' : 'is-default'} loading={isBusy} disabled={isBusy}>
								Search
							</FormButton>
						</div>
					</div>
					<CardAnimatePresence isActive={searches.length > 0}>
						<div className="is-block mt-6">
							<span className="has-text-grey">Recent Searches</span>
							{recentSearches}
						</div>
					</CardAnimatePresence>
				</form>
				<QueryLoader
					onLoad={setSearches}
					isLoadMoreHidden={true}
					query={listDomainSearchs}
					rootKey="listDomainSearchs"
					dataKey="items"
					options={{ limit: 999 }}
				/>
			</Slot>
		</Card>
	);
};

export default DomainSearch;
