/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      name
      __typename
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
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
export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      owner
      teamId
      userId
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
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
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
export const getCollectionContact = /* GraphQL */ `
  query GetCollectionContact($id: ID!) {
    getCollectionContact(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      contactId
      contact {
        id
        owner
        teamId
        userId
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
export const listCollectionContacts = /* GraphQL */ `
  query ListCollectionContacts(
    $filter: ModelCollectionContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionContacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
        contactId
        contact {
          id
          owner
          teamId
          userId
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
      nextToken
      __typename
    }
  }
`;
export const getContactForm = /* GraphQL */ `
  query GetContactForm($id: ID!) {
    getContactForm(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      contactId
      contact {
        id
        owner
        teamId
        userId
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
export const listContactForms = /* GraphQL */ `
  query ListContactForms(
    $filter: ModelContactFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
        contactId
        contact {
          id
          owner
          teamId
          userId
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
      nextToken
      __typename
    }
  }
`;
export const getDomainSearch = /* GraphQL */ `
  query GetDomainSearch($id: ID!) {
    getDomainSearch(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      term
      __typename
    }
  }
`;
export const listDomainSearches = /* GraphQL */ `
  query ListDomainSearches(
    $filter: ModelDomainSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDomainSearches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
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
export const getFilter = /* GraphQL */ `
  query GetFilter($id: ID!) {
    getFilter(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      name
      filter
      isSaved
      __typename
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
        owner
        teamId
        userId
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
export const getEmailAccount = /* GraphQL */ `
  query GetEmailAccount($id: ID!) {
    getEmailAccount(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      email
      code
      token
      __typename
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
        owner
        teamId
        userId
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
export const getEnrichment = /* GraphQL */ `
  query GetEnrichment($id: ID!) {
    getEnrichment(id: $id) {
      id
      owner
      teamId
      userId
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
export const listEnrichments = /* GraphQL */ `
  query ListEnrichments(
    $filter: ModelEnrichmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
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
export const getEnrichSearch = /* GraphQL */ `
  query GetEnrichSearch($id: ID!) {
    getEnrichSearch(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      type
      term
      __typename
    }
  }
`;
export const listEnrichSearches = /* GraphQL */ `
  query ListEnrichSearches(
    $filter: ModelEnrichSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichSearches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
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
export const getFilterItem = /* GraphQL */ `
  query GetFilterItem($id: ID!) {
    getFilterItem(id: $id) {
      id
      owner
      teamId
      userId
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
export const listFilterItems = /* GraphQL */ `
  query ListFilterItems(
    $filter: ModelFilterItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
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
export const getAuditLog = /* GraphQL */ `
  query GetAuditLog($id: ID!) {
    getAuditLog(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      title
      description
      data
      __typename
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
        owner
        teamId
        userId
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
export const getSub = /* GraphQL */ `
  query GetSub($id: ID!) {
    getSub(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
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
export const listSubs = /* GraphQL */ `
  query ListSubs(
    $filter: ModelSubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
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
export const getSubLog = /* GraphQL */ `
  query GetSubLog($id: ID!) {
    getSubLog(id: $id) {
      id
      owner
      teamId
      userId
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
export const listSubLogs = /* GraphQL */ `
  query ListSubLogs(
    $filter: ModelSubLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        teamId
        userId
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
export const getUsage = /* GraphQL */ `
  query GetUsage($id: ID!) {
    getUsage(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      filterId
      credits
      __typename
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
        owner
        teamId
        userId
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
export const listCollectionByTeamId = /* GraphQL */ `
  query ListCollectionByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listCollectionByUserId = /* GraphQL */ `
  query ListCollectionByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listContactByTeamId = /* GraphQL */ `
  query ListContactByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listContactByUserId = /* GraphQL */ `
  query ListContactByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listCollectionContactByTeamId = /* GraphQL */ `
  query ListCollectionContactByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionContactByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
        contactId
        contact {
          id
          owner
          teamId
          userId
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
      nextToken
      __typename
    }
  }
`;
export const listCollectionContactByUserId = /* GraphQL */ `
  query ListCollectionContactByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionContactByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
        contactId
        contact {
          id
          owner
          teamId
          userId
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
      nextToken
      __typename
    }
  }
`;
export const listContactFormByTeamId = /* GraphQL */ `
  query ListContactFormByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactFormByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
        contactId
        contact {
          id
          owner
          teamId
          userId
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
      nextToken
      __typename
    }
  }
`;
export const listContactFormByUserId = /* GraphQL */ `
  query ListContactFormByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactFormByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
        contactId
        contact {
          id
          owner
          teamId
          userId
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
      nextToken
      __typename
    }
  }
`;
export const listDomainSearchByTeamId = /* GraphQL */ `
  query ListDomainSearchByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDomainSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDomainSearchByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listDomainSearchByUserId = /* GraphQL */ `
  query ListDomainSearchByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDomainSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDomainSearchByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listFilterByTeamId = /* GraphQL */ `
  query ListFilterByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFilterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listFilterByUserId = /* GraphQL */ `
  query ListFilterByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFilterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listEmailAccountByTeamId = /* GraphQL */ `
  query ListEmailAccountByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmailAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailAccountByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listEmailAccountByUserId = /* GraphQL */ `
  query ListEmailAccountByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmailAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailAccountByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listEnrichmentByTeamId = /* GraphQL */ `
  query ListEnrichmentByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnrichmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichmentByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listEnrichmentByUserId = /* GraphQL */ `
  query ListEnrichmentByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnrichmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichmentByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listEnrichSearchByTeamId = /* GraphQL */ `
  query ListEnrichSearchByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnrichSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichSearchByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listEnrichSearchByUserId = /* GraphQL */ `
  query ListEnrichSearchByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEnrichSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrichSearchByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listFilterItemByTeamId = /* GraphQL */ `
  query ListFilterItemByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFilterItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterItemByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listFilterByUsItemerId = /* GraphQL */ `
  query ListFilterByUsItemerId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFilterItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterByUsItemerId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listAuditLogByTeamId = /* GraphQL */ `
  query ListAuditLogByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAuditLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuditLogByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listAuditLogByUserId = /* GraphQL */ `
  query ListAuditLogByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAuditLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuditLogByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listSubByTeamId = /* GraphQL */ `
  query ListSubByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
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
export const listSubByUserId = /* GraphQL */ `
  query ListSubByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
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
export const listSubByStripeCustomerId = /* GraphQL */ `
  query ListSubByStripeCustomerId(
    $stripeCustomerId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubByStripeCustomerId(
      stripeCustomerId: $stripeCustomerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
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
export const listSubLogByTeamId = /* GraphQL */ `
  query ListSubLogByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubLogByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listSubLogByUserId = /* GraphQL */ `
  query ListSubLogByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubLogByUserId(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listUsageByTeamId = /* GraphQL */ `
  query ListUsageByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUsageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsageByTeamId(
      teamId: $teamId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        teamId
        userId
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
export const listUsageByUserId = /* GraphQL */ `
  query ListUsageByUserId(
    $userId: ID!
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
        owner
        teamId
        userId
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
