import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";
import { AccountInfo, AccountType, UserAttributes } from "../types";

import { parseCognitoUser } from "../utils/user-utils";
import Storage from "@aws-amplify/storage";
import { useAuthContext } from "./auth-data-provider";

const SettingsContext = createContext<{
  loading: boolean;
  settings?: UserAttributes;
  isExpired: boolean;
  canUpgrade: boolean;
  totalCredits: number;
  totalUsage: number;
  totalSearches: number;
  logoUrl?: string;
  isLogoLoading: boolean;
  iconUrl?: string;
  isIconLoading: boolean;
  setSettings: Dispatch<SetStateAction<UserAttributes | undefined>>;
  initSettings: (id: string) => UserAttributes | undefined;
  initSettingsAndUsage: (id: string) => UserAttributes | undefined;
  getGroupSettings: (id: string) => AccountInfo | void;
  getGroupUsage: (id: string) => AccountInfo | void;
  updateGroupSettings: (
    id: string,
    data: UserAttributes
  ) => UserAttributes | undefined;
  getLogo: (id: string) => string | undefined;
  getIcon: (id: string) => string | undefined;
}>({
  loading: false,
  isExpired: false,
  totalCredits: 0,
  totalUsage: 0,
  totalSearches: 0,
  canUpgrade: true,
  logoUrl: undefined,
  isLogoLoading: false,
  iconUrl: undefined,
  isIconLoading: false,
  setSettings: () => {},
  initSettings: () => undefined,
  initSettingsAndUsage: () => undefined,
  getGroupSettings: () => undefined,
  getGroupUsage: () => undefined,
  updateGroupSettings: () => undefined,
  getLogo: () => undefined,
  getIcon: () => undefined,
});

const SettingsProvider = (props: any) => {
  const [settings, setSettings] = useState<UserAttributes>();
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [canUpgrade, setCanUpgrade] = useState(false);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [totalSearches, setTotalSearches] = useState<number>(0);
  const [logoUrl, setLogoUrl] = useState<string>();
  const [isLogoLoading, setIsLogoLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const getToken = async (isApi: boolean = false) => {
    let token;
    try {
      if (isApi) {
        token = `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`;
      } else {
        token = `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`;
      }
    } catch (err) {
      console.log("Error fetching token in settings provider", err);
    }
    return token;
  };

  const getInput = async (body: any) => {
    const options = {
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: await getToken(true),
      },
    };
    return options;
  };

  const getOptions = async (body: any) => {
    const options = {
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: await getToken(),
      },
    };
    return options;
  };

  const getGroupSettings = async (id: string) => {
    const options = await getInput({ groupId: id });
    let response;
    try {
      response = await API.post("nymblrRestApi", "/api/settings", options);
    } catch (err) {
      console.log("Error fetching settings", err);
    }
    return response;
  };

  const getGroupUsage = async (id: string) => {
    const options = await getInput({ groupId: id });
    let response;
    try {
      response = await API.post("nymblrRestApi", "/api/usage", options);
    } catch (err) {
      console.log("Error fetching settings", err);
    }
      
    return response;
  };

  const updateGroupSettings = async (id: string, data: UserAttributes) => {
    const options = await getOptions({
      username: id.trim(),
      color_code: data["custom:color_code"],
      logo_s3_key: data["custom:logo_s3_key"],
      icon_s3_key: data["custom:icon_s3_key"],
    });
    let response;
    try {
      response = await API.post("AdminQueries", "/updateSettings", options);
    } catch (err) {
      console.log("createUser - error", err);
    }
    console.log({ response });
  };

  const initSettings = async (id: string) => {
    if (!id) {
      setIsLogoLoading(false);
      return;
    }
    let response;
    try {
      response = await getGroupSettings(id);
    } catch (err) {
      console.log("initSettings - error", err);
    }
    if (!response?.account) {
      setIsLogoLoading(false);
      return;
    }
    const account = response?.account;
    const attributes = parseCognitoUser(account);

    attributes['custom:credits'] = response.attributes.credits;
    attributes['custom:bonus_credits'] = response.attributes.bonus_credits;
    attributes['custom:monthly_credits'] = response.attributes.monthly_credits;
    attributes['custom:yearly_credits'] = response.attributes.yearly_credits;
    attributes['custom:account_type'] = response.attributes.account_type;
    attributes['custom:renewal_period'] = response.attributes.renewal_period;
    attributes['custom:renewal_date'] = response.attributes.renewal_date;
    //attributes
      setTotalCredits(parseInt(response.attributes.credits || '0'));
      
    setSettings(attributes);
    setLogoUrl(attributes["custom:logo_s3_url"]);
    setIsLogoLoading(false);
    const canUpgradeAccount =
    response.attributes.account_type === AccountType.Trial;
    setCanUpgrade(canUpgradeAccount);
    return { attributes };
  };

  const initSettingsAndUsage = async (id: string) => {
    setLoading(true);
    const response = await getGroupUsage(id);
    const account = response?.account;
    const attributes = parseCognitoUser(account);
    const isAccountExpired = response?.isExpired ? true : false;
    const accountCredits = response?.totalCredits || 0;
    const accountUsage = response?.totalUsage || 0;
    const accountSearches = response?.totalSearches || 0;
    const canUpgradeAccount =
      attributes["custom:account_type"] === AccountType.Trial;

    setSettings(attributes);
    setIsExpired(isAccountExpired);
    setTotalCredits(accountCredits);
    setTotalUsage(accountUsage);
    setCanUpgrade(canUpgradeAccount);
    setTotalSearches(accountSearches);
    setLoading(false);
    return {
      attributes,
      isExpired: isAccountExpired,
      totalCredits: accountCredits,
      totalUsage: accountUsage,
    };
  };

  const getLogo = async (key: string) => {
    try {
      return await Storage.get(key, { level: "public", expires: 1800 });
    } catch (err) {
      console.log("Error fetching logo image from storage", err);
    }
  };

  const getIcon = async (key: string) => {
    try {
      return await Storage.get(key, { level: "public", expires: 1800 });
    } catch (err) {
      console.log("Error fetching icon image from storage", err);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        loading,
        settings,
        isExpired,
        canUpgrade,
        totalCredits,
        totalUsage,
        totalSearches,
        logoUrl,
        isLogoLoading,
        setSettings,
        initSettingsAndUsage,
        initSettings,
        getGroupSettings,
        getGroupUsage,
        updateGroupSettings,
        getLogo,
        getIcon,
      }}
      {...props}
    />
  );
};

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsProvider;
