/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBytemineCollection = /* GraphQL */ `
  query GetBytemineCollection($id: ID!) {
    getBytemineCollection(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      user {
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
      slug
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
        teamId
        userId
        createdAt
        updatedAt
        user {
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
        slug
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
      teamId
      userId
      createdAt
      updatedAt
      isEnabled
      role
      email
      phone
      name
      givenName
      familyName
      company
      passwordHash
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
        teamId
        userId
        createdAt
        updatedAt
        isEnabled
        role
        email
        phone
        name
        givenName
        familyName
        company
        passwordHash
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
export const getBytemineCollectionContact = /* GraphQL */ `
  query GetBytemineCollectionContact($id: ID!) {
    getBytemineCollectionContact(id: $id) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      collectionId
      collection {
        id
        owner
        teamId
        userId
        createdAt
        updatedAt
        user {
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
        slug
        __typename
      }
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
        teamId
        userId
        createdAt
        updatedAt
        collectionId
        collection {
          id
          owner
          teamId
          userId
          createdAt
          updatedAt
          name
          slug
          __typename
        }
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
export const getBytemineContactForm = /* GraphQL */ `
  query GetBytemineContactForm($id: ID!) {
    getBytemineContactForm(id: $id) {
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
export const getBytemineDomainSearch = /* GraphQL */ `
  query GetBytemineDomainSearch($id: ID!) {
    getBytemineDomainSearch(id: $id) {
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
export const getBytemineFilter = /* GraphQL */ `
  query GetBytemineFilter($id: ID!) {
    getBytemineFilter(id: $id) {
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
export const getBytemineEmailAccount = /* GraphQL */ `
  query GetBytemineEmailAccount($id: ID!) {
    getBytemineEmailAccount(id: $id) {
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
export const getBytemineEnrichment = /* GraphQL */ `
  query GetBytemineEnrichment($id: ID!) {
    getBytemineEnrichment(id: $id) {
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
export const getBytemineEnrichSearch = /* GraphQL */ `
  query GetBytemineEnrichSearch($id: ID!) {
    getBytemineEnrichSearch(id: $id) {
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
export const getBytemineFilterItem = /* GraphQL */ `
  query GetBytemineFilterItem($id: ID!) {
    getBytemineFilterItem(id: $id) {
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
export const getBytemineAuditLog = /* GraphQL */ `
  query GetBytemineAuditLog($id: ID!) {
    getBytemineAuditLog(id: $id) {
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
export const getBytemineSub = /* GraphQL */ `
  query GetBytemineSub($id: ID!) {
    getBytemineSub(id: $id) {
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
export const getBytemineSubLog = /* GraphQL */ `
  query GetBytemineSubLog($id: ID!) {
    getBytemineSubLog(id: $id) {
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
export const getBytemineUsage = /* GraphQL */ `
  query GetBytemineUsage($id: ID!) {
    getBytemineUsage(id: $id) {
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
    $filter: ModelBytemineCollectionFilterInput
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
        user {
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
        slug
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
    $filter: ModelBytemineCollectionFilterInput
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
        user {
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
        slug
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCollectionBySlug = /* GraphQL */ `
  query ListCollectionBySlug(
    $slug: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBytemineCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionBySlug(
      slug: $slug
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
        user {
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
        slug
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listUserByTeamId = /* GraphQL */ `
  query ListUserByTeamId(
    $teamId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBytemineUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserByTeamId(
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
        isEnabled
        role
        email
        phone
        name
        givenName
        familyName
        company
        passwordHash
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listUserByUserId = /* GraphQL */ `
  query ListUserByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBytemineUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserByUserId(
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
        isEnabled
        role
        email
        phone
        name
        givenName
        familyName
        company
        passwordHash
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listUserByEmail = /* GraphQL */ `
  query ListUserByEmail(
    $email: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBytemineUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserByEmail(
      email: $email
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
        isEnabled
        role
        email
        phone
        name
        givenName
        familyName
        company
        passwordHash
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
    $filter: ModelBytemineContactFilterInput
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
    $filter: ModelBytemineContactFilterInput
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
    $filter: ModelBytemineCollectionContactFilterInput
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
        collectionId
        collection {
          id
          owner
          teamId
          userId
          createdAt
          updatedAt
          name
          slug
          __typename
        }
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
    $filter: ModelBytemineCollectionContactFilterInput
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
        collectionId
        collection {
          id
          owner
          teamId
          userId
          createdAt
          updatedAt
          name
          slug
          __typename
        }
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
export const listCollectionContactByCollectionId = /* GraphQL */ `
  query ListCollectionContactByCollectionId(
    $collectionId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBytemineCollectionContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionContactByCollectionId(
      collectionId: $collectionId
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
        collectionId
        collection {
          id
          owner
          teamId
          userId
          createdAt
          updatedAt
          name
          slug
          __typename
        }
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
    $filter: ModelBytemineContactFormFilterInput
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
    $filter: ModelBytemineContactFormFilterInput
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
    $filter: ModelBytemineDomainSearchFilterInput
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
    $filter: ModelBytemineDomainSearchFilterInput
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
    $filter: ModelBytemineFilterFilterInput
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
    $filter: ModelBytemineFilterFilterInput
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
    $filter: ModelBytemineEmailAccountFilterInput
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
    $filter: ModelBytemineEmailAccountFilterInput
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
    $filter: ModelBytemineEnrichmentFilterInput
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
    $filter: ModelBytemineEnrichmentFilterInput
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
    $filter: ModelBytemineEnrichSearchFilterInput
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
    $filter: ModelBytemineEnrichSearchFilterInput
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
    $filter: ModelBytemineFilterItemFilterInput
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
    $filter: ModelBytemineFilterItemFilterInput
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
export const listFilterItemByFilterId = /* GraphQL */ `
  query ListFilterItemByFilterId(
    $filterId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBytemineFilterItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFilterItemByFilterId(
      filterId: $filterId
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
    $filter: ModelBytemineAuditLogFilterInput
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
    $filter: ModelBytemineAuditLogFilterInput
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
    $filter: ModelBytemineSubFilterInput
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
    $filter: ModelBytemineSubFilterInput
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
    $filter: ModelBytemineSubFilterInput
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
    $filter: ModelBytemineSubLogFilterInput
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
    $filter: ModelBytemineSubLogFilterInput
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
    $filter: ModelBytemineUsageFilterInput
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
    $filter: ModelBytemineUsageFilterInput
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
