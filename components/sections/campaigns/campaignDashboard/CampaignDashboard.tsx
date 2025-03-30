import CampaignBanner from "../components/CampaignBanner"
import MyCampaignList from "./MyCampaignList"
import React , {useState} from 'react'
import { UserAttributes } from '../../../../types';


const handleChange = () => {
    console.log("switched")
}

function CampaignDashboard() {
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

   const bannerText:string="Connect your email and put your outbound prospecting on cruise control."
   const bannerButtonText:string="Connect Email"
  return (
    <div>
        <CampaignBanner  bannerText={bannerText} bannerButtonText={bannerButtonText} />
        <MyCampaignList items={accountItems} isBusy={isBusy} onNew={onNew} onEdit={onEdit} onDelete={onDelete} isNewDisabled={false}/>
    </div>
  )
}

export default CampaignDashboard