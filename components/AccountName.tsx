import { useRouter } from "next/router";
import CardAnimatePresence from "./cards/CardAnimatePresence";
import FormButton from "./form/FormButton";

const AccountName = ({
  name,
  loading,
  onDelete,
}: {
  name?: string;
  loading?: boolean;
  onDelete?: Function;
}) => {
  const router = useRouter();

  const onBack = () => router.back();

  return (
    <CardAnimatePresence
      isActive={name && name.trim().length > 0 ? true : false}
    >
      <div className="is-flex is-align-items-center is-justify-content-space-between pb-5">
        <div>
          <FormButton
            variant={["is-outlined", "is-ui-button"]}
            color="is-dark"
            onClick={onBack}
          >
            Back
          </FormButton>
          <strong className="is-size-5 has-text-dark ml-5">{name}</strong>
        </div>
        <FormButton
          variant={["is-outlined", "is-ui-button"]}
          onClick={onDelete}
          className="ml-5"
          loading={loading}
        >
          Delete Account
        </FormButton>
      </div>
    </CardAnimatePresence>
  );
};

export default AccountName;
