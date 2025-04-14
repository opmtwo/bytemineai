/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBytemineCollection = /* GraphQL */ `
  query GetBytemineCollection($id: ID!) {
    getBytemineCollection(id: $id) {
      id
      owner
      createdAt
      updatedAt
      name
      __typename
    }
  }
`;
export const listBytemineCollections = /* GraphQL */ `
  query ListBytemineCollections(
    $filter: ModelBytemineCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineCollections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        name
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineUser = /* GraphQL */ `
  query GetBytemineUser($id: ID!) {
    getBytemineUser(id: $id) {
      id
      owner
      createdAt
      updatedAt
      name
      __typename
    }
  }
`;
export const listBytemineUsers = /* GraphQL */ `
  query ListBytemineUsers(
    $filter: ModelBytemineUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        createdAt
        updatedAt
        name
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineContact = /* GraphQL */ `
  query GetBytemineContact($id: ID!) {
    getBytemineContact(id: $id) {
      id
      owner
      createdAt
      updatedAt
      isEmailVerified
      contactEmailStatusCode
      contactEmailDomainType
      personalEmailStatusCode
      personalEmailDomainType
      contactPersonalEmailStatusCode
      contactPersonalEmailDomainType
      first_name
      last_name
      middle_name
      full_name
      job_title
      seniority
      department
      primary_role
      secondary_role
      linkedin_profile
      linkedin_connection_count
      work_email
      work_email_history
      personal_email
      personal_email2
      personal_email_history
      direct_dial
      mobile_number
      mobile_number_history
      work_number
      education
      skills
      interests
      linkedin_headline
      facebook_profile
      twitter_profile
      work_experience
      salary
      birth_year
      age
      gender
      new_hire
      job_start_date
      company_name
      company_domain
      company_website
      company_linkedin_profile
      company_linkedin_followers
      company_local_address
      company_local_city
      company_local_state
      company_local_address_postal
      company_hq_address
      company_hq_city
      company_hq_state
      company_hq_postal
      person_city
      person_state
      person_postal
      company_employee_range
      company_revenue_range
      company_industry
      company_sic4
      company_sic4_description
      company_naics
      company_naics_description
      company_type
      __typename
    }
  }
`;
export const listBytemineContacts = /* GraphQL */ `
  query ListBytemineContacts(
    $filter: ModelBytemineContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineContacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        isEmailVerified
        contactEmailStatusCode
        contactEmailDomainType
        personalEmailStatusCode
        personalEmailDomainType
        contactPersonalEmailStatusCode
        contactPersonalEmailDomainType
        first_name
        last_name
        middle_name
        full_name
        job_title
        seniority
        department
        primary_role
        secondary_role
        linkedin_profile
        linkedin_connection_count
        work_email
        work_email_history
        personal_email
        personal_email2
        personal_email_history
        direct_dial
        mobile_number
        mobile_number_history
        work_number
        education
        skills
        interests
        linkedin_headline
        facebook_profile
        twitter_profile
        work_experience
        salary
        birth_year
        age
        gender
        new_hire
        job_start_date
        company_name
        company_domain
        company_website
        company_linkedin_profile
        company_linkedin_followers
        company_local_address
        company_local_city
        company_local_state
        company_local_address_postal
        company_hq_address
        company_hq_city
        company_hq_state
        company_hq_postal
        person_city
        person_state
        person_postal
        company_employee_range
        company_revenue_range
        company_industry
        company_sic4
        company_sic4_description
        company_naics
        company_naics_description
        company_type
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineCollectionContact = /* GraphQL */ `
  query GetBytemineCollectionContact($id: ID!) {
    getBytemineCollectionContact(id: $id) {
      id
      owner
      createdAt
      updatedAt
      contactId
      contact {
        id
        owner
        createdAt
        updatedAt
        isEmailVerified
        contactEmailStatusCode
        contactEmailDomainType
        personalEmailStatusCode
        personalEmailDomainType
        contactPersonalEmailStatusCode
        contactPersonalEmailDomainType
        first_name
        last_name
        middle_name
        full_name
        job_title
        seniority
        department
        primary_role
        secondary_role
        linkedin_profile
        linkedin_connection_count
        work_email
        work_email_history
        personal_email
        personal_email2
        personal_email_history
        direct_dial
        mobile_number
        mobile_number_history
        work_number
        education
        skills
        interests
        linkedin_headline
        facebook_profile
        twitter_profile
        work_experience
        salary
        birth_year
        age
        gender
        new_hire
        job_start_date
        company_name
        company_domain
        company_website
        company_linkedin_profile
        company_linkedin_followers
        company_local_address
        company_local_city
        company_local_state
        company_local_address_postal
        company_hq_address
        company_hq_city
        company_hq_state
        company_hq_postal
        person_city
        person_state
        person_postal
        company_employee_range
        company_revenue_range
        company_industry
        company_sic4
        company_sic4_description
        company_naics
        company_naics_description
        company_type
        __typename
      }
      name
      __typename
    }
  }
`;
export const listBytemineCollectionContacts = /* GraphQL */ `
  query ListBytemineCollectionContacts(
    $filter: ModelBytemineCollectionContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineCollectionContacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        contactId
        name
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineContactForm = /* GraphQL */ `
  query GetBytemineContactForm($id: ID!) {
    getBytemineContactForm(id: $id) {
      id
      owner
      createdAt
      updatedAt
      contactId
      contact {
        id
        owner
        createdAt
        updatedAt
        isEmailVerified
        contactEmailStatusCode
        contactEmailDomainType
        personalEmailStatusCode
        personalEmailDomainType
        contactPersonalEmailStatusCode
        contactPersonalEmailDomainType
        first_name
        last_name
        middle_name
        full_name
        job_title
        seniority
        department
        primary_role
        secondary_role
        linkedin_profile
        linkedin_connection_count
        work_email
        work_email_history
        personal_email
        personal_email2
        personal_email_history
        direct_dial
        mobile_number
        mobile_number_history
        work_number
        education
        skills
        interests
        linkedin_headline
        facebook_profile
        twitter_profile
        work_experience
        salary
        birth_year
        age
        gender
        new_hire
        job_start_date
        company_name
        company_domain
        company_website
        company_linkedin_profile
        company_linkedin_followers
        company_local_address
        company_local_city
        company_local_state
        company_local_address_postal
        company_hq_address
        company_hq_city
        company_hq_state
        company_hq_postal
        person_city
        person_state
        person_postal
        company_employee_range
        company_revenue_range
        company_industry
        company_sic4
        company_sic4_description
        company_naics
        company_naics_description
        company_type
        __typename
      }
      firstName
      lastName
      message
      __typename
    }
  }
`;
export const listBytemineContactForms = /* GraphQL */ `
  query ListBytemineContactForms(
    $filter: ModelBytemineContactFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineContactForms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        contactId
        firstName
        lastName
        message
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineDomainSearch = /* GraphQL */ `
  query GetBytemineDomainSearch($id: ID!) {
    getBytemineDomainSearch(id: $id) {
      id
      owner
      createdAt
      updatedAt
      term
      __typename
    }
  }
`;
export const listBytemineDomainSearches = /* GraphQL */ `
  query ListBytemineDomainSearches(
    $filter: ModelBytemineDomainSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineDomainSearches(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        term
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineFilter = /* GraphQL */ `
  query GetBytemineFilter($id: ID!) {
    getBytemineFilter(id: $id) {
      id
      owner
      createdAt
      updatedAt
      name
      filter
      isSaved
      __typename
    }
  }
`;
export const listBytemineFilters = /* GraphQL */ `
  query ListBytemineFilters(
    $filter: ModelBytemineFilterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineFilters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        createdAt
        updatedAt
        name
        filter
        isSaved
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineEmailAccount = /* GraphQL */ `
  query GetBytemineEmailAccount($id: ID!) {
    getBytemineEmailAccount(id: $id) {
      id
      owner
      createdAt
      updatedAt
      email
      code
      token
      __typename
    }
  }
`;
export const listBytemineEmailAccounts = /* GraphQL */ `
  query ListBytemineEmailAccounts(
    $filter: ModelBytemineEmailAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineEmailAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        email
        code
        token
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineEnrichment = /* GraphQL */ `
  query GetBytemineEnrichment($id: ID!) {
    getBytemineEnrichment(id: $id) {
      id
      owner
      createdAt
      updatedAt
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
      __typename
    }
  }
`;
export const listBytemineEnrichments = /* GraphQL */ `
  query ListBytemineEnrichments(
    $filter: ModelBytemineEnrichmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineEnrichments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineEnrichSearch = /* GraphQL */ `
  query GetBytemineEnrichSearch($id: ID!) {
    getBytemineEnrichSearch(id: $id) {
      id
      owner
      createdAt
      updatedAt
      type
      term
      __typename
    }
  }
`;
export const listBytemineEnrichSearches = /* GraphQL */ `
  query ListBytemineEnrichSearches(
    $filter: ModelBytemineEnrichSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineEnrichSearches(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        type
        term
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineFilterItem = /* GraphQL */ `
  query GetBytemineFilterItem($id: ID!) {
    getBytemineFilterItem(id: $id) {
      id
      owner
      createdAt
      updatedAt
      filterId
      filename
      key
      val
      __typename
    }
  }
`;
export const listBytemineFilterItems = /* GraphQL */ `
  query ListBytemineFilterItems(
    $filter: ModelBytemineFilterItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineFilterItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        filterId
        filename
        key
        val
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineAuditLog = /* GraphQL */ `
  query GetBytemineAuditLog($id: ID!) {
    getBytemineAuditLog(id: $id) {
      id
      owner
      createdAt
      updatedAt
      title
      description
      data
      __typename
    }
  }
`;
export const listBytemineAuditLogs = /* GraphQL */ `
  query ListBytemineAuditLogs(
    $filter: ModelBytemineAuditLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineAuditLogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        title
        description
        data
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineSub = /* GraphQL */ `
  query GetBytemineSub($id: ID!) {
    getBytemineSub(id: $id) {
      id
      owner
      createdAt
      updatedAt
      subscriptionStatus
      subscriptionPeriod
      monthlyCredits
      quarterlyCredits
      annualCredits
      currentCredits
      seats
      block
      tenant
      notes
      color_code
      icon_s3_key
      logo_s3_key
      isApiBlocked
      isEmailBlocked
      isProspectBlocked
      isEnrichBlocked
      isFilesBlocked
      isAutoComposeBlocked
      isAssistantsBlocked
      isSubProcessingBlocked
      firstPaid
      lastPaid
      nextPay
      __typename
    }
  }
`;
export const listBytemineSubs = /* GraphQL */ `
  query ListBytemineSubs(
    $filter: ModelBytemineSubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineSubs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        createdAt
        updatedAt
        subscriptionStatus
        subscriptionPeriod
        monthlyCredits
        quarterlyCredits
        annualCredits
        currentCredits
        seats
        block
        tenant
        notes
        color_code
        icon_s3_key
        logo_s3_key
        isApiBlocked
        isEmailBlocked
        isProspectBlocked
        isEnrichBlocked
        isFilesBlocked
        isAutoComposeBlocked
        isAssistantsBlocked
        isSubProcessingBlocked
        firstPaid
        lastPaid
        nextPay
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineSubLog = /* GraphQL */ `
  query GetBytemineSubLog($id: ID!) {
    getBytemineSubLog(id: $id) {
      id
      owner
      createdAt
      updatedAt
      subId
      subOld
      subNew
      subject
      description
      oldCurrentCredits
      newCurrentCredits
      oldRolloverCredits
      newRolloverCredits
      __typename
    }
  }
`;
export const listBytemineSubLogs = /* GraphQL */ `
  query ListBytemineSubLogs(
    $filter: ModelBytemineSubLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineSubLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        createdAt
        updatedAt
        subId
        subOld
        subNew
        subject
        description
        oldCurrentCredits
        newCurrentCredits
        oldRolloverCredits
        newRolloverCredits
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBytemineUsage = /* GraphQL */ `
  query GetBytemineUsage($id: ID!) {
    getBytemineUsage(id: $id) {
      id
      owner
      createdAt
      updatedAt
      filterId
      credits
      __typename
    }
  }
`;
export const listBytemineUsages = /* GraphQL */ `
  query ListBytemineUsages(
    $filter: ModelBytemineUsageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBytemineUsages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        createdAt
        updatedAt
        filterId
        credits
        __typename
      }
      nextToken
      __typename
    }
  }
`;
