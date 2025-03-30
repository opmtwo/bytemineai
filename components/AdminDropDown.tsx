import React from "react";
import classNames from "classnames";
import IconArrowDown from "./icons/IconArrowDown";

export enum SortBy {
  NAME,
  DATE,
}

export enum SortOrder {
  ASC,
  DESC,
}

interface SortDropdown {
  isActive: Boolean;
  sortBy: SortBy | null;
  sortOrder: SortOrder | null;
}

const INIT_STATE = {
  isActive: false,
  sortBy: null,
  sortOrder: null,
};

const getInvertedSortOrder = (
  currentSortOrder: SortOrder | null
): SortOrder => {
  if (currentSortOrder === SortOrder.ASC) {
    return SortOrder.DESC;
  }

  return SortOrder.ASC;
};

const AdminDropDown = ({
  onSort,
}: {
  onSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
}) => {
  const [sortDropdown, setSortDropdown] =
    React.useState<SortDropdown>(INIT_STATE);

  console.log(sortDropdown, "sortDropdown");

  const onSortSelected = (sortedBy: SortBy) => {
    const newSortOrder: SortOrder = getInvertedSortOrder(
      sortDropdown.sortOrder
    );
    setSortDropdown({
      isActive: false,
      sortBy: sortedBy,
      sortOrder: newSortOrder,
    });
    onSort(sortedBy, newSortOrder);
  };

  const onChangeDropdownState = (key: string, value: boolean) => {
    setSortDropdown((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderSortIcon = (order: SortOrder | null) => {
    if (order === SortOrder.DESC) {
      return (
        <IconArrowDown
          color="white"
          height={12}
          width={12}
          style={{ rotate: "180deg" }}
        />
      );
    } else if (order === SortOrder.ASC) {
      return <IconArrowDown color="white" height={12} width={12} />;
    }

    return null;
  };

  return (
    <>
      {sortDropdown.isActive ? (
        <div
          className="is-overlay"
          onClick={() => onChangeDropdownState("isActive", false)}
        ></div>
      ) : null}
      <div
        className={classNames("dropdown", {
          "is-active": sortDropdown.isActive,
        })}
      >
        <div className="dropdown-trigger is-flex is-justify-content-center is-align-items-center mx-3">
          <span className="mr-1">Sort By</span>
          <IconArrowDown
            color="#979797"
            height={18}
            width={18}
            onClick={() =>
              onChangeDropdownState("isActive", !sortDropdown.isActive)
            }
          />
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content is-borderless">
            <a
              className={classNames("dropdown-item py-3 px-5", {
                "is-active": sortDropdown.sortBy === SortBy.DATE,
              })}
              onClick={() => onSortSelected(SortBy.DATE)}
            >
              <span className="is-flex is-justify-content-space-between is-align-items-center">
                <span>Created At</span>
                {sortDropdown.sortBy === SortBy.DATE &&
                  renderSortIcon(sortDropdown.sortOrder)}
              </span>
            </a>
            <a
              className={classNames("dropdown-item py-3 px-5", {
                "is-active": sortDropdown.sortBy === SortBy.NAME,
              })}
              onClick={() => onSortSelected(SortBy.NAME)}
            >
              <span className="is-flex is-justify-content-space-between is-align-items-center">
                <span>Name</span>
                {sortDropdown.sortBy === SortBy.NAME &&
                  renderSortIcon(sortDropdown.sortOrder)}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDropDown;
