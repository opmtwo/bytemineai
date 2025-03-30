import classNames from 'classnames';
import { useRouter } from 'next/router';
import Anchor from '../../../Anchor';
import IconTarget from "../icons/IconTarget"



const CampaignSummaryMenu = () => {
    const router = useRouter();
    const currentPathName = (router.pathname == "/campaigns/summary")
    console.log(currentPathName)
    //    const img = IconTarget
    const menuItems = [

        {
            title: 'Campaign Summary',
            href: '/campaigns/summary',
        },
        {
            title: 'Contacts',
            href: '/campaigns/contacts',
        },
        {
            title: 'Settings',
            href: '/campaigns/settings',
        },
    ];
    const items = menuItems
        .map((item) => {
            const isActive =
                router.pathname === item.href ||
                router.pathname.startsWith(`${item.href}/`);
            return (
               
                <Anchor
                    key={item.title}
                    href={item.href}
                    className={classNames("navbar-item", { "is-active": isActive })}
                >
                    {isActive ? (
                        <span
                            className="is-overlay has-background-primary has-radius"
                            style={{ opacity: 0.1 }}
                        ></span>
                    ) : (
                        null //(item.flag) ? (<div style={(item.flag === 'Sales') ? ({marginRight: "5px",fontSize: "10px",backgroundColor: "green",color: "#FFF",borderRadius: "3px",paddingLeft: "5px",paddingRight: "5px"}):({marginRight: "5px",fontSize: "10px",backgroundColor: "orange",color: "#FFF",borderRadius: "3px",paddingLeft: "5px",paddingRight: "5px"})}> {item.flag} </div>) : (null)
                    )}
                    {item.title}
                </Anchor>

            );
        });

    return <>
        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start mb-4">{items}</div>
                <div className="navbar-end">
                    <a className="navbar-item" style={{ color: "#0091FF", fontSize: "10px" }}>How to manage my campaings?</a>
                    <div className='mt-1'><IconTarget className='' /></div>
                    <a className="navbar-item " style={{ fontSize: "10px" }}>Autonomous<br /> Campaigns</a>
                </div>
        </div>
    </>;
};

export default CampaignSummaryMenu;
