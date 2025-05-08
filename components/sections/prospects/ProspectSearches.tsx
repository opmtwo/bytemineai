import { sortBy } from 'lodash';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { FilterModel } from '../../../types';
import CardSkelton from '../../cards-skeleton';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import CardTitle from '../../CardTitle';
import EmptyMsg from '../../EmptyMsg';
import FormField from '../../form/FormField';
import FormInput from '../../form/FormInput';
import IconLine from '../../icons/IconLine';
import IconNewProspectFinder from '../../icons/IconNewProspectFinder';
import IconNewProspectFinderAlt from '../../icons/IconNewProspectFinderAlt';
import IconNewSearch from '../../icons/IconNewSearch';
import Loader from '../../Loader';
import SearchEntry from '../../SearchEntry';
import SearchHistory from '../../SearchHistory';
import Slot from '../../Slot';
import ProspectSearchEntry from './ProspectSearchEntry';

const ProspectSearches = ({
	searches,
	savedSearches,
	limit = 10,
	isBusy,
	onClick,
	onSearchByKeyword,
}: {
	searches: FilterModel[];
	savedSearches: FilterModel[];
	limit?: number;
	isBusy: boolean;
	onClick: Dispatch<SetStateAction<FilterModel | undefined>>;
	onSearchByKeyword: (kwd: string) => void;
}) => {
	const [activeTab, setActiveTab] = useState('tab1');

	const [kwd, setKwd] = useState('');

	const handleTabClick = (tabName: any) => {
		setActiveTab(tabName);
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		const kwdClean = kwd.trim();
		if (!kwdClean) {
			return;
		}
		onSearchByKeyword(kwdClean);
		setKwd('');
	};

	return (
		<div className="columns is-centered is-sticky-top">
			<div className="column is-12-mobile is-10-tablet">
				<div className="is-block py-5">
					{/* <div className=" is-hidden-mobile">
						<IconLine />
					</div> */}
					<div className="has-text-centered is-centered">
						<IconNewProspectFinderAlt width={80} />
						<h2 className="title is-4 has-text-dark my-5">Prospect Finder</h2>
						{/* <p className="is-size-5">Select filters on the left to find decision makers</p> */}
						<p>Find and Connect with the Right Prospects</p>
					</div>
				</div>
				<div className="columns is-centered">
					<div className="column is-12-mobile is-10-tablet" style={{ maxWidth: '640px', maxHeight: 'min(60vh, 350px)' }}>
						{isBusy ? (
							<CardSkelton />
						) : (
							<Card>
								<Slot slot="body">
									<FormField className="is-flex is-align-items-center has-border-b p-3">
										<IconNewSearch width={20} />
										<form action="POST" onSubmit={handleFormSubmit}>
											<FormInput className="is-borderless" placeholder="Search by keyword..." value={kwd} onChange={setKwd} />
										</form>
									</FormField>
									<div className="tabs has-text-weight-semibold is-fullWidth pt-0 mb-0" style={{ width: '100%' }}>
										<ul>
											<li className={activeTab === 'tab1' ? 'is-active' : ''} style={{ paddingTop: '1em' }}>
												<a style={{ paddingBottom: '1.2em' }} onClick={() => handleTabClick('tab1')}>
													Recent Searches
												</a>
											</li>
											<li className={activeTab === 'tab2' ? 'is-active' : ''} style={{ paddingTop: '1em' }}>
												<a style={{ paddingBottom: '1.2em' }} onClick={() => handleTabClick('tab2')}>
													My Searches
												</a>
											</li>
										</ul>
									</div>
									<CardAnimatePresence isActive={isBusy && !searches.length}>
										<Loader />
									</CardAnimatePresence>
									<CardAnimatePresence isActive={searches.length === 0 && !isBusy}>
										<EmptyMsg msg="No search history found" />
									</CardAnimatePresence>
									<div className="tab-content" style={{ overflowY: 'scroll', height: '40vh' }}>
										<div
											className={`tab-pane ${activeTab === 'tab1' ? 'is-active' : ''}`}
											id="tab1"
											style={{ display: `${activeTab === 'tab1' ? 'block' : 'none'}` }}
										>
											{sortBy(searches, 'createdAt')
												.reverse()
												.slice(0, limit)
												.map((search) => (
													<ProspectSearchEntry key={search.id} item={search} onClick={onClick} />
												))}
										</div>
										<div
											className={`tab-pane ${activeTab === 'tab2' ? 'is-active' : ''}`}
											id="tab2"
											style={{ display: `${activeTab === 'tab2' ? 'block' : 'none'}` }}
										>
											{sortBy(savedSearches, 'createdAt')
												.reverse()
												.slice(0, limit)
												.map((search) => (
													<SearchEntry key={search.id} item={search} onClick={onClick} />
												))}
										</div>
									</div>
								</Slot>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProspectSearches;
