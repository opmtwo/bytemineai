import { Moment } from "moment";
import Card from "./cards/Card";
import CardAnimatePresence from "./cards/CardAnimatePresence";
import CardTitle from "./CardTitle";
import FormButton from "./form/FormButton";
import Info from "./Info";
import Loader from "./Loader";
import Slot from "./Slot";

const AccountInfo = ({
  isBusy,
  limit,
  plan,
  monthlyCredits,
  currentCredits,
  bonusCredits,
  annualCredits,
  title = "Account Info",
    subscriptionStatus,
    createdAt,
    lastPaidAt,
  subStartDate,
  subEndDate,
    stripeCustomerId = "",
  onEditAccount,
  onCustomize,
  onUpgrade,
}: {
  isBusy?: boolean;
  limit: number;
  plan: string;
  monthlyCredits: number;
  currentCredits: number;
  bonusCredits: number;
  annualCredits: number;
  subscriptionStatus: string;
  title?: string;
  stripeCustomerId?: string;
    createdAt: string;
    lastPaidAt: string;
  subStartDate?: Moment;
  subEndDate?: Moment;
  onEditAccount?: () => void;
  onCustomize?: () => void;
  onUpgrade?: () => void;
}) => (
  <Card>
    <Slot slot="header">
      <div className="is-flex-grow-1">
        <CardTitle>{title}</CardTitle> Stripe: {stripeCustomerId}
      </div>
      <div className="ml-a">
        {onCustomize !== undefined && (
          <FormButton
            variant={["is-outlined", "is-ui-button"]}
            onClick={onCustomize}
          >
            Customize Look
          </FormButton>
        )}
        {onEditAccount !== undefined && (
          <FormButton
            variant={["is-outlined", "is-ui-button"]}
            onClick={onEditAccount}
            className="ml-5"
          >
            Edit Account
          </FormButton>
        )}
        {onUpgrade !== undefined && (
          <FormButton
            variant={["is-ui-button"]}
            onClick={onUpgrade}
            className="ml-5"
          >
            Upgrade
          </FormButton>
        )}
      </div>
    </Slot>
    <Slot slot="body">
      <div className="panel-block is-block is-relative">
        <CardAnimatePresence isActive={isBusy ? true : false}>
          <div
            className="is-overlay has-background-white is-flex is-align-items-center is-justify-content-center"
            style={{ opacity: 0.9 }}
          >
            <Loader />
          </div>
        </CardAnimatePresence>
        <div className="columns is-mobile is-multiline">
          <div className="column is-6-mobile is-3-tablet">
            <Info name={"Current Credits"} value={currentCredits} />
          </div>
            <div className="column is-6-mobile is-3-tablet">
                <Info name="Plan" value={subscriptionStatus} />
            </div>
          <div className="column is-6-mobile is-3-tablet">
            <Info name="Renewal" value={plan} />
          </div>
          <div className="column is-6-mobile is-3-tablet">
              <Info name="Last Paid" value={lastPaidAt} />
          </div>

            <div className="column is-6-mobile is-3-tablet">
                <Info name={plan+" Credits"} value={monthlyCredits} />
            </div>
            <div className="column is-6-mobile is-3-tablet">
                <Info name="Quarterly Bonus Credits" value={bonusCredits} />
            </div>
            <div className="column is-6-mobile is-3-tablet">
                <Info name="Annual Credits" value={annualCredits} />
            </div>
            <div className="column is-6-mobile is-3-tablet">
                <Info name="Created" value={createdAt} />
            </div>
        </div>
      </div>
    </Slot>
  </Card>
);

export default AccountInfo;
