import React , {useState} from 'react'
import { CognitoUserData, UserAttributes } from '../../../../../types';
import CampaignSummaryMenu from '../../components/CampaignSummaryMenu'
import CampaignContactHeader from '../../components/CampaignContactHeader'
import CampaignContactItems from '../../components/CampaignContactItem'

const handleChange = () => {
    console.log("switched")
}

function CampaignContacts() {
    const [isBusy, setIsBusy] = useState(false);
    const [accountItems, setAccountItems] = useState<UserAttributes[]>([]);
    const [activeUser, setActiveUser] = useState<UserAttributes>();
	const [nextToken, setNextToken] = useState<string>();
	const [isModalActive, setIsModalActive] = useState(false);
    const onNew = () => {
        setActiveUser(undefined);
        setIsModalActive(true);
    };

    const onEdit = (username: string) => {
        try {
            const index = accountItems.findIndex((user) => user.sub === username);
            if (index !== -1) {
                setActiveUser(accountItems[index]);
                setIsModalActive(true);
            }
        } catch (err) {
            //
        }
    };
    const onDelete = async (username: string) => {
        alert("1")
    };
    return (
        <div>
            <CampaignSummaryMenu />
            <CampaignContactHeader />
            <CampaignContactItems items={accountItems} isBusy={isBusy} onNew={onNew} onEdit={onEdit} onDelete={onDelete} isNewDisabled={false} />
        </div>
    )
}

export default CampaignContacts

