import { FormEvent, useEffect, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { List } from '../../../types';
import Card from '../../cards/Card';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Slot from '../../Slot';
import { createList, updateList } from '../../../src/graphql/mutations';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import IconClose from '../../icons/IconClose';
import { useAuthContext } from '../../../providers/auth-data-provider';
import CardTitle from '../../CardTitle';
import { genericErrorMessage } from '../../../consts';

const MyListForm = ({ item, onCreate, onUpdate, onCancel ,itemsList}: { item?: List; onCreate: Function; onUpdate: Function; onCancel: () => void;itemsList:any }) => {
    const listNames: Array<string> = itemsList.map((item:any) => item.name.trim().toLowerCase());
    const [isBusy, setIsBusy] = useState(false);
    const [error, setError] = useState<Error>();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<Error>();

    const { user } = useAuthContext();
    const groupname = user?.attributes['custom:group_name'];

    useEffect(() => {
        if (!item) {
            setId('');
            setName('');
            return;
        }
        setId(item.id);
        setName(item.name);
    }, [item]);

    const isFormValid = async () => {
        let err;
        let isValid = true;
        err = name && name.trim().length ? listNames.includes(name.trim().toLowerCase()) ? new Error("List with the same name already exists"): undefined: new Error('Invalid name');
        isValid = err ? false : isValid;
        setNameError(err);
        return isValid;
    };

    const getInput = () => {
        let operation = createList;
        let operationName = 'createList';
        let input = {
            name,
            groupId: groupname,
            tenants: [groupname],
        };
        if (id) {
            operation = updateList;
            operationName = 'updateList';
            input = { ...input, ...{ id } };
        }
        return { operation, operationName, input };
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (await isFormValid() !== true) {
            return;
        }
        setIsBusy(true);
        const { operation, operationName, input } = getInput();
        let response: any;
        try {
            response = await API.graphql(graphqlOperation(operation, { input }));
            (await id) ? onUpdate(response.data[operationName]) : onCreate(response.data[operationName]);
        } catch (err) {
            console.log(`Error in ${operationName} - ${JSON.stringify(err, null, 2)}`);
            setError(new Error(genericErrorMessage));
        }
        setIsBusy(false);
    };

    return (
        <form method="POST" onSubmit={onSubmit}>
            <Card>
                <Slot slot="header">
                    <CardTitle>New List</CardTitle>
                    <span className="is-clickable" onClick={onCancel}>
                        <IconClose />
                    </span>
                </Slot>
                <Slot slot="body">
                    <div className="panel-block is-block">
                        <FormInput
                            name="name"
                            type="search"
                            label="List Name"
                            value={name}
                            onChange={setName}
                            placeholder="Enter name of your list"
                            isLast={true}
                            error={nameError}
                        />
                        <ErrorNotificaition error={error} />
                    </div>
                </Slot>
                <Slot slot="footer">
                    <FormButton variant={['is-outlined', 'is-ui-button']} disabled={isBusy} loading={isBusy} type="submit">
                        Create
                    </FormButton>
                </Slot>
            </Card>
        </form>
    );
};

export default MyListForm;
