import classNames from "classnames";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth-data-provider";
import { Roles } from "../../types";
import Anchor from "../Anchor";

const HeaderMenu = () => {
  const router = useRouter();
  const { isAdmin, isRoot, user } = useAuthContext();
  const isUser = user?.attributes["custom:role"] === Roles.User;
  const isManager = user?.attributes["custom:role"] === Roles.Manager;

  const menuItems = [

    {
      title: "Dashboard",
      href: "/",
      canAccess: true,
    },
    {
      title: "Prospect Finder",
      href: "/prospect-finder",
      canAccess: true,
      flag: 'Sales'
    },
    {
      title: "Audience Builder",
      href: "/audience-builder",
      canAccess: true,
      flag: 'Marketing'
    },
    {
      title: "Audiences",
      href: "/audiences",
      canAccess: true,
    },
    //{
    //  title: "Campaigns",
    //  href: "/campaigns",
    //  canAccess: true,
    //},
    {
        title: "Enrich",
        href: "/enrich",
        canAccess: true,
    },
    //{
    //  title: "My Contacts",
    //  href: "/my-contacts",
    //  canAccess: true,
    //},
    {
      title: "My Lists",
      href: "/my-lists",
      canAccess: true,
    },
    //{
    //	title: 'My Team',
    //	href: '/account-settings/my-team',
    //	canAccess: isRoot || isAdmin || isManager,
    //},
    //{
    //  title: "Admin Panel",
    //  href: "/admin-panel",
    //  canAccess: isRoot,
    //},
  ];

  const items = menuItems
    .filter((item) => item.canAccess)
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
          {(item.flag) ? (<div style={(item.flag === 'Sales') ? ({marginRight: "5px",fontSize: "10px",backgroundColor: "green",color: "#FFF",borderRadius: "3px",paddingLeft: "5px",paddingRight: "5px"}):({marginRight: "5px",fontSize: "10px",backgroundColor: "orange",color: "#FFF",borderRadius: "3px",paddingLeft: "5px",paddingRight: "5px"})}> {item.flag} </div>) : (null)}
          {item.title}
        </Anchor>

      );
    });

  return <div className="navbar-start">{items}</div>;
};

export default HeaderMenu;
