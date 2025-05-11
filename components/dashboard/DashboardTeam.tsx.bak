import { useState } from "react";
import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import { CognitoUserData, UserAttributes } from "../../types";
import Modal from "../modals/Modal";
import UserForm from "../UserForm";
import UsersLoader from "../UsersLoader";
import { useAuthContext } from "../../providers/auth-data-provider";
import { parseCognitoUser } from "../../utils/user-utils";
import { useSettingsContext } from "../../providers/settings-provider";
import TeamItems from "./TeamItems";

const SectionMyTeam = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [accountItems, setAccountItems] = useState<UserAttributes[]>([]);
  const [activeUser, setActiveUser] = useState<UserAttributes>();
  const [nextToken, setNextToken] = useState<string>();
  const [isModalActive, setIsModalActive] = useState(false);

  const { user } = useAuthContext();
  const { settings } = useSettingsContext();

  const groupname = user?.attributes["custom:group_name"];

  const getInput = async (body: any) => {
    const options = {
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return options;
  };

  const onNew = () => {
    setActiveUser(undefined);
    setIsModalActive(true);
  };

  const onCancel = () => {
    setActiveUser(undefined);
    setIsModalActive(false);
  };

  const onEdit = (username: string) => {
    try {
      const index = accountItems.findIndex((user) => user.sub === username);
      if (index !== -1) {
        setActiveUser(accountItems[index]);
        setIsModalActive(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onCreate = (user: UserAttributes) => {
    setAccountItems([user, ...accountItems]);
    setIsModalActive(false);
  };

  const onUpdate = (user: UserAttributes) => {
    const index = accountItems.findIndex((item) => item.sub === user.sub);
    if (index !== -1) {
      const newItems = [...accountItems];
      newItems[index] = user;
      setAccountItems(newItems);
    } else {
      setAccountItems([user, ...accountItems]);
    }
    setIsModalActive(false);
    setActiveUser(undefined);
  };

  const onDelete = async (username: string) => {
    try {
      const index = accountItems.findIndex((user) => user.sub === username);
      if (index !== -1) {
        const newUsers = [...accountItems];
        newUsers.splice(index, 1);
        setAccountItems(newUsers);
      }
      const options = await getInput({ username });
      await API.post("AdminQueries", "/disableUser", options);
      await API.post("AdminQueries", "/deleteUser", options);
    } catch (err) {
      console.log("Error loading users", err);
    }
  };

  const onLoad = (users: CognitoUserData[], token?: string) => {
    const newUsers: UserAttributes[] = users.map((data) =>
      parseCognitoUser(data)
    );
    setAccountItems([...newUsers, ...accountItems]);
    setNextToken(token);
  };

  if (!user?.attributes.sub) {
    return null;
  }

  const canAddNewUsers = true;
  /*
    settings?.["custom:seats"] &&
    accountItems.length &&
    parseInt(settings?.["custom:seats"]) > accountItems.length
      ? true
      : false;*/

  return (
    <>
      <div className="container">
        <div className="columns is-tablet">
          <div className="column is-12">
            <TeamItems
              items={accountItems}
              isBusy={isBusy}
              onNew={onNew}
              onEdit={onEdit}
              onDelete={onDelete}
              isNewDisabled={canAddNewUsers !== true}
            />
          </div>
        </div>
      </div>
      <Modal isActive={isModalActive} onCancel={onCancel}>
        <UserForm
          userItem={activeUser}
          groupName={user?.attributes["custom:group_name"]}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      </Modal>
      {groupname && (
        <UsersLoader
          onLoad={onLoad}
          isBusy={isBusy}
          onBusy={setIsBusy}
          groupname={groupname}
          nextToken={nextToken}
        />
      )}
    </>
  );
};

export default SectionMyTeam;
