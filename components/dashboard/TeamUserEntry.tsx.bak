import moment from "moment";
import React, { useState } from "react";
import Auth from "@aws-amplify/auth";
import { motion } from "framer-motion";
import { UserAttributes } from "../../types";
import FormButton from "../form/FormButton";
import DeleteConfirm from "../DeleteConfirm";
import { getInitials } from "../../utils/helper-utils";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import IconReset from "../icons/IconReset";
import LoaderFullscreen from "../LoaderFullscreen";
import ErrorNotificaition from "../notifications/ErrorNotification";
import Message from "../Message";
import styles from "./dashboard.module.css";

const UserEntry = ({
  index,
  user,
  isListMode = false,
  onEdit,
  onDelete,
}: {
  index: number;
  user: UserAttributes;
  isListMode?: boolean;
  onEdit: Function;
  onDelete: Function;
}) => {
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);
  const [isPasswordResetModalActive, setIsPasswordResetModalActive] =
    useState(false);
  const [error, setError] = useState<Error>();
  const [isBusy, setIsBusy] = useState(false);

  const onConfirmDelete = () => setIsConfirmModalActive(true);

  const onConfirmCancel = () => setIsConfirmModalActive(false);

  const handleEdit = () => {
    onEdit(user.sub);
  };

  const handleDelete = () => {
    setIsConfirmModalActive(false);
    onDelete(user.sub);
  };

  const onPasswordReset = () => {
    setError(undefined);
    setIsPasswordResetModalActive(true);
  };

  const onPasswordResetSubmit = async () => {
    setIsBusy(true);
    try {
      await Auth.forgotPassword(user.sub);
      setError(
        new Error(
          `Password has been reset. A new temporary password has been sent to the registered email address ${user.email}`
        )
      );
      setIsPasswordResetModalActive(false);
    } catch (err) {
      setError(err);
    }
    setIsBusy(false);
  };

  const onPasswordResetCancel = () => {
    setIsPasswordResetModalActive(false);
    setError(undefined);
  };
  ``;

  const counterId = <span>{(index + 1).toString().padStart(6, "0")}</span>;

  const fullName = (
    <span className="has-text-weight-normal">
      {user.given_name} {user.family_name}
    </span>
  );

  const userRole = (
    <span className="has-text-primary">{user["custom:role"]}</span>
  );
  const controls = (
    <>
      <FormButton
        onClick={onPasswordReset}
        variant={["is-icon", "is-outlined", "is-rounded"]}
        icon={<IconReset />}
        size="is-small"
      />
      <FormButton
        className="ml-3"
        onClick={handleEdit}
        variant={["is-icon", "is-outlined", "is-rounded"]}
        icon={<IconEdit />}
        size="is-small"
      />
      <FormButton
        className="ml-3"
        onClick={onConfirmDelete}
        variant={["is-icon", "is-outlined", "is-rounded"]}
        icon={<IconDelete />}
        color="is-primary"
        size="is-small"
      />
    </>
  );

  const errorInfo = error ? (
    <Message color="is-info" size="is-normal">
      {error?.message}
    </Message>
  ) : null;

  const dialogs = (
    <>
      <DeleteConfirm
        title="Delete User"
        msg="Are you sure that you would like to delete this user?"
        isActive={isConfirmModalActive}
        onCancel={onConfirmCancel}
        onSubmit={handleDelete}
      />
      <DeleteConfirm
        title="Reset Password"
        msg="Are you sure that you would like to reset password for this user?"
        submitLabel="Yes, Reset"
        cancelLabel="No, Exit"
        isActive={isPasswordResetModalActive}
        onCancel={onPasswordResetCancel}
        onSubmit={onPasswordResetSubmit}
      >
        <ErrorNotificaition error={error} />
      </DeleteConfirm>
    </>
  );

  const userLoader = isBusy ? <LoaderFullscreen /> : null;

  if (isListMode) {
    return (
      <>
        {errorInfo ? (
          <tr>
            <td colSpan={6}>{errorInfo}</td>
          </tr>
        ) : null}
        <tr>
          <td>
            {counterId}
            {dialogs}
            {userLoader}
          </td>
          <td>{fullName}</td>
          <td>{userRole}</td>
          <td className="action-buttons">{controls}</td>
        </tr>
      </>
    );
  }

  return (
    <>
      <motion.div layout className="panel-block is-block">
        {errorInfo}
        <div className="columns is-mobile is-multiline is-align-items-center">
          <div className="column is-7-tablet is-flex is-align-items-center">
            <span className={styles.initialNames}>
              {getInitials(`${user.given_name} ${user.family_name}`)}
            </span>
            {fullName}
          </div>
          <div className="column is-2-tablet has-text-right">{userRole}</div>
          <div className="column is-3 is-flex is-justify-content-flex-end">
            {controls}
          </div>
        </div>
      </motion.div>
      {dialogs}
      {userLoader}
    </>
  );
};

export default UserEntry;
