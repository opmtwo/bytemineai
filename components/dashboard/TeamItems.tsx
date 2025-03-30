import { useEffect, useState } from "react";
import { sortBy } from "lodash";
import { ITEMS_PER_PAGE } from "../../consts";
import { UserAttributes } from "../../types";
import { searchUserItems } from "../../utils/user-utils";
import Card from "../cards/Card";
import CardAnimatePresence from "../cards/CardAnimatePresence";
import EmptyMsg from "../EmptyMsg";
import FormButton from "../form/FormButton";
import Loader from "../Loader";
import Pagination, { paginate } from "../Pagination";
import Slot from "../Slot";
import TeamUserEntry from "./TeamUserEntry";
import ListView from "../ListView";
import { useAuthContext } from "../../providers/auth-data-provider";
import { decodeJson } from "../../utils/helper-utils";
import IconTeam from "../icons/IconTeam";
import styles from "./dashboard.module.css";

const TeamItems = ({
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
  const [query, setQuery] = useState("");
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
      newItems = sortBy(newItems, "given_name");
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
    <TeamUserEntry
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

  return (
    <div className="customHeightinPanel">
      <Card>
        <Slot slot="header">
          <div className="columns " style={{ width: "100%" }}>
            <div className="column is-5-tablet is-flex is-align-items-center">
              <div className="is-relative">
                <span className={styles.teamIcon}></span>
                <IconTeam className={styles.teamIconSvg} />
              </div>
              <big>
                <strong>My Team</strong>
              </big>
            </div>
            <div className="column is-7-tablet  is-flex is-align-items-center is-justify-content-flex-end">
              <p> You have unlimited user seats</p>

              <CardAnimatePresence isActive={isNewDisabled ? false : true}>
                <FormButton
                  onClick={isNewDisabled ? undefined : onNew}
                  variant={["is-outlined"]}
                  disabled={isNewDisabled}
                  className={styles.formButtonInvited}
                >
                  Invite
                </FormButton>
              </CardAnimatePresence>
            </div>
          </div>
        </Slot>
        <Slot slot="body">
          <div style={{height: "300px",overflowY: "auto"}}>
          <CardAnimatePresence isActive={isBusy && !items.length}>
            <Loader />
          </CardAnimatePresence>
          <CardAnimatePresence isActive={displayItems.length === 0 && !isBusy}>
            <EmptyMsg msg="No users found" />
          </CardAnimatePresence>
          {isListMode ? <ListView>{itemsList}</ListView> : itemsList}
          </div>
        </Slot>
      </Card>
    </div>
  );
};

export default TeamItems;
