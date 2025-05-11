import {useEffect, useState} from "react";
import {ITEMS_PER_PAGE} from "../../../consts";
import {UserAttributes} from "../../../types";
import {searchUserItems} from "../../../utils/user-utils";
import Card from "../../cards/Card";
import EmptyMsg from "../../EmptyMsg";
import FormButton from "../../form/FormButton";
import FormInput from "../../form/FormInput";
import IconSearch from "../../icons/IconSearch";
import Loader from "../../Loader";
import Pagination, {paginate} from "../../Pagination";
import Slot from "../../Slot";
import AccountEntry from "../../AccountEntry";
import {orderBy, sortBy} from "lodash";
import CardAnimatePresence from "../../cards/CardAnimatePresence";
import ViewToggle from "../../ViewToggle";
import ListView from "../../ListView";
import {useAuthContext} from "../../../providers/auth-data-provider";
import {decodeJson} from "../../../utils/helper-utils";
import TableSkeleton from "../../table-skeleton";
import AdminDropDown, {SortBy, SortOrder} from "../../AdminDropDown";

const AccountItems = ({
  items = [],
  isBusy,
  onNew,
  onEdit,
  onDelete,
}: {
  items: UserAttributes[];
  isBusy: boolean;
  onNew: Function;
  onEdit: Function;
  onDelete: Function;
}) => {
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [activePerPage, setActivePerPage] = useState(ITEMS_PER_PAGE);
  const [isSorted, setIsSorted] = useState(true);
  const [filteredItems, setFilteredItems] = useState<UserAttributes[]>([]);
  const [isListMode, setIsListMode] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    onQueryChange(query);

  }, [items]);

  useEffect(() => {
    const profile = decodeJson(user?.attributes.profile);
    if (profile?.listModes?.accountItems) {
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
        newItems = orderBy(newItems, "custom:created_at", "desc");
    }
    return newItems;
  };
  const searchAndSortDate = (term: string, sortOrder: SortOrder) => {
    const queryNormalized = term.toLowerCase().trim();
    let newItems = items;
    if (queryNormalized) {
      newItems = searchUserItems(items, queryNormalized);
    }
    if (sortOrder === SortOrder.ASC) {
      newItems = orderBy(items, "custom:created_at", "asc");
    } else {
      newItems = orderBy(items, "custom:created_at", "desc");
    }
    return newItems;
  };
  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setActivePage(0);
    setFilteredItems(searchAndSort(newQuery, isSorted));
  };

  const sortRecords = (sortBy: SortBy, sortOrder: SortOrder) => {
    switch (sortBy) {
      case SortBy.NAME:
        const isSortedByName = !isSorted;
        setIsSorted(isSortedByName);
        setFilteredItems(searchAndSort(query, isSortedByName));
        break;

      case SortBy.DATE:
        setFilteredItems(searchAndSortDate(query, sortOrder));
        break;

      default:
        return null;
    }
  };

  const displayItems = paginate(filteredItems, activePerPage, activePage);
  const itemsList = displayItems.map((user, index) => (
    <AccountEntry
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
      setIsUpgradeModalActive={() => {}}
      itemsPerPage={activePerPage}
      onPageChange={onPageChange}
    />
  );

  if (isBusy && !items.length) {
    return <TableSkeleton />;
  }
  /*
  <FormButton onClick={onNew} variant={["is-outlined", "is-ui-button"]}>
            New Account
          </FormButton>
   */
  return (
    <Card className="is-scroll-view">
      <Slot slot="header">
        <div className="is-flex is-align-items-center is-flex-grow-1 mr-a">
          <FormInput
            fieldClassName="is-flex-grow-1"
            value={query}
            onChange={onQueryChange}
            isLast={true}
            iconLeft={<IconSearch />}
          />
          <span className="has-text-grey ml-5">
            {filteredItems.length} results
          </span>
        </div>
        <div className="ml-6 mr-5">{pagination}</div>
        <div className="is-flex is-align-items-center mr-a">
          <AdminDropDown onSort={sortRecords} />
          <ViewToggle
            name="accountItems"
            isChecked={isListMode}
            onChange={setIsListMode}
          />


        </div>
      </Slot>
      <Slot slot="body">
        <CardAnimatePresence isActive={isBusy && !items.length}>
          <Loader />
        </CardAnimatePresence>
        <CardAnimatePresence isActive={displayItems.length === 0 && !isBusy}>
          <EmptyMsg msg="No accounts found" />
        </CardAnimatePresence>
        {isListMode ? <ListView>{itemsList}</ListView> : itemsList}
      </Slot>
      <Slot slot="footer">{pagination}</Slot>
    </Card>
  );
};

export default AccountItems;
