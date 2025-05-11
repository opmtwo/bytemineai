import { useState } from 'react';
import Auth from '@aws-amplify/auth';
import API, { graphqlOperation } from '@aws-amplify/api';
import throttledQueue from 'throttled-queue';
import classNames from 'classnames';
import { Header, THROTTLE_LIMIT, THROTTLE_TIME, Wrapper } from './Common';
import FormButton from '../../form/FormButton';
import CreatableMultiContacts, {
  createOption,
  MultiSelectOption,
} from './CreatableMultiContacts';
import { List, Contact, ActionList } from '../../../types';
import { useAuthContext } from '../../../providers/auth-data-provider';
import QueryLoader from '../../QueryLoader';
import { listListsByGroupId } from '../../../src/graphql/queries';
import {
  createContact,
  createList,
  createListContact,
} from '../../../src/graphql/mutations';
import {
  notifyError,
  notifySuccess,
  notifySuccessListAndExport,
} from '../../../utils/helper-utils';
import IconPlusComponent from '../../icons/components/IconPlusComponent';
import useRoutePrompt from '../../../hooks/useRouterPrompt';
import WarningModel from './WarningModel';
const throttleQ = throttledQueue(THROTTLE_LIMIT, THROTTLE_TIME);

const ListActionButton = ({
  selectedAction = '',
  contacts = [],
  displayItems = [],
  onSuccess = (items: Contact[]) => {},
  isContactsOnly = false,
}: {
  selectedAction: string;
  contacts: Contact[];
  displayItems: Contact[];
  onSuccess: (items: Contact[]) => void;
  isContactsOnly?: boolean;
}) => {
  const { user } = useAuthContext();
  const groupname = user?.attributes['custom:group_name'];

  const [isActive, setIsActive] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [listItems, setListItems] = useState<List[]>([]);
  const [selectedLists, setSelectedLists] = useState<MultiSelectOption[]>([]);
  const [dropdownError, setDropdownError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onAllow, onReject } = useRoutePrompt(loading);
  const onToggle = () => setIsActive(!isActive);

  // const [fromRecord, setFromRecord] = useState<string>("");
  // const [toRecord, setToRecord] = useState<string>("");
  // const [maximumPeoplePerCompany, setMaximumPeoplePerCompany] = useState<string>("");

  const onCreateList = async (listName: string) => {
    const response: any = await API.graphql(
      graphqlOperation(createList, {
        input: {
          name: listName,
          groupId: groupname,
          tenants: [groupname],
        },
      })
    );
    const newOption = createOption({
      label: listName,
      value: response?.data.createList?.id,
    });
    setSelectedLists((prevList) => [...prevList, newOption]);
    return response?.data.createList?.id;
  };

  const onSelectList = (options: MultiSelectOption[]) => {
    setSelectedLists(options);
  };

  const unlockSelectedContacts = async () => {
    setDropdownError('');
    const totalSelected = contacts.filter(
      (contact) => contact.isSelected
    ).length;
    if (totalSelected === 0) {
      notifyError(new Error('No records selected to add to list!'));
      return;
    }
    if (selectedLists.length === 0) {
      setDropdownError('No list selected to add contacts!');
      return;
    }

    if (selectedLists.length >= 10) {
      setDropdownError('Maximum of 10 list can be selected!');
      return;
    }
    notifySuccessListAndExport(
      `Adding contacts to list`,
      0,
      selectedLists.length,
      'Prcocessing'
    );
    let sourceContacts: Contact[] = [...(contacts || [])];

    if (selectedAction === ActionList.All) {
      sourceContacts = [...(sourceContacts || [])];
    }
    if (selectedAction === ActionList.CurrentPage) {
      sourceContacts = [...(displayItems || [])];
    }
    if (selectedAction === '') {
      sourceContacts = (sourceContacts || []).filter((item) => item.isSelected);
    }

    // logic for my-contacts page only
    if (isContactsOnly) {
      // as we already have loaded all the contacts!
      // they are unlocked too
      setLoading(true);
      try {
        const operations: any[] = [];
        for (let sl = 0; sl < selectedLists.length; sl++) {
          for (let i = 0; i < sourceContacts.length; i++) {
            let contact = sourceContacts[i];
            if (!contact.id) {
              const operation = graphqlOperation(createContact, {
                input: {
                  ...contact,
                  ...{
                    id: contact.ruid + '-' + groupname,
                    groupId: groupname,
                    tenants: [groupname],
                    // remove following fields
                    isSelected: undefined,
                  },
                },
              });
              await API.graphql(operation);
            }
            const listId = selectedLists[sl].value;
            const operation = graphqlOperation(createListContact, {
              input: {
                id: listId + '-' + contact.ruid,
                listId,
                contactId: contact.ruid + '-' + groupname,
                groupId: groupname,
                tenants: [groupname],
              },
            });
            operations.push(operation);
          }
        }
        await Promise.allSettled(
          operations.map((opr, index) =>
            throttleQ<any>(() => {
              if (index === operations.length - 1) {
                onToggle();
                setSelectedLists([]);
                setLoading(false);
              }
              notifySuccessListAndExport(
                `Added ${index + 1} contact to list`,
                index + 1,
                sourceContacts.length,
                'Processing'
              );
              return API.graphql(opr);
            })
          )
        );
      } catch (error) {
        notifyError(error);
        setLoading(false);
      }
    } else {
      // if (sourceContacts.length > MAXIMUM_CONTACTS_TO_UNLOCK) {
      //   const err = new Error(
      //     `Maximum ${MAXIMUM_CONTACTS_TO_UNLOCK} contacts can be unlocked at once.`
      //   );
      //   notifyError(err);
      //   return;
      // }

      setLoading(true);
      try {
        const ruids = sourceContacts
          .map((item) => item.ruid)
          .filter((id) => id?.trim()?.length);
        const idToken = (await Auth.currentSession())
          .getIdToken()
          .getJwtToken();
        const options = {
          body: {
            ruids: Array.from(new Set(ruids)),
            groupId: user?.attributes['custom:group_name'],
            userId: user?.attributes.sub,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        };
        const fullContacts = await API.post(
          'nymblrRestApi',
          '/api/contact-details',
          options
        );
        notifySuccess(`${options.body.ruids.length} contacts unlocked`);

        let existingContacts = [...(sourceContacts || [])];
        for (let i = 0; i < fullContacts.length; i++) {
          const index = existingContacts.findIndex(
            (item) => item.ruid && item.ruid === fullContacts[i].ruid
          );
          if (index === -1) {
            continue;
          }
          existingContacts[index] = {
            ...fullContacts[i],
            isSelected: existingContacts[index].isSelected,
          };
        }

        if (selectedAction === ActionList.All) {
          existingContacts = [...(existingContacts || [])];
        }
        if (selectedAction === ActionList.CurrentPage) {
          const displayItemsIds = fullContacts.map((cont: any) => cont.id);
          existingContacts = (existingContacts || []).filter((item) =>
            displayItemsIds.includes(item.id)
          );
        }
        if (selectedAction === '') {
          existingContacts = (existingContacts || []).filter(
            (item) => item.isSelected
          );
        }

        const operations: any[] = [];
        for (let sl = 0; sl < selectedLists.length; sl++) {
          for (let i = 0; i < existingContacts.length; i++) {
            let contact = existingContacts[i];
            if (!contact.id) {
              const operation = graphqlOperation(createContact, {
                input: {
                  ...contact,
                  ...{
                    id: contact.ruid + '-' + groupname,
                    groupId: groupname,
                    tenants: [groupname],
                    // remove following fields
                    isSelected: undefined,
                  },
                },
              });
              await API.graphql(operation);
            }
            const listId = selectedLists[sl].value;
            const operation = graphqlOperation(createListContact, {
              input: {
                id: listId + '-' + contact.ruid,
                listId,
                contactId: contact.ruid + '-' + groupname,
                groupId: groupname,
                tenants: [groupname],
              },
            });
            operations.push(operation);
          }
        }
        await Promise.allSettled(
          operations.map((opr, index) =>
            throttleQ<any>(() => {
              if (index === operations.length - 1) {
                onSuccess(fullContacts);
                onToggle();
                setSelectedLists([]);
                setLoading(false);
              }
              notifySuccessListAndExport(
                `Added ${index + 1} contacts to list`,
                index + 1,
                sourceContacts.length,
                'Processing'
              );
              return API.graphql(opr);
            })
          )
        );
      } catch (err) {
        notifyError(err);
        setLoading(false);
      }
    }
    notifySuccessListAndExport(
      `Added ${sourceContacts.length} contacts to list`,
      sourceContacts.length,
      sourceContacts.length,
      'Completed'
    );
  };
  const listItemOptions: MultiSelectOption[] = listItems.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  return (
    <>
      {isActive ? <div className='is-overlay' onClick={onToggle}></div> : null}
      <div className={classNames('dropdown', { 'is-active': isActive })}>
        <div className='dropdown-trigger is-flex is-justify-content-center is-align-items-center'>
          <FormButton
            onClick={onToggle}
            variant={['is-outlined']}
            color='is-primary'
            className='is-flex-direction-row-reverse mr-5 pl-5-1'
            icon={
              <span className='pr-6 is-flex is-justify-content-center is-align-items-center'>
                <IconPlusComponent height={16} width={16} />
              </span>
            }
          >
            List
          </FormButton>
        </div>
        <div className='dropdown-menu list-action-button-container'>
          <div className='dropdown-content is-borderless'>
            <div className='dropdown-item'>
              <span className='py-1 has-text-dark'>Add Selected To List</span>
            </div>
            <hr className='dropdown-divider' />

            <Wrapper>
              <Header className='mb-2'>List</Header>
              <div className='mb-3'>
                {!isListLoading && (
                  <CreatableMultiContacts
                    selected={selectedLists}
                    options={listItemOptions}
                    onCreateNew={onCreateList}
                    onSelect={onSelectList}
                    error={dropdownError}
                  />
                )}
                {groupname ? (
                  <QueryLoader
                    onLoad={setListItems}
                    query={listListsByGroupId}
                    rootKey='listListsByGroupId'
                    dataKey='items'
                    onBusyToggle={setIsListLoading}
                    options={{ groupId: groupname }}
                  />
                ) : null}
              </div>
              <FormButton
                type='button'
                onClick={unlockSelectedContacts}
                variant={['is-outlined']}
                color='is-primary'
                className='is-fullwidth'
                disabled={loading}
                loading={loading}
              >
                Add Selection
              </FormButton>
            </Wrapper>

            {/* <hr className="dropdown-divider" />
            <Wrapper>
              <Header className="mb-2">Advanced Section</Header>
              <div className="columns is-is-mobile">
                <div className="column is-half">
                  <FormInput
                    type="number"
                    name="fromRecord"
                    value={fromRecord}
                    label="From record #"
                    onChange={setFromRecord}
                    required={true}
                  />
                </div>
  <div className="column is-half">
                  <FormInput
                    type="number"
                    name="toRecord"
                    value={toRecord}
                    label="To record #"
                    onChange={setToRecord}
                    required={true}
                  />
                </div>
              </div>
              <div className="columns is-is-mobile">
                <div className="column">
                  <FormInput
                    type="number"
                    name="maximumPeoplePerCompany"
                    value={maximumPeoplePerCompany}
                    label="Maximum people per company"
                    onChange={setMaximumPeoplePerCompany}
                    required={true}
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <FormButton
                    onClick={() => {}}
                    variant={["is-outlined"]}
                    color="is-primary"
                    className="is-fullwidth"
                    disabled={false}
                  >
                    Add Selection
                  </FormButton>
                </div>
              </div>
            </Wrapper> */}
          </div>
        </div>
      </div>
      <WarningModel
        title='Warning'
        msg='Are you sure you want to leave page'
        submitLabel='Yes'
        cancelLabel='No'
        isActive={isOpen}
        onAllow={onAllow}
        onReject={onReject}
        onCancel={onReject}
      />
    </>
  );
};
export default ListActionButton;
