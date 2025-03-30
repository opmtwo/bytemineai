/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      name
      groupId
      tenants
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        groupId
        tenants
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listListsByGroupId = /* GraphQL */ `
  query ListListsByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListsByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        groupId
        tenants
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      userId
      groupId
      tenants
      isUnlocked
      createdAt
      updatedAt
      isEmailVerified
      contactEmailStatusCode
      contactEmailDomainType
      personalEmailStatusCode
      personalEmailDomainType
      contactPersonalEmailStatusCode
      contactPersonalEmailDomainType
      ruid
      contactFirstName
      contactMiddleName
      contactLastName
      companyName
      companyStartDate
      companyEndDate
      contactTitle
      contactTitleLevel
      contactJobFunctions
      contactEmail
      contactPersonalEmail
      historicalEmails
      directDialPhone
      directDialType
      contactCity
      contactState
      contactCountry
      contactContinent
      contactSkills
      contactLinkedinURL
      contactFacebook
      contactTwitterURL
      contactEducation
      contactBirthDate
      contactGender
      contactPhone
      contactOfficeCity
      contactOfficeAddress
      contactOfficeState
      contactOfficeCountry
      contactOfficeZipCode
      lastUpdatedDate
      contactLinkedinConnectionCount
      hasChangedJobRecently
      companyId
      companyLinkedinURL
      companyDomain
      companyAddressLine1
      companyAddressLine2
      companyCity
      companyRegion
      companyCountry
      companyZipCode
      companyPhone
      companyEmployees
      companyRevenueRange
      companySpecialties
      companyPrimaryIndustry
      companySIC
      companyType
      companyStatus
      companyFoundedYear
      companyLinkedinFollowers
      companyNAICSCode
      companySICCode6
      formerTitles
      formerCompanies
      contactFullName
      contactLocation
      personalEmail
      hasContactPhone
      hasPersonalEmail
      hasContactEmail
      hasDirectDial
      hasLocalAddress
      hasCompanyPhone
      owner
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        isUnlocked
        createdAt
        updatedAt
        isEmailVerified
        contactEmailStatusCode
        contactEmailDomainType
        personalEmailStatusCode
        personalEmailDomainType
        contactPersonalEmailStatusCode
        contactPersonalEmailDomainType
        ruid
        contactFirstName
        contactMiddleName
        contactLastName
        companyName
        companyStartDate
        companyEndDate
        contactTitle
        contactTitleLevel
        contactJobFunctions
        contactEmail
        contactPersonalEmail
        historicalEmails
        directDialPhone
        directDialType
        contactCity
        contactState
        contactCountry
        contactContinent
        contactSkills
        contactLinkedinURL
        contactFacebook
        contactTwitterURL
        contactEducation
        contactBirthDate
        contactGender
        contactPhone
        contactOfficeCity
        contactOfficeAddress
        contactOfficeState
        contactOfficeCountry
        contactOfficeZipCode
        lastUpdatedDate
        contactLinkedinConnectionCount
        hasChangedJobRecently
        companyId
        companyLinkedinURL
        companyDomain
        companyAddressLine1
        companyAddressLine2
        companyCity
        companyRegion
        companyCountry
        companyZipCode
        companyPhone
        companyEmployees
        companyRevenueRange
        companySpecialties
        companyPrimaryIndustry
        companySIC
        companyType
        companyStatus
        companyFoundedYear
        companyLinkedinFollowers
        companyNAICSCode
        companySICCode6
        formerTitles
        formerCompanies
        contactFullName
        contactLocation
        personalEmail
        hasContactPhone
        hasPersonalEmail
        hasContactEmail
        hasDirectDial
        hasLocalAddress
        hasCompanyPhone
        owner
      }
      nextToken
    }
  }
`;
export const listContactsByGroupId = /* GraphQL */ `
  query ListContactsByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactsByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        isUnlocked
        createdAt
        updatedAt
        isEmailVerified
        contactEmailStatusCode
        contactEmailDomainType
        personalEmailStatusCode
        personalEmailDomainType
        contactPersonalEmailStatusCode
        contactPersonalEmailDomainType
        ruid
        contactFirstName
        contactMiddleName
        contactLastName
        companyName
        companyStartDate
        companyEndDate
        contactTitle
        contactTitleLevel
        contactJobFunctions
        contactEmail
        contactPersonalEmail
        historicalEmails
        directDialPhone
        directDialType
        contactCity
        contactState
        contactCountry
        contactContinent
        contactSkills
        contactLinkedinURL
        contactFacebook
        contactTwitterURL
        contactEducation
        contactBirthDate
        contactGender
        contactPhone
        contactOfficeCity
        contactOfficeAddress
        contactOfficeState
        contactOfficeCountry
        contactOfficeZipCode
        lastUpdatedDate
        contactLinkedinConnectionCount
        hasChangedJobRecently
        companyId
        companyLinkedinURL
        companyDomain
        companyAddressLine1
        companyAddressLine2
        companyCity
        companyRegion
        companyCountry
        companyZipCode
        companyPhone
        companyEmployees
        companyRevenueRange
        companySpecialties
        companyPrimaryIndustry
        companySIC
        companyType
        companyStatus
        companyFoundedYear
        companyLinkedinFollowers
        companyNAICSCode
        companySICCode6
        formerTitles
        formerCompanies
        contactFullName
        contactLocation
        personalEmail
        hasContactPhone
        hasPersonalEmail
        hasContactEmail
        hasDirectDial
        hasLocalAddress
        hasCompanyPhone
        owner
      }
      nextToken
    }
  }
`;
export const listContactsByRuid = /* GraphQL */ `
  query ListContactsByRuid(
    $ruid: String
    $groupId: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactsByRuid(
      ruid: $ruid
      groupId: $groupId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        isUnlocked
        createdAt
        updatedAt
        isEmailVerified
        contactEmailStatusCode
        contactEmailDomainType
        personalEmailStatusCode
        personalEmailDomainType
        contactPersonalEmailStatusCode
        contactPersonalEmailDomainType
        ruid
        contactFirstName
        contactMiddleName
        contactLastName
        companyName
        companyStartDate
        companyEndDate
        contactTitle
        contactTitleLevel
        contactJobFunctions
        contactEmail
        contactPersonalEmail
        historicalEmails
        directDialPhone
        directDialType
        contactCity
        contactState
        contactCountry
        contactContinent
        contactSkills
        contactLinkedinURL
        contactFacebook
        contactTwitterURL
        contactEducation
        contactBirthDate
        contactGender
        contactPhone
        contactOfficeCity
        contactOfficeAddress
        contactOfficeState
        contactOfficeCountry
        contactOfficeZipCode
        lastUpdatedDate
        contactLinkedinConnectionCount
        hasChangedJobRecently
        companyId
        companyLinkedinURL
        companyDomain
        companyAddressLine1
        companyAddressLine2
        companyCity
        companyRegion
        companyCountry
        companyZipCode
        companyPhone
        companyEmployees
        companyRevenueRange
        companySpecialties
        companyPrimaryIndustry
        companySIC
        companyType
        companyStatus
        companyFoundedYear
        companyLinkedinFollowers
        companyNAICSCode
        companySICCode6
        formerTitles
        formerCompanies
        contactFullName
        contactLocation
        personalEmail
        hasContactPhone
        hasPersonalEmail
        hasContactEmail
        hasDirectDial
        hasLocalAddress
        hasCompanyPhone
        owner
      }
      nextToken
    }
  }
`;
export const getListContact = /* GraphQL */ `
  query GetListContact($id: ID!) {
    getListContact(id: $id) {
      id
      listId
      contactId
      userId
      groupId
      tenants
      createdAt
      updatedAt
      contact {
        id
        userId
        groupId
        tenants
        isUnlocked
        createdAt
        updatedAt
        isEmailVerified
        contactEmailStatusCode
        contactEmailDomainType
        personalEmailStatusCode
        personalEmailDomainType
        contactPersonalEmailStatusCode
        contactPersonalEmailDomainType
        ruid
        contactFirstName
        contactMiddleName
        contactLastName
        companyName
        companyStartDate
        companyEndDate
        contactTitle
        contactTitleLevel
        contactJobFunctions
        contactEmail
        contactPersonalEmail
        historicalEmails
        directDialPhone
        directDialType
        contactCity
        contactState
        contactCountry
        contactContinent
        contactSkills
        contactLinkedinURL
        contactFacebook
        contactTwitterURL
        contactEducation
        contactBirthDate
        contactGender
        contactPhone
        contactOfficeCity
        contactOfficeAddress
        contactOfficeState
        contactOfficeCountry
        contactOfficeZipCode
        lastUpdatedDate
        contactLinkedinConnectionCount
        hasChangedJobRecently
        companyId
        companyLinkedinURL
        companyDomain
        companyAddressLine1
        companyAddressLine2
        companyCity
        companyRegion
        companyCountry
        companyZipCode
        companyPhone
        companyEmployees
        companyRevenueRange
        companySpecialties
        companyPrimaryIndustry
        companySIC
        companyType
        companyStatus
        companyFoundedYear
        companyLinkedinFollowers
        companyNAICSCode
        companySICCode6
        formerTitles
        formerCompanies
        contactFullName
        contactLocation
        personalEmail
        hasContactPhone
        hasPersonalEmail
        hasContactEmail
        hasDirectDial
        hasLocalAddress
        hasCompanyPhone
        owner
      }
      owner
    }
  }
`;
export const listListContacts = /* GraphQL */ `
  query ListListContacts(
    $filter: ModelListContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        listId
        contactId
        userId
        groupId
        tenants
        createdAt
        updatedAt
        contact {
          id
          userId
          groupId
          tenants
          isUnlocked
          createdAt
          updatedAt
          isEmailVerified
          contactEmailStatusCode
          contactEmailDomainType
          personalEmailStatusCode
          personalEmailDomainType
          contactPersonalEmailStatusCode
          contactPersonalEmailDomainType
          ruid
          contactFirstName
          contactMiddleName
          contactLastName
          companyName
          companyStartDate
          companyEndDate
          contactTitle
          contactTitleLevel
          contactJobFunctions
          contactEmail
          contactPersonalEmail
          historicalEmails
          directDialPhone
          directDialType
          contactCity
          contactState
          contactCountry
          contactContinent
          contactSkills
          contactLinkedinURL
          contactFacebook
          contactTwitterURL
          contactEducation
          contactBirthDate
          contactGender
          contactPhone
          contactOfficeCity
          contactOfficeAddress
          contactOfficeState
          contactOfficeCountry
          contactOfficeZipCode
          lastUpdatedDate
          contactLinkedinConnectionCount
          hasChangedJobRecently
          companyId
          companyLinkedinURL
          companyDomain
          companyAddressLine1
          companyAddressLine2
          companyCity
          companyRegion
          companyCountry
          companyZipCode
          companyPhone
          companyEmployees
          companyRevenueRange
          companySpecialties
          companyPrimaryIndustry
          companySIC
          companyType
          companyStatus
          companyFoundedYear
          companyLinkedinFollowers
          companyNAICSCode
          companySICCode6
          formerTitles
          formerCompanies
          contactFullName
          contactLocation
          personalEmail
          hasContactPhone
          hasPersonalEmail
          hasContactEmail
          hasDirectDial
          hasLocalAddress
          hasCompanyPhone
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const listListContactsByListId = /* GraphQL */ `
  query ListListContactsByListId(
    $listId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelListContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListContactsByListId(
      listId: $listId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        listId
        contactId
        userId
        groupId
        tenants
        createdAt
        updatedAt
        contact {
          id
          userId
          groupId
          tenants
          isUnlocked
          createdAt
          updatedAt
          isEmailVerified
          contactEmailStatusCode
          contactEmailDomainType
          personalEmailStatusCode
          personalEmailDomainType
          contactPersonalEmailStatusCode
          contactPersonalEmailDomainType
          ruid
          contactFirstName
          contactMiddleName
          contactLastName
          companyName
          companyStartDate
          companyEndDate
          contactTitle
          contactTitleLevel
          contactJobFunctions
          contactEmail
          contactPersonalEmail
          historicalEmails
          directDialPhone
          directDialType
          contactCity
          contactState
          contactCountry
          contactContinent
          contactSkills
          contactLinkedinURL
          contactFacebook
          contactTwitterURL
          contactEducation
          contactBirthDate
          contactGender
          contactPhone
          contactOfficeCity
          contactOfficeAddress
          contactOfficeState
          contactOfficeCountry
          contactOfficeZipCode
          lastUpdatedDate
          contactLinkedinConnectionCount
          hasChangedJobRecently
          companyId
          companyLinkedinURL
          companyDomain
          companyAddressLine1
          companyAddressLine2
          companyCity
          companyRegion
          companyCountry
          companyZipCode
          companyPhone
          companyEmployees
          companyRevenueRange
          companySpecialties
          companyPrimaryIndustry
          companySIC
          companyType
          companyStatus
          companyFoundedYear
          companyLinkedinFollowers
          companyNAICSCode
          companySICCode6
          formerTitles
          formerCompanies
          contactFullName
          contactLocation
          personalEmail
          hasContactPhone
          hasPersonalEmail
          hasContactEmail
          hasDirectDial
          hasLocalAddress
          hasCompanyPhone
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const getContactForm = /* GraphQL */ `
  query GetContactForm($id: ID!) {
    getContactForm(id: $id) {
      id
      tenants
      firstName
      lastName
      message
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listContactForms = /* GraphQL */ `
  query ListContactForms(
    $filter: ModelContactFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenants
        firstName
        lastName
        message
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDomainSearch = /* GraphQL */ `
  query GetDomainSearch($id: ID!) {
    getDomainSearch(id: $id) {
      id
      tenants
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDomainSearchs = /* GraphQL */ `
  query ListDomainSearchs(
    $filter: ModelDomainSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDomainSearchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenants
        term
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFilter = /* GraphQL */ `
  query GetFilter($id: ID!) {
    getFilter(id: $id) {
      id
      userId
      groupId
      tenants
      name
      savedFilter
      rampedUpFilter
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFilters = /* GraphQL */ `
  query ListFilters(
    $filter: ModelFilterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        name
        savedFilter
        rampedUpFilter
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listFiltersByUserId = /* GraphQL */ `
  query ListFiltersByUserId(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFilterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiltersByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        name
        savedFilter
        rampedUpFilter
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listFiltersByGroupId = /* GraphQL */ `
  query ListFiltersByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFilterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiltersByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        name
        savedFilter
        rampedUpFilter
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUsage = /* GraphQL */ `
  query GetUsage($id: ID!) {
    getUsage(id: $id) {
      id
      userId
      groupId
      tenants
      filterId
      credits
      createdAt
      updatedAt
    }
  }
`;
export const listUsages = /* GraphQL */ `
  query ListUsages(
    $filter: ModelUsageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        filterId
        credits
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listUsageByUserId = /* GraphQL */ `
  query ListUsageByUserId(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUsageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsageByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        filterId
        credits
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listUsageByGroupId = /* GraphQL */ `
  query ListUsageByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUsageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsageByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        filterId
        credits
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmailAccount = /* GraphQL */ `
  query GetEmailAccount($id: ID!) {
    getEmailAccount(id: $id) {
      id
      userId
      groupId
      tenants
      email
      code
      token
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEmailAccounts = /* GraphQL */ `
  query ListEmailAccounts(
    $filter: ModelEmailAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        email
        code
        token
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listEmailAccountsByUserId = /* GraphQL */ `
  query ListEmailAccountsByUserId(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmailAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailAccountsByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        email
        code
        token
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listEmailAccountsByGroupId = /* GraphQL */ `
  query ListEmailAccountsByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmailAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailAccountsByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        email
        code
        token
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getAuditLog = /* GraphQL */ `
  query GetAuditLog($id: ID!) {
    getAuditLog(id: $id) {
      id
      userId
      groupId
      tenants
      title
      description
      data
      createdAt
      updatedAt
    }
  }
`;
export const listAuditLogs = /* GraphQL */ `
  query ListAuditLogs(
    $filter: ModelAuditLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuditLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        title
        description
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listAuditLogsByUserId = /* GraphQL */ `
  query ListAuditLogsByUserId(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAuditLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuditLogsByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        title
        description
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listAuditLogsByGroupId = /* GraphQL */ `
  query ListAuditLogsByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAuditLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuditLogsByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        title
        description
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEnrichSearch = /* GraphQL */ `
  query GetEnrichSearch($id: ID!) {
    getEnrichSearch(id: $id) {
      id
      tenants
      type
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEnrichSearchs = /* GraphQL */ `
  query ListEnrichSearchs(
    $filter: ModelEnrichSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichSearchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenants
        type
        term
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listEnrichSearchByType = /* GraphQL */ `
  query ListEnrichSearchByType(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnrichSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichSearchByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenants
        type
        term
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNymblrSubscription = /* GraphQL */ `
  query GetNymblrSubscription($id: ID!) {
    getNymblrSubscription(id: $id) {
      id
      userId
      groupId
      tenants
      groupName
      subscriptionStatus
      subscriptionPeriod
      monthlyCredits
      quarterlyCredits
      annualCredits
      currentCredits
      stripeCustomerId
      stripeSubscriptionID
      seats
      block
      tenant
      notes
      color_code
      icon_s3_key
      logo_s3_key
      block_api
      block_email
      block_prospect
      block_enrich
      block_files
      block_auto_compose
      block_assistants
      block_sub_processing
      firstPaid
      lastPaid
      nextPay
      createdAt
      updatedAt
      appsumo_uuid
      appsumo_current_plan_id
      appsumo_current_activation_email
      appsumo_current_invoice_item_uuid
      appsumo_current_datetime
      appsumo_previous_plan_id
      appsumo_previous_activation_email
      appsumo_previous_invoice_item_uuid
      appsumo_previous_datetime
      oldCurrentCredits
      owner
    }
  }
`;
export const listNymblrSubscriptions = /* GraphQL */ `
  query ListNymblrSubscriptions(
    $filter: ModelNymblrSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNymblrSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        groupName
        subscriptionStatus
        subscriptionPeriod
        monthlyCredits
        quarterlyCredits
        annualCredits
        currentCredits
        stripeCustomerId
        stripeSubscriptionID
        seats
        block
        tenant
        notes
        color_code
        icon_s3_key
        logo_s3_key
        block_api
        block_email
        block_prospect
        block_enrich
        block_files
        block_auto_compose
        block_assistants
        block_sub_processing
        firstPaid
        lastPaid
        nextPay
        createdAt
        updatedAt
        appsumo_uuid
        appsumo_current_plan_id
        appsumo_current_activation_email
        appsumo_current_invoice_item_uuid
        appsumo_current_datetime
        appsumo_previous_plan_id
        appsumo_previous_activation_email
        appsumo_previous_invoice_item_uuid
        appsumo_previous_datetime
        oldCurrentCredits
        owner
      }
      nextToken
    }
  }
`;
export const listNymblrSubscriptionsById = /* GraphQL */ `
  query ListNymblrSubscriptionsById(
    $id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelNymblrSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNymblrSubscriptionsById(
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        groupName
        subscriptionStatus
        subscriptionPeriod
        monthlyCredits
        quarterlyCredits
        annualCredits
        currentCredits
        stripeCustomerId
        stripeSubscriptionID
        seats
        block
        tenant
        notes
        color_code
        icon_s3_key
        logo_s3_key
        block_api
        block_email
        block_prospect
        block_enrich
        block_files
        block_auto_compose
        block_assistants
        block_sub_processing
        firstPaid
        lastPaid
        nextPay
        createdAt
        updatedAt
        appsumo_uuid
        appsumo_current_plan_id
        appsumo_current_activation_email
        appsumo_current_invoice_item_uuid
        appsumo_current_datetime
        appsumo_previous_plan_id
        appsumo_previous_activation_email
        appsumo_previous_invoice_item_uuid
        appsumo_previous_datetime
        oldCurrentCredits
        owner
      }
      nextToken
    }
  }
`;
export const listNymblrSubscriptionsByAppSumoUUID = /* GraphQL */ `
  query ListNymblrSubscriptionsByAppSumoUUID(
    $appsumo_uuid: String
    $sortDirection: ModelSortDirection
    $filter: ModelNymblrSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNymblrSubscriptionsByAppSumoUUID(
      appsumo_uuid: $appsumo_uuid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        groupName
        subscriptionStatus
        subscriptionPeriod
        monthlyCredits
        quarterlyCredits
        annualCredits
        currentCredits
        stripeCustomerId
        stripeSubscriptionID
        seats
        block
        tenant
        notes
        color_code
        icon_s3_key
        logo_s3_key
        block_api
        block_email
        block_prospect
        block_enrich
        block_files
        block_auto_compose
        block_assistants
        block_sub_processing
        firstPaid
        lastPaid
        nextPay
        createdAt
        updatedAt
        appsumo_uuid
        appsumo_current_plan_id
        appsumo_current_activation_email
        appsumo_current_invoice_item_uuid
        appsumo_current_datetime
        appsumo_previous_plan_id
        appsumo_previous_activation_email
        appsumo_previous_invoice_item_uuid
        appsumo_previous_datetime
        oldCurrentCredits
        owner
      }
      nextToken
    }
  }
`;
export const listNymblrSubscriptionsByGroupId = /* GraphQL */ `
  query ListNymblrSubscriptionsByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNymblrSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNymblrSubscriptionsByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        groupName
        subscriptionStatus
        subscriptionPeriod
        monthlyCredits
        quarterlyCredits
        annualCredits
        currentCredits
        stripeCustomerId
        stripeSubscriptionID
        seats
        block
        tenant
        notes
        color_code
        icon_s3_key
        logo_s3_key
        block_api
        block_email
        block_prospect
        block_enrich
        block_files
        block_auto_compose
        block_assistants
        block_sub_processing
        firstPaid
        lastPaid
        nextPay
        createdAt
        updatedAt
        appsumo_uuid
        appsumo_current_plan_id
        appsumo_current_activation_email
        appsumo_current_invoice_item_uuid
        appsumo_current_datetime
        appsumo_previous_plan_id
        appsumo_previous_activation_email
        appsumo_previous_invoice_item_uuid
        appsumo_previous_datetime
        oldCurrentCredits
        owner
      }
      nextToken
    }
  }
`;
export const listNymblrSubscriptionsByUserId = /* GraphQL */ `
  query ListNymblrSubscriptionsByUserId(
    $userId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNymblrSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNymblrSubscriptionsByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        groupName
        subscriptionStatus
        subscriptionPeriod
        monthlyCredits
        quarterlyCredits
        annualCredits
        currentCredits
        stripeCustomerId
        stripeSubscriptionID
        seats
        block
        tenant
        notes
        color_code
        icon_s3_key
        logo_s3_key
        block_api
        block_email
        block_prospect
        block_enrich
        block_files
        block_auto_compose
        block_assistants
        block_sub_processing
        firstPaid
        lastPaid
        nextPay
        createdAt
        updatedAt
        appsumo_uuid
        appsumo_current_plan_id
        appsumo_current_activation_email
        appsumo_current_invoice_item_uuid
        appsumo_current_datetime
        appsumo_previous_plan_id
        appsumo_previous_activation_email
        appsumo_previous_invoice_item_uuid
        appsumo_previous_datetime
        oldCurrentCredits
        owner
      }
      nextToken
    }
  }
`;
export const listNymblrSubscriptionsByStripeCustomerId = /* GraphQL */ `
  query ListNymblrSubscriptionsByStripeCustomerId(
    $stripeCustomerId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNymblrSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNymblrSubscriptionsByStripeCustomerId(
      stripeCustomerId: $stripeCustomerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        groupName
        subscriptionStatus
        subscriptionPeriod
        monthlyCredits
        quarterlyCredits
        annualCredits
        currentCredits
        stripeCustomerId
        stripeSubscriptionID
        seats
        block
        tenant
        notes
        color_code
        icon_s3_key
        logo_s3_key
        block_api
        block_email
        block_prospect
        block_enrich
        block_files
        block_auto_compose
        block_assistants
        block_sub_processing
        firstPaid
        lastPaid
        nextPay
        createdAt
        updatedAt
        appsumo_uuid
        appsumo_current_plan_id
        appsumo_current_activation_email
        appsumo_current_invoice_item_uuid
        appsumo_current_datetime
        appsumo_previous_plan_id
        appsumo_previous_activation_email
        appsumo_previous_invoice_item_uuid
        appsumo_previous_datetime
        oldCurrentCredits
        owner
      }
      nextToken
    }
  }
`;
export const getAudience = /* GraphQL */ `
  query GetAudience($id: ID!) {
    getAudience(id: $id) {
      id
      userId
      groupId
      tenants
      name
      rampedUpFilter
      expectedCount
      currentCount
      currentStatus
      filePath
      downloads
      esFilter
      workerId
      workerJobId
      workerLastPing
      startedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAudiences = /* GraphQL */ `
  query ListAudiences(
    $filter: ModelAudienceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        name
        rampedUpFilter
        expectedCount
        currentCount
        currentStatus
        filePath
        downloads
        esFilter
        workerId
        workerJobId
        workerLastPing
        startedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listAudiencesByUserId = /* GraphQL */ `
  query ListAudiencesByUserId(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAudienceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudiencesByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        name
        rampedUpFilter
        expectedCount
        currentCount
        currentStatus
        filePath
        downloads
        esFilter
        workerId
        workerJobId
        workerLastPing
        startedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listAudiencesByGroupId = /* GraphQL */ `
  query ListAudiencesByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAudienceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudiencesByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        name
        rampedUpFilter
        expectedCount
        currentCount
        currentStatus
        filePath
        downloads
        esFilter
        workerId
        workerJobId
        workerLastPing
        startedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEnrichment = /* GraphQL */ `
  query GetEnrichment($id: ID!) {
    getEnrichment(id: $id) {
      id
      userId
      groupId
      tenants
      s3Key
      s3KeyOutput
      name
      size
      recordsUploaded
      recordsEnriched
      recordsProcessed
      isCompleted
      keyEmail
      keyPhone
      keyLinkedin
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEnrichments = /* GraphQL */ `
  query ListEnrichments(
    $filter: ModelEnrichmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        s3Key
        s3KeyOutput
        name
        size
        recordsUploaded
        recordsEnriched
        recordsProcessed
        isCompleted
        keyEmail
        keyPhone
        keyLinkedin
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listEnrichmentsByUserId = /* GraphQL */ `
  query ListEnrichmentsByUserId(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnrichmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichmentsByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        s3Key
        s3KeyOutput
        name
        size
        recordsUploaded
        recordsEnriched
        recordsProcessed
        isCompleted
        keyEmail
        keyPhone
        keyLinkedin
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listEnrichmentsByGroupId = /* GraphQL */ `
  query ListEnrichmentsByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnrichmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichmentsByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        s3Key
        s3KeyOutput
        name
        size
        recordsUploaded
        recordsEnriched
        recordsProcessed
        isCompleted
        keyEmail
        keyPhone
        keyLinkedin
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFilterItem = /* GraphQL */ `
  query GetFilterItem($id: ID!) {
    getFilterItem(id: $id) {
      id
      filterId
      userId
      groupId
      tenants
      filename
      key
      val
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFilterItems = /* GraphQL */ `
  query ListFilterItems(
    $filter: ModelFilterItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        filterId
        userId
        groupId
        tenants
        filename
        key
        val
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listFilterItemsByFilterId = /* GraphQL */ `
  query ListFilterItemsByFilterId(
    $filterId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFilterItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterItemsByFilterId(
      filterId: $filterId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        filterId
        userId
        groupId
        tenants
        filename
        key
        val
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      id
      userId
      groupId
      tenants
      name
      rampedUpFilter
      expectedCount
      currentCount
      currentStatus
      esFilter
      startedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCampaigns = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        groupId
        tenants
        name
        rampedUpFilter
        expectedCount
        currentCount
        currentStatus
        esFilter
        startedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listCampaignsByUserId = /* GraphQL */ `
  query ListCampaignsByUserId(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaignsByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        name
        rampedUpFilter
        expectedCount
        currentCount
        currentStatus
        esFilter
        startedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listCampaignsByGroupId = /* GraphQL */ `
  query ListCampaignsByGroupId(
    $groupId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaignsByGroupId(
      groupId: $groupId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        groupId
        tenants
        name
        rampedUpFilter
        expectedCount
        currentCount
        currentStatus
        esFilter
        startedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
