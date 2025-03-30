import React, { useState } from "react";
import { sortBy } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { FilterModel } from "../../../types";
import Card from "../../cards/Card";
import CardAnimatePresence from "../../cards/CardAnimatePresence";
import CardTitle from "../../CardTitle";
import EmptyMsg from "../../EmptyMsg";
import IconLine from "../../icons/IconLine";
import Loader from "../../Loader";
import SearchEntry from "../../SearchEntry";
import Slot from "../../Slot";
import CardSkelton from "../../cards-skeleton";
import SearchHistory from "../../SearchHistory";

const ProspectSearch = ({
  searches,
  savedSearches,
  limit = 10,
  isBusy,
  onClick,
}: {
  searches: FilterModel[];
  savedSearches: FilterModel[];
  limit?: number;
  isBusy: boolean;
  onClick: Dispatch<SetStateAction<FilterModel | undefined>>;
}) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };
  return (
    <div className="columns is-centered is-sticky-top">
      <div className="column is-12-mobile is-10-tablet">
        <div className="is-block py-5">
          <div className=" is-hidden-mobile">
            <IconLine />
          </div>
          <div className="has-text-centered is-centered">
            <h2 className="title is-4 has-text-primary">Prospect Finder</h2>
            <p className="is-size-5">
              Select filters on the left to find decision makers
            </p>
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-12-mobile is-10-tablet" style={{maxHeight:'60vh'}}>
            {isBusy ? (
              <CardSkelton />
            ) : (
              <Card>
                <Slot slot="body">
                  <div className="tabs is-fullWidth pt-0 mb-0" style={{ width: "100%" }}>
                    <ul >
                      <li className={activeTab === "tab1" ? "is-active" : ""} style={{ width: "50%", paddingTop: "1em" }}><a style={{paddingBottom:'1.2em'}} onClick={() => handleTabClick("tab1")}>Recent Searches</a></li>
                      <li className={activeTab === "tab2" ? "is-active" : ""} style={{ width: "50%", paddingTop: "1em" }} ><a style={{paddingBottom:'1.2em'}} onClick={() => handleTabClick("tab2")}>My Searches</a></li>
                    </ul>
                  </div>
                  <CardAnimatePresence isActive={isBusy && !searches.length}>
                    <Loader />
                  </CardAnimatePresence>
                  <CardAnimatePresence
                    isActive={searches.length === 0 && !isBusy}
                  >
                    <EmptyMsg msg="No search history found" />
                  </CardAnimatePresence>
                  <div className="tab-content" style={{ overflowY: "scroll", height: "520px" }}>
                    <div className={`tab-pane ${activeTab === "tab1" ? "is-active" : ""}`} id="tab1" style={{ display: `${activeTab === "tab1" ? "block" : "none"}` }}>
                      {sortBy(searches, "createdAt")
                        .reverse()
                        .slice(0, limit)
                        .map((search) => (
                          <SearchEntry
                            key={search.id}
                            item={search}
                            onClick={onClick}
                          />
                        ))}
                    </div>
                    <div className={`tab-pane ${activeTab === "tab2" ? "is-active" : ""}`} id="tab2" style={{ display: `${activeTab === "tab2" ? "block" : "none"}` }}>
                      {sortBy(savedSearches, "createdAt")
                        .reverse()
                        .slice(0, limit)
                        .map((search) => (
                          <SearchEntry
                            key={search.id}
                            item={search}
                            onClick={onClick}
                          />
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
  )
};

export default ProspectSearch;
