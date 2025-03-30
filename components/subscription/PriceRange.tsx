import React, { useState } from "react";
import classNames from "classnames";
import Slot from "../Slot";
import { formatCurrency, formatNumber } from "../../utils/plan-info";
import CardTitle from "../CardTitle";
import { useStripeContext } from "../../providers/stripe-provider";
import styles from "./PriceRange.module.css";

const PriceRange = () => {
    const { selectedPlan, priceRangeRate, setPriceRangeValue, setPriceRangeRate } =
    useStripeContext();
    console.log("Selected Plan: ",selectedPlan);
    let data = [
        { value: 0, price: 0 },
        { value: 600000, price: 7200 },
        { value: 900000, price: 10800 },
        { value: 1200000, price: 14400 },
        { value: 1500000, price: 18000 },
        { value: 1800000, price: 21600 },
        { value: 2400000, price: 28800 },
        { value: 3000000, price: 36000 },
        { value: 6000000, price: 72000 },
        ];
    if (selectedPlan === 1){
        data = [
            { value: 0, price: 0 },
            { value: 50000, price: 750 },
            { value: 75000, price: 1125 },
            { value: 100000, price: 1500 },
            { value: 125000, price: 1875 },
            { value: 150000, price: 2250 },
            { value: 200000, price: 3000 },
            { value: 250000, price: 3750 },
            { value: 500000, price: 7500 },
            ];
    }

  const [active, setActive] = useState(data[0]);
  const getdata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const currentData = data[parseInt(value)];
    setActive(currentData);
    setPriceRangeValue(currentData.value);
    setPriceRangeRate(currentData.price);
  };

  return (
    <>
      <div className="mb-6 pb-6">
        <Slot slot="header">
          <div className="is-flex-grow-1 p-6">
            <h2
              className="title is-3 has-text-primary has-text-centered"
              style={{ fontSize: "1.625rem" }}
            >
              Add More Credits (optional)
            </h2>
            <CardTitle>
              <div className="has-text-centered">
                Credits are shared between all users.
              </div>
            </CardTitle>
          </div>
        </Slot>

        <Slot slot="body">
          <div
            className={classNames("container has-text-centered", {
              [styles["overflowControl"]]: true,
            })}
          >
            <div
              className={classNames(
                "is-flex is-justify-content-center is-align-items-center ",
                {
                  [styles["captionText"]]: true,
                }
              )}
            >
                {Object.values(data).map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      color:
                        active.value === item.value
                          ? "var(--primary)"
                          : "black",
                    }}
                    className={classNames("has-text-center", {
                      [styles["singleData"]]: true,
                    })}
                  >
                    {formatNumber(item.value)}
                  </div>
                );
              })}
            </div>
            {/* {Object.values(data).map((item, index) => {} */}
            <input
              type="range"
              className={classNames(
                " is-fullwidth  has-background-grey-lighter   ",
                {
                  [styles["priceRangeInput"]]: true,
                }
              )}
              min={0}
              defaultValue={0}
                max={data.length - 1}
              onChange={getdata}
            />
            <div
              className={classNames(
                "is-flex is-justify-content-center is-align-items-center ",
                {
                  [styles["captionText"]]: true,
                }
              )}
            >
                {Object.values(data).map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      color:
                        active.value === item.value
                          ? "var(--primary)"
                          : "black",
                    }}
                    className={classNames("has-text-center", {
                      [styles["singleData"]]: true,
                    })}
                  >
                    {formatCurrency(item.price)}
                  </div>
                );
              })}
            </div>
          </div>
        </Slot>
      </div>
    </>
  );
};
export default PriceRange;
