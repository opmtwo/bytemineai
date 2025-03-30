interface SubscriptionHeader {
  main_header: string;
  sub_main_header: string;
  span_main_header?: string;
  plan_cost: number;
  plan_cost_per: string;
}

export const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};
export const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
    number
  );
};
export const formatInThousand = (number: number | undefined) => {
  if (number && number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
};
export interface SubscriptionPlan {
  header: SubscriptionHeader;
  primaryFeatures: String[];
  featureList?: String[];
  buttonTxt?: Boolean;
  footer?: any;
}

export const SUBCRIPTION_PLANS = [
  {
    id: 1,
    header: {
      main_header: "All-Inclusive",
      sub_main_header: "per month",
      span_main_header: "",
      plan_cost: 250,
      plan_cost_per: "per account",
    },
    primaryFeatures: [
      "Unlimited Users",
      "10,000 Credits per Month",
      "10,000 Bonus Credits per Quarter",
    ],
    featureList: [
      "Unlimited Users",
      "Unlimited Lists",
      "10,000 Credits Per Month",
      "Real-Time Email Validation",
      "Never Pay for Invalid Emails",
      "Enrichment",
      "Exports",
      "Work Emails",
      "Personal Emails",
      "Direct Dials",
      "White-Label",
      "Team Management",
      "Developer APIs",
      "Free Credits Every Quarter",
    ],
    buttonTxt: true,
  },
  {
    id: 2,
    header: {
      main_header: "All-Inclusive",
      sub_main_header: "per year ",
      span_main_header: "(20% off)",
      plan_cost: 2400,
      plan_cost_per: "per account",
    },
    primaryFeatures: [
      "Unlimited Users",
      "120,000 Credits per Year",
      "15,000 Bonus Credits per Quarter",
    ],
    featureList: [
      "Unlimited Users",
      "Unlimited Lists",
      "120,000 Credits Per Year",
      "Real-Time Email Validation",
      "Never Pay for Invalid Emails",
      "Enrichment",
      "Exports",
      "Work Emails",
      "Personal Emails",
      "Direct Dials",
      "White-Label",
      "Team Management",
      "Developer APIs",
      "Free Credits Every Quarter",
    ],
    buttonTxt: true,
  },
  {
    id: 3,
    header: {
      main_header: "Enterprise",
      sub_main_header: "per year",
      span_main_header: "",
      plan_cost: 12000,
      plan_cost_per: "starting at",
    },
    primaryFeatures: ["Unlimited Users", "500k Credits & Up"],
    featureLis: [],
    buttonTxt: false,
    footer: () => (
      <>
        
        <h1 className="is-size-6">Custom plans for larger</h1>
        <h1 className="is-size-6">teams and sales agencies</h1>


        
      </>
    ),
  },
];

export const maskCreditCardNumber = (cardNumber: string) => {
  var cardNumber = cardNumber.replace(
    /^(\d{0,4})(\d{0,4})(\d{0,4})/,
    "$1 $2 $3 "
  );
  var prefix = cardNumber.substr(0, cardNumber.length - 4);
  var suffix = cardNumber.substr(-4);
  var masked = prefix.replace(/\d/g, "*");
  var result = masked + suffix;

  return result;
};

export const stripeKey =
  "pk_test_51LvDlnG2Um3llTrBDSwjUom9PkPTO0UbxmA60tn9ggxJqKvUzjRmQE7HMRvU3pKm3cAUuDEVZEZUQKy4qfHKHKzm00GnoRLQrQ";
