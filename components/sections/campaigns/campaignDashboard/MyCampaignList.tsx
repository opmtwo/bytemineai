import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { ITEMS_PER_PAGE } from '../../../../consts';
import { UserAttributes } from '../../../../types';
import { searchUserItems } from '../../../../utils/user-utils';
import Card from '../../../cards/Card';
import CardAnimatePresence from '../../../cards/CardAnimatePresence';
import FormInput from '../../../form/FormInput';
import IconSearch from '../../../icons/IconSearch';
import Loader from '../../../Loader';
import Pagination, { paginate } from '../../../Pagination';
import Slot from '../../../Slot';
import UserEntry from '../../../UserEntry';
import { useAuthContext } from '../../../../providers/auth-data-provider';
import { decodeJson } from '../../../../utils/helper-utils';
import IconTarget from '../icons/IconTarget';
import { motion } from 'framer-motion';
import FormButton from '../../../form/FormButton';
import Router from 'next/router';

const MyCampaignList = ({
    items = [],
    isBusy,
    isNewDisabled,
    onNew,
    onEdit,
    onDelete,
}: {
    items: UserAttributes[];
    isBusy: boolean;
    isNewDisabled?: boolean;
    onNew: Function;
    onEdit: Function;
    onDelete: Function;
}) => {
    const [query, setQuery] = useState('');
    const [activePage, setActivePage] = useState(0);
    const [activePerPage, setActivePerPage] = useState(ITEMS_PER_PAGE);
    const [isSorted, setIsSorted] = useState(false);
    const [filteredItems, setFilteredItems] = useState<UserAttributes[]>([]);
    const [isListMode, setIsListMode] = useState(false);

    const { user } = useAuthContext();

    useEffect(() => {
        onQueryChange(query);
    }, [items]);

    useEffect(() => {
        const profile = decodeJson(user?.attributes.profile);
        if (profile?.listModes?.userItems) {
            setIsListMode(true);
        }
    }, []);

    const searchAndSort = (term: string, shouldSort = false) => {
        const queryNormalized = term.toLowerCase().trim();
        let newItems = items;
        if (queryNormalized) {
            newItems = searchUserItems(items, queryNormalized);
        }
        if (shouldSort) {
            newItems = sortBy(newItems, 'given_name');
        }
        return newItems;
    };

    const onQueryChange = (newQuery: string) => {
        setQuery(newQuery);
        setActivePage(0);
        setFilteredItems(searchAndSort(newQuery, isSorted));
    };

    const onSortToggle = () => {
        setIsSorted(!isSorted);
        setFilteredItems(searchAndSort(query, !isSorted));
    };

    const displayItems = paginate(filteredItems, activePerPage, activePage);
    const itemsList = displayItems.map((user, index) => (
        <UserEntry
            key={user.sub}
            index={index}
            user={user}
            isListMode={isListMode}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    ));

    const onPageChange = async (newPage: number, newPerPage: number) => {
        setActivePage(newPage);
        if (newPerPage) {
            setActivePerPage(newPerPage);
        }
    };

    const pagination = (
        <Pagination
            totalItems={filteredItems.length}
            activePage={activePage}
            isTrialAccount={false}
            setIsUpgradeModalActive={() => { }}
            itemsPerPage={activePerPage}
            onPageChange={onPageChange}
        />
    );

    const onClickTitle = () => {
        Router.push("/campaigns/summary")
    }

    return (
        <Card className="is-scroll-view">
            <Slot slot="header">
                <div className="is-flex is-align-items-center mr-a is-flex-grow-1">

                    <FormInput
                        fieldClassName=""
                        value={query}
                        onChange={onQueryChange}
                        isLast={true}
                        iconLeft={<IconSearch />}
                        placeholder="Search by Name"

                    />
                    <span className="has-text-grey ml-5">1 results</span>

                </div>

                <div className="ml-6 mr-5">{pagination}</div>
                <FormButton className='mr-5'
                    type="submit"
                    variant={['is-outlined', 'is-ui-button']}
                    color="is-link">Filter
                </FormButton>
                <FormButton className='mr-5'
                    type="submit"
                    variant={['is-outlined', 'is-ui-button']}
                    color="is-link">New Campaign
                </FormButton>
                <div className="navbar-end">
                    <div className='mt-1'><IconTarget className='' /></div>
                    <a className="navbar-item " style={{ fontSize: "10px" }}>Autonomous<br /> Campaigns</a>
                </div>
            </Slot>
            <Slot slot="body">
                <CardAnimatePresence isActive={isBusy && !items.length}>
                    <Loader />
                </CardAnimatePresence>
                <motion.div layout className="panel-block is-block">
                    <div className="columns is-mobile is-align-items-center" onClick={onClickTitle}>
                        <div className="column is-4">
                            <div className="is-flex is-align-items-center">
                                <span className="is-flex is-align-items-center ml-3" >
                                    <span className="mx-5">All Contacts</span>
                                </span>
                            </div>
                        </div>
                        <div className="column is-8">
                            <div className="columns is-mobile is-align-items-center has-text-centered">
                                <div className="column">
                                    <span className='has-text-primary'>Active</span>
                                    <br />
                                    <span>Status</span>
                                </div>
                                <div className="column">
                                    <span className='has-text-primary' >60.5%</span>
                                    <br />
                                    <span>Open</span>
                                </div>
                                <div className="column">
                                    <span className='has-text-primary'>
                                        23.5%
                                    </span>
                                    <br />
                                    <span>Replies</span>
                                </div>
                                <div className="column">
                                    <span className='has-text-primary' >
                                        June 7,2022
                                    </span>
                                    <br />
                                    <span>Created</span>
                                </div>
                                <div className="column">
                                    <span className='has-text-primary'>
                                        Pulkit Gupta
                                    </span>
                                    <br />
                                    <span>Owner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Slot>
            <Slot slot="footer">{pagination}</Slot>
        </Card>
    );
};

export default MyCampaignList;
