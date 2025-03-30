import React, { useState } from "react";
import Card from "../cards/Card";
import CardTitle from "../CardTitle";
import FormButton from "../form/FormButton";
import Slot from "../Slot";
import CreditCard from "./Card";
import { maskCreditCardNumber } from "../../utils/plan-info";

const CrediCard = () => {
  const [card, setCard] = useState({
    number: maskCreditCardNumber("1234123412341234"),
    name: "Best Salesperson",
    expires: "12/29",
    cvc: "123",
  });

  return (
    <Card>
      <Slot slot="header">
        <div className="is-flex-grow-1">
          <CardTitle>Credit Card</CardTitle>
        </div>
          { /*
        <FormButton variant={["is-outlined", "is-ui-button"]}>
          Change
          </FormButton> */}
      </Slot>
      <Slot slot="body">
        <div className="pannel-block is-realtive ">
          <div
            className="is-flex is-justify-content-center"
            style={{ minHeight: "245px" }}
          >
            <CreditCard
              expires={card.expires}
              name={card.name}
              number={card.number}
              cvc={card.cvc}
            />
          </div>
        </div>
      </Slot>
    </Card>
  );
};

export default CrediCard;
