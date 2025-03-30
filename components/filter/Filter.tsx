import { FormEventHandler, useEffect, useState } from "react";
import API, { graphqlOperation } from "@aws-amplify/api";
import isValidDomain from "is-valid-domain";
import isFQDN from 'validator/lib/isFQDN';
import moment from "moment";
import isEmpty from "validator/lib/isEmpty";
import {
  Contact,
  FilterItem,
  FilterModel,
  RampedUpFilter,
  SelectOption
} from "../../types";
import Card from "../cards/Card";
import FormButton from "../form/FormButton";
import Slot from "../Slot";
const Slider = require("rc-slider");
import FormSelectCreatable from "../form/FormSelectCreatable";
import { RampedUpIndustryOptions } from "../../ramped-up/ramped-up-industries";
import FormSelectSearchable from "../form/FormSelectSearchable";
import { RampedUpJobFunctionOptions } from "../../ramped-up/ramped-up-job-functions";
import FormInput from "../form/FormInput";
import RampedUpSicCodes from "../../ramped-up/ramped-up-sic-codes";
import { RampedUpEmployeeSizeOptions } from "../../ramped-up/ramped-up-employee-sizes";
import { RampedUpTitleLevelOptions } from "../../ramped-up/ramped-up-title-levels";
import { RampedUpStatesOptions } from "../../ramped-up/ramped-up-states";
import { RampedUpRevenueRangeOptions } from "../../ramped-up/ramped-up-revenue-ranges";
import { RampedUpContactLevelOptions } from "../../ramped-up/ramped-up-contact-levels";
import { RampedUpCountryOptions } from "../../ramped-up/ramped-up-countries";
import { RampedUpCompanyTypeOptions } from "../../ramped-up/ramped-up-company-types";
import RampedUpSkills from "../../ramped-up/ramped-up-skills";
import RampedUpSchools from "../../ramped-up/ramped-up-schools";
import RampedUpInterests from "../../ramped-up/ramped-up-interests";
import CardTitle from "../CardTitle";
import ErrorNotificaition from "../notifications/ErrorNotification";
import styles from "./filter.module.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import "rc-slider/assets/index.css";
import { createFilter } from "../../src/graphql/mutations";
import { useAuthContext } from "../../providers/auth-data-provider";
import { genericErrorMessage } from "../../consts";
import { attempt } from "lodash";
import Tabs from "../Tabs";
import FormCheckbox from "../form/FormCheckbox";
import FormDoubleCheckbox from "../form/FormDoubleCheckbox";
import { RampedUpTitlesToIgnoreOptions } from "../../ramped-up/ramped-up-titles-to-ignore";
import IconSearchAlt from "../icons/IconSearchAlt";
import SaveFilterForm from "../SaveFilterForm";
import FormField from "../form/FormField";
import FormLabel from "../form/FormLabel";
import IconFilter from "../icons/IconFilter";

import FilterUploadList from "./FilterUploadList";

//import ReactSelect, { ActionMeta, MultiValue, components } from "react-select";
// import RampedUpCities from '../../ramped-up/ramped-up-cities';

// enum FilterTab {
//   "AdditionalOptions" = "Data Preferences",
//   "Suppress" = "Suppress",
// }

const Filter = ({
  isContactsOnly,
  hasHistory,
  activeFilter,
  onSubmit,
  onClear,
  onViewHistory,
  saveLabel = "Save",
  clearLabel = "Clear",
  historyLabel = "My Searches",
  contacts,
  onFilterUpdate,
  isLast = false,
  isProspectFinder = true,
}: {
  isContactsOnly?: boolean;
  hasHistory?: boolean;
  activeFilter?: FilterModel;
  onSubmit: (value: RampedUpFilter, model?: FilterModel) => void;
  onClear: () => void;
  onViewHistory?: () => void;
  saveLabel?: string;
  clearLabel?: string;
  historyLabel?: string;
  contacts?: Contact[];
  isLast?: boolean;
  isProspectFinder?: boolean;
  onFilterUpdate?: (newFilter: RampedUpFilter) => void;
}) => {
  const [isBusy, setIsBusy] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error>();
  //   const [activeTab, setActiveTab] = useState<string>(
  //     FilterTab.AdditionalOptions
  //   );

  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState<Error>();
  const [firstName, setFirstName] = useState<SelectOption[]>([]);
  const [firstNameError, setFirstNameError] = useState<Error>();
  const [lastName, setLastName] = useState<SelectOption[]>([]);
  const [lastNameError, setLastNameError] = useState<Error>();
  const [yearFounded, setYearFounded] = useState("");
  const [yearFoundedError, setYearFoundedError] = useState<Error>();
  const [keywords, setKeywords] = useState<SelectOption[]>();
  const [companyNames, setCompanyNames] = useState<SelectOption[]>([]);
  const [urls, setUrls] = useState<SelectOption[]>();
  const [urlsError, setUrlsError] = useState<Error>();
  const [industries, setIndustries] = useState<SelectOption[]>();
  const [schools, setSchools] = useState<SelectOption[]>();
  const [jobTitles, setJobTitles] = useState<SelectOption[]>([]);
  const [sicCodes, setSicCodes] = useState<SelectOption[]>([]);
  const [employeeSizes, setEmployeeSizes] = useState<SelectOption[]>([]);
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [skills, setSkills] = useState<SelectOption[]>([]);
  const [interests, setInterests] = useState<SelectOption[]>([]);
  const [seniorityLevels, setSeniorityLevels] = useState<SelectOption[]>([]);
  const [companyRevenues, setCompanyRevenues] = useState<SelectOption[]>([]);
  const [hqLocations, setHqLocations] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [states, setStates] = useState<SelectOption[]>([]);
  const [companyTypes, setCompanyTypes] = useState<SelectOption[]>([]);
  const [urlsToSuppress, setUrlsToSuppress] = useState<SelectOption[]>([]);
  const [titlesToSuppress, setTitlesToSuppress] = useState<SelectOption[]>([]);
  const [emailsToSuppress, setEmailsToSuppress] = useState<SelectOption[]>([]);
  const [hasChangedJobRecently, setHasChangedJobRecently] = useState(false);
  const [hasPrimaryContactsOnly, setHasPrimaryContactsOnly] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [excludeExisting, setExcludeExisting] = useState(false);
  const [hasDirectDialOnly, setHasDirectDialOnly] = useState(false);
  const [hasRequiredEmail, setHasRequiredEmail] = useState(false);
  const [hasPersonalEmailOnly, setHasPersonalEmailOnly] = useState(false);
  const [hasLocalAddress, setHasLocalAddress] = useState(false);
  const [hasValidateEmails, setHasValidateEmails] = useState(false);

  // url options
  const [urlOptions, setUrlOptions] = useState<SelectOption[]>([]);

  // save filter modal
  const [filterData, setFilterData] = useState<RampedUpFilter>();
  const [isSaveModalActive, setIsSaveModalActive] = useState(false);

  const { user } = useAuthContext();
  const groupname = user?.attributes["custom:group_name"];

  // used to track first load - Don't wanna run filter on first load
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const onReset = () => {
    setIsBusy(false);
    setError(undefined);
    setWebsite("");
    setWebsiteError(undefined);
    setFirstName([]);
    setFirstNameError(undefined);
    setLastName([]);
    setLastNameError(undefined);
    setYearFounded("");
    setYearFoundedError(undefined);
    setKeywords([]);
    setCompanyNames([]);
    setSkills([]);
    setSchools([]);
    setInterests([]);
    setUrls([]);
    setUrlsError(undefined);
    setIndustries([]);
    setJobTitles([]);
    setSicCodes([]);
    setEmployeeSizes([]);
    setDepartments([]);
    setSeniorityLevels([]);
    setCompanyRevenues([]);
    setHqLocations([]);
    setCities([]);
    setStates([]);
    setCompanyTypes([]);
    setUrlsToSuppress([]);
    setTitlesToSuppress([]);
    setEmailsToSuppress([]);
    setHasChangedJobRecently(false);
    setHasPrimaryContactsOnly(false);
    setHasPhone(false);
    setHasDirectDialOnly(false);
    setHasRequiredEmail(false);
    setHasPersonalEmailOnly(false);
    setHasLocalAddress(false);
    setHasValidateEmails(false);
    setExcludeExisting(false);
    onClear();
  };

  useEffect(() => {
    if (!onFilterUpdate || !contacts?.length) {
      return;
    }
    onFilterUpdate(getNewFilter());
  }, [contacts]);

  useEffect(() => {
    if (!activeFilter) {
      return;
    }
    const rampedUpFilter: RampedUpFilter | Error = attempt(
      JSON.parse.bind(null, activeFilter.rampedUpFilter)
    );
    if (rampedUpFilter instanceof Error) {
      return;
    }
    setWebsite(rampedUpFilter?.website || "");
    setFirstName(rampedUpFilter?.firstName || []);
    setLastName(rampedUpFilter?.lastName || []);
    setYearFounded(rampedUpFilter?.yearFounded || "");
    setKeywords(rampedUpFilter?.keywords || []);
    setCompanyNames(rampedUpFilter?.companyNames || []);
    setUrls(rampedUpFilter?.urls || []);
    setIndustries(rampedUpFilter?.industries || []);
    setJobTitles(rampedUpFilter?.jobTitles || []);
    setSicCodes(rampedUpFilter?.sicCodes || []);
    setEmployeeSizes(rampedUpFilter?.employeeSizes || []);
    setDepartments(rampedUpFilter?.departments || []);
    setSeniorityLevels(rampedUpFilter?.seniorityLevels || []);
    setCompanyRevenues(rampedUpFilter?.companyRevenues || []);
    setHqLocations(rampedUpFilter?.hqLocations || []);
    setSkills(rampedUpFilter?.skills || []);
    setSchools(rampedUpFilter?.schools || []);
    setInterests(rampedUpFilter?.interests || []);
    setCities(rampedUpFilter?.cities || []);
    setStates(rampedUpFilter?.states || []);
    setCompanyTypes(rampedUpFilter?.companyTypes || []);
    setUrlsToSuppress(rampedUpFilter?.urlsToSuppress || []);
    setTitlesToSuppress(rampedUpFilter?.titlesToSuppress || []);
    setEmailsToSuppress(rampedUpFilter?.emailsToSuppress || []);
    setHasChangedJobRecently(rampedUpFilter?.hasChangedJobRecently || false);
    setHasPrimaryContactsOnly(rampedUpFilter?.hasPrimaryContactsOnly || false);
    setHasPhone(rampedUpFilter?.hasPhone || false);
    setHasDirectDialOnly(rampedUpFilter?.hasDirectDialOnly || false);
    setHasRequiredEmail(rampedUpFilter?.hasRequiredEmail || false);
    setHasPersonalEmailOnly(rampedUpFilter?.hasPersonalEmailOnly || false);
    setHasLocalAddress(rampedUpFilter?.hasLocalAddress || false);
    setHasValidateEmails(rampedUpFilter?.hasValidateEmails || false);
    setExcludeExisting(rampedUpFilter?.excludeExisting || false);
  }, [activeFilter]);

  /**
   * @summary
   * Use effect to detect filter change and rerun search
   */
  useEffect(() => {
    const updatedFilter: RampedUpFilter = getNewFilter();
    onFilterUpdate && onFilterUpdate(updatedFilter);

    // if minimum one filter has been selected then clear error message
    if (hasMinimumOneFilter(updatedFilter)) {
      setError(undefined);
    }

    // if first load - then skip - we need to show info component
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    // filter has changed - search once again
    onSubmit && onSubmit(updatedFilter);
  }, [
    website,
    firstName,
    lastName,
    yearFounded,
    keywords?.length,
    companyNames?.length,
    urls?.length,
    industries,
    jobTitles?.length,
    sicCodes,
    employeeSizes,
    departments,
    skills,
    schools,
    interests,
    seniorityLevels,
    companyRevenues,
    hqLocations?.length,
    cities?.length,
    states,
    companyTypes?.length,
    urlsToSuppress?.length,
    titlesToSuppress?.length,
    emailsToSuppress?.length,
    hasChangedJobRecently,
    hasPrimaryContactsOnly,
    hasPhone,
    hasDirectDialOnly,
    hasRequiredEmail,
    hasPersonalEmailOnly,
    hasLocalAddress,
    hasValidateEmails,
    urlOptions,
    excludeExisting,
  ]);

  const isFormValid = async () => {
    let err;
    let isValid = true;

    err =
      isEmpty(website) || isValidDomain(website)
        ? undefined
        : new Error("Please enter a valid domain");
    isValid = err ? false : isValid;
    setWebsiteError(err);

    err =
      isEmpty(yearFounded) || moment.isDate(moment(yearFounded, "YYYY", true))
        ? undefined
        : new Error("Please enter a valid year");
    isValid = err ? false : isValid;
    setYearFoundedError(err);

    err = urls?.some(
      (item) => !isEmpty(item?.value) && !isValidDomain(item.value)
    )
      ? new Error("Please enter a valid domain")
      : undefined;
    isValid = err ? false : isValid;
    setUrlsError(err);

    return isValid;
  };

  const getNewFilter = () => ({
    website,
    firstName,
    lastName,
    yearFounded,
    keywords,
    urls: [...urlOptions, ...(urls || [])],
    industries,
    jobTitles,
    sicCodes,
    companyNames,
    employeeSizes,
    departments,
    skills,
    schools,
    interests,
    seniorityLevels,
    companyRevenues,
    hqLocations,
    cities,
    states,
    companyTypes,
    urlsToSuppress,
    titlesToSuppress,
    emailsToSuppress,
    hasChangedJobRecently,
    hasPrimaryContactsOnly,
    hasPhone,
    hasDirectDialOnly,
    hasRequiredEmail,
    hasPersonalEmailOnly,
    hasLocalAddress,
    hasValidateEmails,
    excludeExisting,
  });

  const hasMinimumOneFilter = (newFilter: RampedUpFilter) =>
    Object.values(newFilter).some((filterItem) => {
      if (typeof filterItem === "string") {
        return !isEmpty(filterItem);
      }
      if (typeof filterItem === "object") {
        return filterItem.length !== 0;
      }
    });

  const getInput = () => {
    let operation = createFilter;
    let operationName = "createFilter";
    let input = {
      savedFilter:true,
      userId: user?.attributes.sub,
      tenants: [groupname],
      rampedUpFilter: JSON.stringify(getNewFilter()),
    };
    return { operation, operationName, input };
  };

  const save = async () => {
    const { operation, operationName, input } = getInput();
    let response: any;
    try {
      response = await API.graphql(graphqlOperation(operation, { input }));
      console.log("save response", response);
      return response.data[operationName];
    } catch (err) {
      console.log(
        `Error in ${operationName} - ${JSON.stringify(err, null, 2)}`
      );
      setError(
        new Error(
          err?.response?.data?.message || err?.message || genericErrorMessage
        )
      );
    }
  };

  const handleSave: FormEventHandler<HTMLFormElement> | undefined = async (
    e
  ) => {
    e?.preventDefault();
    const newFilter = getNewFilter();
    if (!hasMinimumOneFilter(newFilter)) {
      setError(new Error("Please select at least one filter"));
      return;
    }
    setFilterData(getNewFilter() as RampedUpFilter);
    setIsSaveModalActive(true);
  };

  const onSaveCancel = () => setIsSaveModalActive(false);

  const onSaveSubmit = (filter: FilterModel) => {
    //
    setIsSaveModalActive(false);
  };

  const onSaveUpdate = (filter: FilterModel) => {
    //
    setIsSaveModalActive(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    e
  ) => {
    e?.preventDefault();

    if (!(await isFormValid())) {
      setError(new Error("Form contains one or more errors"));
      return;
    }

    const newFilter = getNewFilter();
    if (!hasMinimumOneFilter(newFilter)) {
      setError(new Error("Please select at least one filter"));
      return;
    }

    setError(undefined);

    // setIsBusy(true);
    // const model = await save();
    // if (!model?.id) {
    // 	setIsBusy(false);
    // 	return;
    // }

    await onSubmit(newFilter);
    setIsBusy(false);
  };


  // for setting the included options
  const setIncluded = (props: { data: any, options: any[] }, callBack: any, action: any) => {
    const { data, options = [] } = props
    const isContain: boolean = options?.includes(data)

    if (!isContain) {
      data.included = true;
      data.excluded = false;
      callBack([...options, ...[data]])
    } 
    else {
      if (isContain && data.excluded == true) {
        data.included = true;
        data.excluded = false;
        callBack([...options])
      }
  }
}

  // for setting the excluded options
  const setExcluded = (props: { data: any, options: any[] }, callBack: any, action: any) => {
    const { data, options = [] } = props
    const isContain: boolean = options?.includes(data)
    if (!isContain) {
      data.included = false;
      data.excluded = true;
      callBack([...options, ...[data]])
    }  
    else {
      if (isContain && data.included == true) {
        data.included = false;
        data.excluded = true;
        callBack([...options])
      }
  }
  }

  const stateSetters: any = {
    seniorityLevels: setSeniorityLevels,
    departments: setDepartments,
    contactSkills: setSkills,
    interests: setInterests,
    industries: setIndustries,
    sicCodes: setSicCodes,
    companyRevenues: setCompanyRevenues,
    employeeSizes: setEmployeeSizes,
    states: setStates,
    contactEducation: setSchools,
  };
  
  const removedValue = (removedValue: any, newValue: any[]) => {
    if (removedValue?.action === "remove-value" || removedValue?.action === "clear") {
      const name = removedValue?.name;
      if (name in stateSetters) {
        stateSetters[name](removedValue?.action === "clear" ? [] : newValue);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="filter-form">
        <ErrorNotificaition error={error} className="pb-5" />
        <Card>
          <Slot slot="header">
            <CardTitle>Filters</CardTitle>
            <div className="ml-a is-flex is-align-items-center">
              <FormButton
                size="is-small"
                variant={["is-inverted"]}
                color="is-dark"
                type="reset"
                onClick={onReset}
              >
                {clearLabel}
              </FormButton>
              {onViewHistory && hasHistory && isProspectFinder && (
                <FormButton
                  size="is-small"
                  variant={["is-inverted"]}
                  color="is-dark"
                  type="button"
                  onClick={onViewHistory}
                  disabled={isBusy}
                >
                  {historyLabel}
                </FormButton>
              )}
              {!isContactsOnly && isProspectFinder && (
                <FormButton
                  variant={["is-outlined"]}
                  className="ml-2"
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  loading={isSaving}
                >
                  {saveLabel}
                </FormButton>
              )}

              {/* {isContactsOnly ? null : (
								<FormButton
									type="button"
									variant={['is-inverted']}
									color="is-primary"
									className="ml-3 px-0"
									onClick={handleSubmit}
									loading={isBusy}
									disabled={isBusy}
								>
									<IconSearchAlt />
								</FormButton>
							)} */}
            </div>
          </Slot>
          <Slot slot="body">
            <div className="panel-block is-block is-filter p-0">
              <div className="panel-block is-filter p-0">
                <FormField isLast={isLast}>
                  <div className={styles.dataRequirement}>
                    <IconFilter className={styles.filterIcon} />
                    <label>Data Requirements</label>
                  </div>
                  <div className={styles.dataRequirementFilter}>
                    <FormDoubleCheckbox
                      value={hasRequiredEmail}
                      label="Work Email"
                      isChecked={hasRequiredEmail}
                      onChange={setHasRequiredEmail}
                    />
                    <FormDoubleCheckbox
                      value={hasPersonalEmailOnly}
                      label="Personal Email"
                      isChecked={hasPersonalEmailOnly}
                      onChange={setHasPersonalEmailOnly}
                    />
                    <FormDoubleCheckbox
                      value={hasDirectDialOnly}
                      label="Cell Phone"
                      isChecked={hasDirectDialOnly}
                      onChange={setHasDirectDialOnly}
                    /> 
                    <FormDoubleCheckbox
                      value={excludeExisting}
                      label="Exclude My Contacts"
                      isChecked={excludeExisting}
                      onChange={setExcludeExisting}
                    />
                  </div>
                </FormField>
                {/* <Tabs
                  options={FilterTab}
                  onClick={setActiveTab}
                  activeId={activeTab}
                /> */}
                {/* {activeTab === FilterTab.Suppress ? (
								<>
									<FormSelectCreatable
										name="urlsToSuppress"
										label="Urls to Suppress"
										placeholder="Enter urls to suppress"
										value={urlsToSuppress}
										onChange={setUrlsToSuppress}
										options={[]}
										isMulti={true}
										iconLeft={<span className="material-icons">query_stats</span>}
									/>
									<FormSelectSearchable
										name="titlesToSuppress"
										label="Titles to Suppress"
										placeholder="Enter titles to suppress"
										value={titlesToSuppress}
										onChange={setTitlesToSuppress}
										options={RampedUpTitlesToIgnoreOptions}
										isMulti={true}
										iconLeft={<span className="material-icons">query_stats</span>}
									/>
									<FormSelectCreatable
										name="emailsToSuppress"
										label="Emails to Suppress"
										placeholder="Enter email addresses to suppress"
										value={emailsToSuppress}
										onChange={setEmailsToSuppress}
										options={[]}
										isMulti={true}
										iconLeft={<span className="material-icons">query_stats</span>}
									/>
								</>
							) : null}
							{activeTab === FilterTab.AdditionalOptions ? (
								<>
									<FormCheckbox
										value={hasRequiredEmail}
										label="Work Email"
										isChecked={hasRequiredEmail}
										onChange={setHasRequiredEmail}
									/>
									<FormCheckbox
										value={hasPersonalEmailOnly}
										label="Personal Email"
										isChecked={hasPersonalEmailOnly}
										onChange={setHasPersonalEmailOnly}
									/>
									<FormCheckbox
										value={hasPhone}
										label="Phone Number"
										isChecked={hasPhone}
										onChange={setHasPhone}
									/>
									<FormCheckbox
										value={hasDirectDialOnly}
										label="Direct Dial"
										isChecked={hasDirectDialOnly}
										onChange={setHasDirectDialOnly}
									/>
									<FormCheckbox
										value={hasChangedJobRecently}
										label="Recent Job Change"
										isChecked={hasChangedJobRecently}
										onChange={setHasChangedJobRecently}
									/>
									
								</>
							) : null} */}
              </div>
              <FormSelectCreatable
                name="jobTitles"
                label="Job Titles"
                placeholder="Enter job titles"
                value={keywords}
                onChange={setKeywords}
                options={[]}
                isMulti={true}
                iconLeft={<span className="material-icons">work</span>}
              />


              <FormSelectSearchable
                name="seniorityLevels"
                label="Seniority Level"
                placeholder="Enter person seniority level"
                value={seniorityLevels}
                // onChange={setSeniorityLevels}
                options={RampedUpContactLevelOptions}
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setSeniorityLevels}
                removedValue={removedValue}
                isMulti={true}
                iconLeft={
                  <span className="material-icons">
                    align_horizontal_center
                  </span>
                }

              />
              <FormSelectSearchable
                name="departments"
                label="Department"
                placeholder="Enter person department"
                value={departments}
                // onChange={setDepartments}
                options={RampedUpJobFunctionOptions}
                isMulti={true}
                iconLeft={<span className="material-icons">account_tree</span>}
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setDepartments}
                removedValue={removedValue}
              />
              <FormSelectSearchable
                name="contactSkills"
                label="Skills"
                placeholder="Enter skills"
                value={skills}
                // onChange={setSkills}
                options={RampedUpSkills}
                isMulti={true}
                minChars={2}
                iconLeft={
                  <span className="material-icons">
                    integration_instructions
                  </span>
                }
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setSkills}
                removedValue={removedValue}
              />
              <FormSelectSearchable
                name="interests"
                label="Interests"
                placeholder="Enter interests"
                value={interests}
                // onChange={setInterests}
                options={RampedUpInterests}
                isMulti={true}
                minChars={2}
                iconLeft={
                  <span className="material-icons">
                    integration_instructions
                  </span>
                }
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setInterests}
                removedValue={removedValue}
              />
              <FormSelectCreatable
                name="companyNames"
                label="Company Name"
                placeholder="Enter company name"
                value={companyNames}
                onChange={setCompanyNames}
                options={[]}
                isMulti={true}
                iconLeft={<span className="material-icons">domain</span>}
              />
              <FormSelectCreatable
                name="urls"
                label="Company Domain"
                placeholder="Enter company domain name"
                value={urls}
                onChange={setUrls}
                options={urlOptions}
                fieldClassName="is-relative"
                error={urlsError}
                iconLeft={<span className="material-icons">language</span>}
                isMulti
                hasComponents
              >
                <FilterUploadList
                  fieldId="urls"
                  fieldLabel="Website Domain"
                  fieldFinder={(value: string) => isFQDN(value)}
									onLoad={(values: FilterItem[]) => {
										const newValues = values.map((_val) => ({ value: _val.val.trim(), label: _val.val.trim() }));
										let newFilterValues = urls || [];
										for (let i = 0; i < newValues.length; i++) {
											const index = newFilterValues.findIndex((_val) => _val.value === newValues[i].value);
											if (index === -1) {
												newFilterValues.push(newValues[i]);
											}
										}
										setUrlOptions(newValues);
										// setUrls(newFilterValues);
									}}
									onReset={(values: FilterItem[]) => {
										const newValues = values.map((_val) => ({ value: _val.val.trim(), label: _val.val.trim() }));
										let newFilterValues = urls || [];
										for (let i = 0; i < newValues.length; i++) {
											const index = newFilterValues.findIndex((_val) => _val.value === newValues[i].value);
											if (index !== -1) {
												newFilterValues.splice(index, 1);
											}
										}
										setUrlOptions([]);
										// setUrls(newFilterValues);
									}}
                />
              </FormSelectCreatable>
              <FormSelectSearchable
                name="industries"
                label="Company Industry"
                placeholder="Enter company industry"
                value={industries}
                // onChange={setIndustries}
                options={RampedUpIndustryOptions}
                isMulti={true}
                iconLeft={<span className="material-icons">factory</span>}
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setIndustries}
                removedValue={removedValue}
              />
              <FormSelectSearchable
                name="sicCodes"
                label="Company SIC"
                placeholder="Enter company SIC code"
                value={sicCodes}
                // onChange={setSicCodes}
                options={RampedUpSicCodes}
                isMulti={true}
                minChars={2}
                iconLeft={
                  <span className="material-icons">
                    integration_instructions
                  </span>
                }
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setSicCodes}
                removedValue={removedValue}
              />
              <FormSelectSearchable
                name="companyRevenues"
                label="Company Revenue"
                placeholder="Enter company annual revenue"
                value={companyRevenues}
                // onChange={setCompanyRevenues}
                options={RampedUpRevenueRangeOptions}
                isMulti={true}
                iconLeft={<span className="material-icons">attach_money</span>}
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setCompanyRevenues}
                removedValue={removedValue}
              />
              <FormSelectSearchable
                name="employeeSizes"
                label="Company Size"
                placeholder="Enter company employee count"
                value={employeeSizes}
                // onChange={setEmployeeSizes}
                options={RampedUpEmployeeSizeOptions}
                isMulti={true}
                iconLeft={<span className="material-icons">people_alt</span>}
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setEmployeeSizes}
                removedValue={removedValue}
              />
              {/*
              <FormSelectSearchable
                name="hqLocations"
                label="Country"
                placeholder="Enter country name"
                value={hqLocations}
                onChange={setHqLocations}
                options={RampedUpCountryOptions}
                isMulti={true}
                minChars={2}
                iconLeft={<span className="material-icons">public</span>}
              />*/}
              <FormSelectSearchable
                name="states"
                label="State"
                placeholder="Enter 2 letter state"
                value={states}
                // onChange={setStates}
                options={RampedUpStatesOptions}
                isMulti={true}
                iconLeft={
                  <span className="material-icons">
                    flag
                  </span>
                }
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setStates}
                removedValue={removedValue}
              />
              <FormSelectCreatable
                name="cities"
                label="City"
                placeholder="Enter city name"
                value={cities}
                onChange={setCities}
                options={[]}
                isMulti={true}
                minChars={3}
                iconLeft={<span className="material-icons">location_on </span>}
              />
              <FormSelectSearchable
                name="contactEducation"
                label="Schools"
                placeholder="Enter schools"
                value={schools}
                // onChange={setSchools}
                options={RampedUpSchools}
                isMulti={true}
                minChars={2}
                iconLeft={
                  <span className="material-icons">
                    school
                  </span>
                }
                setIncluded={setIncluded}
                setExcluded={setExcluded}
                callBack={setSchools}
                removedValue={removedValue}
              />
              <FormSelectCreatable
                name="name_first"
                label="First Name"
                placeholder="Enter first name"
                value={firstName}
                onChange={setFirstName}
                options={[]}
                isMulti={true}
                iconLeft={<span className="material-icons">person</span>}
              />
              <FormSelectCreatable
                name="name_last"
                label="Last Name"
                placeholder="Enter last name"
                value={lastName}
                onChange={setLastName}
                options={[]}
                isMulti={true}
                iconLeft={<span className="material-icons">person</span>}
              />
            </div>

            {/* <div className="panel-block is-block is-filter p-0">
              <Tabs
                options={FilterTab}
                onClick={setActiveTab}
                activeId={activeTab}
              />
              {activeTab === FilterTab.Suppress ? (
								<>
									<FormSelectCreatable
										name="urlsToSuppress"
										label="Urls to Suppress"
										placeholder="Enter urls to suppress"
										value={urlsToSuppress}
										onChange={setUrlsToSuppress}
										options={[]}
										isMulti={true}
										iconLeft={<span className="material-icons">query_stats</span>}
									/>
									<FormSelectSearchable
										name="titlesToSuppress"
										label="Titles to Suppress"
										placeholder="Enter titles to suppress"
										value={titlesToSuppress}
										onChange={setTitlesToSuppress}
										options={RampedUpTitlesToIgnoreOptions}
										isMulti={true}
										iconLeft={<span className="material-icons">query_stats</span>}
									/>
									<FormSelectCreatable
										name="emailsToSuppress"
										label="Emails to Suppress"
										placeholder="Enter email addresses to suppress"
										value={emailsToSuppress}
										onChange={setEmailsToSuppress}
										options={[]}
										isMulti={true}
										iconLeft={<span className="material-icons">query_stats</span>}
									/>
								</>
							) : null}
							{activeTab === FilterTab.AdditionalOptions ? (
								<>
									<FormCheckbox
										value={hasRequiredEmail}
										label="Work Email"
										isChecked={hasRequiredEmail}
										onChange={setHasRequiredEmail}
									/>
									<FormCheckbox
										value={hasPersonalEmailOnly}
										label="Personal Email"
										isChecked={hasPersonalEmailOnly}
										onChange={setHasPersonalEmailOnly}
									/>
									<FormCheckbox
										value={hasPhone}
										label="Phone Number"
										isChecked={hasPhone}
										onChange={setHasPhone}
									/>
									<FormCheckbox
										value={hasDirectDialOnly}
										label="Direct Dial"
										isChecked={hasDirectDialOnly}
										onChange={setHasDirectDialOnly}
									/>
									<FormCheckbox
										value={hasChangedJobRecently}
										label="Recent Job Change"
										isChecked={hasChangedJobRecently}
										onChange={setHasChangedJobRecently}
									/>
									
								</>
							) : null}
            </div> */}
          </Slot>
        </Card>
      </form>
      <SaveFilterForm
        isActive={isSaveModalActive}
        filter={filterData}
        onCreate={onSaveSubmit}
        onCancel={onSaveCancel}
        onUpdate={onSaveUpdate}
      />
    </>
  );
};

export default Filter;
