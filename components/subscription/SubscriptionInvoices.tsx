import React from "react";
import Card from "../cards/Card";
import Slot from "../Slot";
import CardTitle from "../CardTitle";
import FormInput from "../form/FormInput";
import { motion } from "framer-motion";
import FormButton from "../../components/form/FormButton";
import IconDownload from "../../components/icons/IconDownload";
import { invoice } from "../../data/invoice-data";
import Pagination from "../Pagination";
import FormButtonNew from "../form/FormButtonNew";

const subscriptionInvoices = ({
  onLoadPrev,
  hasNext,
  onLoadMore,
}: {
  onLoadPrev?: () => any;
  hasNext?: boolean;
  onLoadMore?: () => any;
}) => {
  const controls = (
    <>
      <FormButtonNew
        type="button"
        className="ml-3"
        variant="icon"
        icon={<IconDownload />}
      />
    </>
  );
  const handlePageChange = () => {};
  const pagination = (
    <Pagination
      totalItems={20}
      itemsPerPage={10}
      activePage={1}
      onPageChange={handlePageChange}
      isTrialAccount={false}
      setIsUpgradeModalActive={() => {}}
      onLoadPrev={onLoadPrev}
      hasNext={hasNext}
      onLoadMore={onLoadMore}
    />
  );
  return (
    <>
      <Card>
        <Slot slot="header">
          <div className="is-flex-grow-1">
            <CardTitle>Email Invoices</CardTitle>
          </div>
          <h1 className="has-text-grey">
            Next invoice will be send on Feb 22,2022
          </h1>
        </Slot>
        <Slot slot="body">
          <div className="pannel-block is-relative p-4">
            <FormInput
              name="email"
              label="Send Invoices to"
              required={true}
              placeholder="Enter email address"
              className="has-text-weight-medium is-size-7"
            />
          </div>
        </Slot>
      </Card>
      {/* invoices */}
      <Card>
        <Slot slot="header">
          <div className="is-flex-grow-1">
            <CardTitle>Invoices</CardTitle>
          </div>
        </Slot>
        <Slot slot="body">
          {invoice.map((invoices, index) => {
            const { DateOfInvoice } = invoices;
            return (
              <motion.div layout className="panel-block is-block" key={index}>
                <div className="is-flex is-justify-content-space-between">
                  <h1 className="is-size-6 has-text-weight-medium">
                    {DateOfInvoice}
                  </h1>
                  <div className="action-buttons">{controls}</div>
                </div>
              </motion.div>
            );
          })}
        </Slot>
        <Slot slot="footer">{pagination}</Slot>
      </Card>
    </>
  );
};
export default subscriptionInvoices;
