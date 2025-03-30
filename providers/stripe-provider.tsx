import React, {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

const StripeContext = createContext<{
  planValue?: number;
  setPlanValue: Dispatch<SetStateAction<number | undefined>>;
  summaryFlag: boolean;
  setSummaryFlag: Dispatch<SetStateAction<boolean | undefined>>;
  priceRangeValue?: number;
  setPriceRangeValue: Dispatch<SetStateAction<number | undefined>>;
  priceRangeRate?: number;
  setPriceRangeRate: Dispatch<SetStateAction<number | undefined>>;
  selectedPlan?: number;
  setSelectedPlan: Dispatch<SetStateAction<number | undefined>>;
}>({
  planValue: 0,
  setPlanValue: () => {},
  summaryFlag: false,
  setSummaryFlag: () => {},
  priceRangeValue: 0,
  setPriceRangeValue: () => {},
  priceRangeRate: 0,
  setPriceRangeRate: () => {},
  selectedPlan: 0,
  setSelectedPlan: () => {},
});

export const useStripeContext = () => useContext(StripeContext);

const AuthStripe = (props: any) => {
  const [planValue, setPlanValue] = useState(0);
  const [summaryFlag, setSummaryFlag] = useState(false);
  const [priceRangeValue, setPriceRangeValue] = useState(0);
  const [priceRangeRate, setPriceRangeRate] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(0);
  return (
    <StripeContext.Provider
      value={{
        planValue,
        setPlanValue,
        summaryFlag,
        setSummaryFlag,
        priceRangeValue,
        setPriceRangeValue,
        priceRangeRate,
        setPriceRangeRate,
        selectedPlan,
        setSelectedPlan,
      }}
    >
      {props.children}
    </StripeContext.Provider>
  );
};

export default AuthStripe;
