import { useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';
import API, { graphqlOperation } from '@aws-amplify/api';
import { v4 } from 'uuid';
import { values, every, isEmpty } from 'lodash';
import {
  ActionAddToList,
  ActionExport,
  ActionSelect,
  ActionUnlock,
  Contact,
  EmailAccountModel,
  FilterModel,
  List,
  ListContactModel,
  RampedUpFilter,
  SortData,
} from '../../../types';
import Filter from '../../filter/Filter';
import SearchHistory from '../../SearchHistory';
import QueryLoader from '../../QueryLoader';
import {
  getFilter,
  listContacts,
  listContactsByGroupId,
  listEmailAccountsByUserId,
  listFiltersByUserId,
  listListContactsByListId,
  listLists,
} from '../../../src/graphql/queries';
import ProspectSearch from './ProspectSearches';
import ContactItems from '../../ContactItems';
import ExportContacts from '../../ExportContacts';
import UpgradeModal from '../../UpgradeModal';
import AddToList from '../../AddToList';
import { genericErrorMessage, ITEMS_PER_PAGE } from '../../../consts';
import {
  applyContactFilters,
  downloadContacts,
  getExportData,
  getExportLabels,
} from '../../../utils/contact-utilsx';
import { paginate } from '../../Pagination';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useRouter } from 'next/router';
import Loader from '../../Loader';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import {
  getFilterLabel,
  getSortedData,
  sleep,
} from '../../../utils/helper-utils';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import UnlockContacts from '../../UnlockContacts';
import LoaderFullscreen from '../../LoaderFullscreen';
import { createFilter } from '../../../src/graphql/mutations';
import TableSkeleton from '../../table-skeleton';
import { useScrollBlock } from '../../../hooks/useOverflowHidden';
import TrialNotice from '../../TrialNotice';
import { useSettingsContext } from "../../../providers/settings-provider";
interface exportContactState {
  type: ActionExport;
  targetIds?: string[];
  startExporting: boolean;
}
const exportContactInitState = {
  type: ActionExport.Selected,
  targetIds: [],
  startExporting: false,
};



const SectionProspectFinder = ({ isContactsOnly = false, listId }: { isContactsOnly?: boolean; listId?: string }) => {
  // contacts
  const [isContactsLoading, setIsContactsLoading] = useState(false);
  const [contactItems, setContactItems] = useState<Contact[]>();
  const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
  const [activeContactsPage, setActiveContactsPage] = useState(0);
  const [contactsPerPage, setContactsPerPage] = useState(ITEMS_PER_PAGE);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  //upgrade modal nd-85 brf 2022-12-16
  const [isUpgradeModalActive, setIsUpgradeModalActive] = useState(false);

  // history
  const [isHistoryBusy, setIsHistoryBusy] = useState(false);
  const [historyItems, setHistoryItems] = useState<FilterModel[]>([]);
  const [savedHistoryItems, setSavedHistoryItems] = useState<FilterModel[]>([]);
  const [isHistoryModalActive, setIsHistoryModalActive] = useState(false);
  const [historyNextToken, setHistoryNextToken] = useState('');
  const [historyFetchMore, setHistoryFetchMore] = useState<Date>();

  // list items
  const [listItems, setListItems] = useState<List[]>([]);
  const [isListBusy, setIsListBusy] = useState(false);
  const [isAddToListModalActive, setIsAddToListModalActive] = useState(false);
  const [isExportModalActive, setIsExportModalActive] = useState(false);

  // filter model
  const [activeFilterModel, setActiveFilterModel] = useState<FilterModel>();
  const [activeFilter, setActiveFilter] = useState<RampedUpFilter>();
  const [isActiveFilterLoading, setIsActiveFilterLoading] = useState(false);

  // busy and error status
  const [isBusy, setIsBusy] = useState(false);
  const [isNotFound, setIsNotFound] = useState<boolean>();
  const [error, setError] = useState<Error>();

  // current api page and whether api has more pages available
  const [totalResults, setTotalResults] = useState<number>();
  const [page, setPage] = useState(0); // was 1
  const [pageSize, setPageSize] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  // unlock contacts modal
  const [isUnlockModalActive, setIsUnlockModalActive] = useState(false);
  const [contactsToUnlock, setContactsToUnlock] = useState<Contact[]>([]);

  // email accounts
  const [emailAccounts, setEmailAccounts] = useState<EmailAccountModel[]>([]);
  const [isEmailAccountsLoading, setIsEmailAccountsLoading] = useState(true);

  // contacts ruids being unlocked
  const [ruidsBeingUnlocked, setRuidsBeingUnlocked] = useState<string[]>([]);
  const [exportContactsNow, setExportContactsNow] =
    useState<exportContactState>(exportContactInitState);

  const { settings, canUpgrade } = useSettingsContext();
  const router = useRouter();
  const { user } = useAuthContext();

  const onCustomize = async () => {
    await router.push({ pathname: '/account-settings/subscription-billing/plan' });
  }

  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();

    return () => {
      allowScroll();
    };
  });

  useEffect(() => {
    if (exportContactsNow.startExporting) {
      onExport(exportContactsNow.type, exportContactsNow.targetIds);
      setExportContactsNow(exportContactInitState);
    }
  }, [exportContactsNow.startExporting]);

  const getInput = async (body: any) => {
    const options = {
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    return options;
  };

  const onUnlock = (type: ActionUnlock, targetIds: string[] = []) => {
    let items: Contact[] = [];
    let sourceContacts: Contact[] = [...(contactItems || [])];
    if (isContactsOnly) {
      sourceContacts = filteredContacts;
    }
    if (type === ActionUnlock.All) {
      items = [...(sourceContacts || [])];
    }
    if (type === ActionUnlock.CurrentPage) {
      items = (sourceContacts || []).filter((item) =>
        targetIds.includes(item.id)
      );
    }
    if (type === ActionUnlock.Selected) {
      items = (sourceContacts || []).filter((item) => item.isSelected);
    }
    setContactsToUnlock(items);
    setIsUnlockModalActive(true);
  };

  const onUnlockOne = (contact: Contact) => {
    setContactsToUnlock(prevContacts => [contact]);
    //setContactsToUnlock(prevContacts => prevContacts.concat(contact));
    setIsUnlockModalActive(true);
  };

  const onUnlockCancel = () => setIsUnlockModalActive(false);

  const onSelect = (ruid: string, isChecked: boolean) => {
    let items = [...(contactItems || [])];
    const index = items.findIndex((item) => item.ruid === ruid);
    if (index === -1) {
      return;
    }
    items[index].isSelected = isChecked;
    setContactItems(items);
  };

  const onDownload = (contact: Contact) =>
    downloadContacts([getExportLabels(), getExportData(contact)]);

  const onViewHistory = () => setIsHistoryModalActive(true);

  const onHistoryFetchMore = () => {
    setHistoryFetchMore(new Date());
  };

  const searchContacts = async (
    filter: RampedUpFilter,
    model?: FilterModel,
    itemsPerPage?: number
  ) => {
    let response;
    const randomId = 'random-' + v4();
    const options = await getInput({
      ...filter,
      groupId: user?.attributes['custom:group_name'],
      userId: user?.attributes.sub,
      filterId: model?.id || randomId,
      pageSize: itemsPerPage || contactsPerPage,
    });
    // fetch results server
    try {
      response = await API.post('nymblrRestApi', '/api/contacts/v2', options);
    } catch (err) {
      if (err?.response.status === 402) {
        setIsUpgradeModalActive(true);
      } else {
        setError(
          new Error(
            err?.response?.data?.message || err?.message || genericErrorMessage
          )
        );
      }
      return;
    }

    // something went wrong searching contacts
    if (!response) {
      setError(new Error(genericErrorMessage));
      return;
    }
    //console.log('Response page - ',response.page);
    // next page
    if (response?.page !== undefined) {
      setPage(response.page);
      console.log('Response page - ', response.page);
    }

    // has next
    //setHasNext(response?.totalCount >= response?.page);
    setHasNext(
      response?.page + 1 <= Math.ceil(response?.totalCount / contactsPerPage)
    );
    setHasPrev(
      response?.page - 1 >= 0
    );
    //      response?.page - 1 <= Math.ceil(response?.totalCount / contactsPerPage)
    /*
    console.log(contactsPerPage); //10
    console.log(response?.totalCount);
    console.log(response?.page);
    console.log(Math.ceil(response?.totalCount / contactsPerPage));
    */
    // update total number of available results
    setTotalResults(response?.totalCount);

    setPageSize(response?.pageSize);
    // update current page
    // Ben commented this out, seemed to be causing us to skip the second page
    //if (response?.totalCount >= response?.page) {
    //setPage(page + 1);
    //}

    // update results
    let newContacts: Contact[] = [];
    if (response?.page > 0) {
      newContacts = [...(contactItems || []), ...(response?.contacts || [])];
    } else {
      newContacts = response?.contacts || [];
    }
    console.log('search b4 -', contactItems);
    // set contact items
    setContactItems(newContacts);
    console.log('search after -', contactItems);
    // return fetched results
    return newContacts;
  };

  /**
   * @summary
   * This was commented
   *
   * @description
   * This was meant for contacts screen - but now we have separate search
   * button embedded in filter component itself
   *
   * @param value The ramped up filter raw object
   * @param model Saved ramped up filter model object
   */
  const onFilterSave = (value: RampedUpFilter, model?: FilterModel) => {
    if (model?.id) {
      setHistoryItems([model, ...historyItems]);
      setActiveFilterModel(model);
    }
    setActiveFilter(value);
  };

  const saveFilter = async (value: FilterModel) => {
    let response: any;
    try {
      response = await API.graphql(
        graphqlOperation(createFilter, { input: value })
      );
    } catch (err) {
      console.log('Error in saveFilter - ', err);
    }
  };

  const onFilterSubmit = async (value: RampedUpFilter, model?: FilterModel) => {
    const isFilterEmpty = values(value).every(
      (val) => isEmpty(val) && val !== true
    );
    if (isFilterEmpty) {
      console.log('Filter is empty', value);
      setContactItems(undefined);
      return;
    }

    // save search temporarily
    const newFilterModel: FilterModel = {
      id: v4(),
      tenants: [user?.attributes['custom:group_name'] || ''],
      userId: user?.attributes.sub || '',
      groupId: user?.attributes['custom:group_name'] || '',
      name: getFilterLabel(value),
      rampedUpFilter: JSON.stringify(value) as any,
      savedFilter: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveFilter(newFilterModel);
    historyItems.push(newFilterModel);

    setIsHistoryModalActive(false);

    setIsBusy(true);
    setError(undefined);
    let items: Contact[] = [];
    setContactItems(undefined);
    console.log('on filter submit after clear', contactItems);
    setPage(0);
    setActiveContactsPage(0);

    // update search history - add newly created filter to top of list
    if (model?.id) {
      setHistoryItems([model, ...historyItems]);
    }

    setActiveFilter(value);
    setActiveFilterModel(model);
    setContactItems(undefined);
    setContactItems([]);
    console.log('on filter submit after clear 2', contactItems);
    const newContacts = await searchContacts(value, model);

    setIsBusy(false);
    return newContacts;
  };

  const onLoadMore = async (activePage: number) => {
    // next page is not available or filter is not set
    if (!hasNext || !activeFilter) {
      return [];
    }
    console.log('onLoadMore - page exppage', page, page + 1);
    // fetch contacts from server
    setIsBusy(true);
    setError(undefined);
    const newContacts = await searchContacts(
      { ...activeFilter, page: page + 1 },
      activeFilterModel
    );
    setIsBusy(false);
    return newContacts || [];
  };

  const onLoadPrev = async () => {
    if (!hasPrev || !activeFilter) {
      return [];
    }
    // fetch contacts from server
    setIsBusy(true);
    setError(undefined);
    console.log('onLoadPrev - page exppage', page, page - 1);
    /*
    let newContacts = await searchContacts(
      { ...activeFilter, page: page - 1 },
      activeFilterModel
    );

    newContacts = newContacts?.splice(
      page * pageSize - pageSize,
      newContacts?.length
    );*/

    setIsBusy(false);
    //return newContacts || [];
    return contactItems || [];
  };

  const onSearchHistorySelect = (value: FilterModel) => {
    setActiveFilterModel(value);
    setIsHistoryModalActive(false);
  };

  const onSearchHistoryCancel = () => setIsHistoryModalActive(false);

  const onClear = () => setActiveFilter(undefined);

  const onExport = (
    type: ActionExport,
    targetIds: string[] = [],
    sortMap?: SortData[]
  ) => {
    let sourceContacts: Contact[] = [...(contactItems || [])];
    if (isContactsOnly) {
      sourceContacts = filteredContacts;
    }
    if (sortMap) {
      sourceContacts = getSortedData(sourceContacts, sortMap);
    }
    if (type === ActionExport.All) {
      setActiveContacts(sourceContacts);
    }
    if (type === ActionExport.Selected) {
      setActiveContacts(sourceContacts.filter((item) => item.isSelected));
    }
    if (type === ActionExport.CurrentPage) {
      setActiveContacts(
        sourceContacts.filter((item) => targetIds.includes(item.id))
      );
    }
    setIsExportModalActive(true);
  };

  const onSelectMany = (type: ActionSelect, targetIds: string[] = []): void => {
    let items = [...(contactItems || [])];
    if (type === ActionSelect.SelectAll) {
      items = items.map((item) => {
        item.isSelected = true;
        return item;
      });
    }
    if (type === ActionSelect.SelectCurrentPage) {
      items = items.map((item) => {
        if (targetIds.includes(item.id)) {
          item.isSelected = true;
        }
        return item;
      });
    }
    if (type === ActionSelect.ToggleCurrentPage) {
      const targetItems = items.filter((item) => targetIds.includes(item.id));
      const selectedItems = targetItems.filter(
        (item) => item.isSelected === true
      );
      const isSelected = targetItems.length === selectedItems.length;
      items = items.map((item) => {
        if (targetIds.includes(item.id)) {
          item.isSelected = isSelected ? false : true;
        }
        return item;
      });
    }
    setContactItems(items);
  };

  const onExportSubmit = () => setIsExportModalActive(false);

  const onExportCancel = () => setIsExportModalActive(false);

  const onUpgradeCancel = () => setIsUpgradeModalActive(false);


  const onAdd = (contact: Contact) => {
    setActiveContacts([contact]);
    setIsAddToListModalActive(true);
  };

  const onAddToList = (type: ActionAddToList, targetIds: string[] = []) => {
    let sourceContacts: Contact[] = [...(contactItems || [])];
    if (isContactsOnly) {
      sourceContacts = filteredContacts;
    }
    if (type === ActionAddToList.All) {
      setActiveContacts([...sourceContacts]);
    }
    if (type === ActionAddToList.Selected) {
      setActiveContacts(sourceContacts.filter((item) => item.isSelected));
    }
    if (type === ActionAddToList.CurrentPage) {
      setActiveContacts(
        sourceContacts.filter((item) => targetIds.includes(item.id))
      );
    }
    setIsAddToListModalActive(true);
  };
  let filterObj1 = {
    "savedFilter": { "ne": true }
  }
  let filterObj2 = {
    "savedFilter": { "eq": true }
  }
  const onAddToListCancel = () => setIsAddToListModalActive(false);

  const onAddToListSubmit = () => setIsAddToListModalActive(false);

  /**
   * @summary
   * This is called when active page is changed or number of items is changed
   *
   * @description
   * Reset search only when items per page is changed
   *
   * @note
   * Make sure to do this in home screen as well
   *
   * @param activePage {number} The active page
   * @param itemsPerPage {number} The number of items per page
   */
  const onContactPageChange = async (
    activePage: number,
    itemsPerPage: number
  ) => {
    setActiveContactsPage(activePage);
    if (itemsPerPage && itemsPerPage !== contactsPerPage) {
      setContactsPerPage(itemsPerPage);
      if (activeFilter) {
        setIsBusy(true);
        try {
          await searchContacts(activeFilter, activeFilterModel, itemsPerPage);
        } catch (err) {
          //
        }
        setIsBusy(false);
      }
    }
  };

  const onUnlockSuccess = (
    fullContacts: Contact[],
    exportContacts?: boolean,
    selectedAction: ActionExport = ActionExport.Selected
  ) => {
    setContactItems((prevContacts) => {
      let copiedContacts = [...(prevContacts || [])];
      for (let i = 0; i < fullContacts.length; i++) {
        const index = copiedContacts.findIndex(
          (item) => item.ruid && item.ruid === fullContacts[i].ruid
        );
        if (index === -1) {
          continue;
        }
        copiedContacts[index] = {
          ...fullContacts[i],
          isSelected: copiedContacts[index].isSelected,
        };
      }
      return copiedContacts;
    });

    setFilteredContacts((prevFilteredContacts) => {
      const newFilteredContacts = [...(prevFilteredContacts || [])];
      for (let i = 0; i < fullContacts.length; i++) {
        const index = newFilteredContacts.findIndex(
          (item) => item.ruid && item.ruid === fullContacts[i].ruid
        );
        if (index === -1) {
          continue;
        }
        newFilteredContacts[index] = {
          ...fullContacts[i],
          isSelected: newFilteredContacts[index].isSelected,
        };
      }
      return newFilteredContacts;
    });

    setRuidsBeingUnlocked([]);
    if (exportContacts) {
      setExportContactsNow({
        startExporting: true,
        targetIds: fullContacts.map((contact) => contact.id),
        type: selectedAction,
      });
    }
  };

  const onFilterUpdate = (newFilter: RampedUpFilter) => {
    setFilteredContacts(applyContactFilters(contactItems || [], newFilter));
  };

  const onListContactsLoad = (listContacts: ListContactModel[]) => {
    const items = listContacts
      .filter((item) => item.contact?.id)
      .map((item) => item.contact);
    setContactItems(items as Contact[]);
  };

  const onUnlockStart = (ruids: string[]) => {
    setRuidsBeingUnlocked(ruids);
    setIsUnlockModalActive(false);
  };

  const onUnlockError = (ruids: string[]) => {
    setRuidsBeingUnlocked([]);
    setIsUnlockModalActive(false);
  };

  const isTrailAccount = canUpgrade;

  return (
    <>
      {isTrailAccount ? (
        <TrialNotice onCustomize={onCustomize} />
      ) : (<div></div>)}

      {/* white space */}
      <div className="columns is-tablet">
        <div className={isTrailAccount ? 'column is-12-tablet is-3-widescreen trialsize' : 'column is-12-tablet is-3-widescreen'}>
          <Filter
            isContactsOnly={isContactsOnly}
            hasHistory={!isContactsOnly}
            onSubmit={isContactsOnly ? onFilterSave : onFilterSubmit}
            onViewHistory={onViewHistory}
            activeFilter={activeFilterModel}
            onClear={onClear}
            // saveLabel={isContactsOnly ? 'Save Search' : 'Save'}
            contacts={contactItems}
            onFilterUpdate={isContactsOnly ? onFilterUpdate : undefined}
          />
        </div>
        <div className="column is-12-tablet is-9-widescreen">
          {/* error message */}
          <ErrorNotificaition error={error} className="pt0 pb-6 has-text-centered" />
          {isContactsOnly ? (
            <>
              <div className={isTrailAccount ? 'is-relative is-contacts-area trialsize' : 'is-relative is-contacts-area'}>
                <ContactItems
                  items={filteredContacts || []}
                  emailAccounts={emailAccounts}
                  ruidsBeingUnlocked={ruidsBeingUnlocked}
                  itemsPerPage={contactsPerPage}
                  isLocked={true}
                  isBusy={isContactsLoading}
                  onUnlock={onUnlock}
                  onUnlockOne={onUnlockOne}
                  onAdd={onAdd}
                  onSelect={onSelect}
                  onSelectMany={onSelectMany}
                  onDownload={onDownload}
                  onExport={onExport}
                  onAddToList={onAddToList}
                  onPageChange={onContactPageChange}
                  isTrialAccount={isTrailAccount}
                  setIsUpgradeModalActive={setIsUpgradeModalActive}
                  onSuccess={onUnlockSuccess}
                  isContactsOnly
                />
              </div>

              {/* load contacts for current cognito group */}
              {listId ? (
                <QueryLoader
                  query={listListContactsByListId}
                  onLoad={onListContactsLoad}
                  isBusy={isContactsLoading}
                  onBusyToggle={setIsContactsLoading}
                  rootKey='listListContactsByListId'
                  dataKey='items'
                  options={{ listId, sortDirection: 'DESC' }}
                  limit={999}
                  isLoadAll={true}
                />
              ) : (
                <QueryLoader
                  query={listContactsByGroupId}
                  onLoad={setContactItems}
                  isBusy={isContactsLoading}
                  onBusyToggle={setIsContactsLoading}
                  rootKey='listContactsByGroupId'
                  dataKey='items'
                  options={{
                    limit: undefined,
                    groupId: user?.attributes['custom:group_name'],
                  }}
                  isLoadMoreHidden={true}
                  isLoadAll={true}
                />
              )}
            </>
          ) : (
            <>
              {/* <CardAnimatePresence isActive={isBusy && contactItems === undefined}>
								<LoaderFullscreen opacity={0} />
							</CardAnimatePresence> */}
              {isBusy && contactItems === undefined && (
                <TableSkeleton rows={22} />
              )}
              {contactItems === undefined && !isBusy ? (
                <ProspectSearch
                  searches={historyItems}
                  savedSearches={savedHistoryItems}
                  onClick={onSearchHistorySelect}
                  isBusy={isHistoryBusy}
                  limit={10}
                />
              ) : null}
              {contactItems !== undefined ? (
                <div className={isTrailAccount ? 'is-relative is-contacts-area trialsize' : 'is-relative is-contacts-area'}>
                  <ContactItems
                    items={contactItems || []}
                    emailAccounts={emailAccounts}
                    ruidsBeingUnlocked={ruidsBeingUnlocked}
                    itemsPerPage={contactsPerPage}
                    isLocked={true}
                    isBusy={isBusy}
                    onUnlock={onUnlock}
                    onUnlockOne={onUnlockOne}
                    onAdd={onAdd}
                    onSelect={onSelect}
                    onSelectMany={onSelectMany}
                    onDownload={onDownload}
                    onExport={onExport}
                    onLoadPrev={onLoadPrev}
                    onAddToList={onAddToList}
                    onPageChange={onContactPageChange}
                    isTrialAccount={isTrailAccount}
                    setIsUpgradeModalActive={setIsUpgradeModalActive}
                    hasNext={hasNext}
                    onLoadMore={onLoadMore}
                    totalResults={totalResults}
                    onSuccess={onUnlockSuccess}
                    isContactsOnly={false}
                  />
                  {/* {isBusy && <TableSkeleton />} */}
                  {/* <CardAnimatePresence isActive={isBusy}>
										<LoaderFullscreen opacity={0} />
									</CardAnimatePresence> */}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
      {/* filter / search history modal */}
      <SearchHistory
        isBusy={isHistoryBusy}
        searchItems={savedHistoryItems}
        isActive={isHistoryModalActive}
        onCancel={onSearchHistoryCancel}
        onClick={onSearchHistorySelect}
        nextToken={historyNextToken}
        onFetchMore={onHistoryFetchMore}
      />
      {/* The add to list modal */}
      <AddToList
        isBusy={isListBusy}
        listItems={listItems}
        contactItems={activeContacts}
        isActive={isAddToListModalActive}
        onCancel={onAddToListCancel}
        onSubmit={onAddToListSubmit}
      />
      {/* load filters for current user - this is for the user only - not cognito group */}

      <QueryLoader
        query={listFiltersByUserId}
        onLoad={setHistoryItems}
        isBusy={isHistoryBusy}
        onBusyToggle={setIsHistoryBusy}
        rootKey='listFiltersByUserId'
        dataKey='items'
        options={{ limit: 10000, filter: filterObj1, userId: user?.attributes.sub }}
        isLoadMoreHidden={true}
        onNextTokenChange={setHistoryNextToken}
        fetchMore={historyFetchMore}
      />
      <QueryLoader
        query={listFiltersByUserId}
        onLoad={setSavedHistoryItems}
        isBusy={isHistoryBusy}
        onBusyToggle={setIsHistoryBusy}
        rootKey='listFiltersByUserId'
        dataKey='items'
        options={{ filter: filterObj2, userId: user?.attributes.sub }}
        isLoadMoreHidden={true}
        onNextTokenChange={setHistoryNextToken}
        fetchMore={historyFetchMore}
      />
      {/* load lists for current user cognito group */}
      <QueryLoader
        onLoad={setListItems}
        query={listLists}
        rootKey='listLists'
        dataKey='items'
        onBusyToggle={setIsListBusy}
        options={{ sortDirection: 'DESC' }}
        limit={999}
        isLoadAll
      />
      {/* export contacts */}
      <ExportContacts
        contacts={activeContacts}
        isActive={isExportModalActive}
        onSubmit={onExportSubmit}
        onCancel={onExportCancel}
      />
      {/* upgrade modal nd-85 brf 2022-12-16 */}
      <UpgradeModal
        contacts={activeContacts}
        isActive={isUpgradeModalActive}
        onCancel={onUpgradeCancel}
      />
      {/* load prospect filter form query args using id */}
      {router.query?.filterId !== undefined && (
        <QueryLoader
          onLoad={setActiveFilterModel}
          query={getFilter}
          rootKey='data'
          dataKey='getFilter'
          options={{ id: router.query?.filterId }}
          isSingle={true}
          onBusyToggle={setIsActiveFilterLoading}
        />
      )}
      {/* load connected email accounts */}
      <QueryLoader
        onLoad={setEmailAccounts}
        query={listEmailAccountsByUserId}
        rootKey='listEmailAccountsByUserId'
        dataKey='items'
        onBusyToggle={setIsEmailAccountsLoading}
        options={{ userId: user?.attributes.sub }}
      />
      {/* unlock contacts modal */}
      <UnlockContacts
        contacts={contactsToUnlock}
        isActive={isUnlockModalActive}
        onCancel={onUnlockCancel}
        onSuccess={onUnlockSuccess}
        onStart={onUnlockStart}
        onError={onUnlockError}
      />
    </>
  );
};

export default SectionProspectFinder;
