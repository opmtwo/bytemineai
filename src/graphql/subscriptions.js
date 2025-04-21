/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBytemineCollection = /* GraphQL */ `
  subscription OnCreateBytemineCollection(
    $filter: ModelSubscriptionBytemineCollectionFilterInput
  ) {
    onCreateBytemineCollection(filter: $filter) {
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
        isEnabled
        role
        email
        phone
        name
        givenName
        familyName
        company
        passwordHash
        accountType
        bonusCredits
        colorCode
        country
        credits
        groupName
        hasApi
        hasEmail
        iconS3Key
        logoS3Key
        isBlocked
        lastLoginAt
        renewalPeriod
        seats
        __typename
      }
      name
      slug
      __typename
    }
  }
`;
export const onUpdateBytemineCollection = /* GraphQL */ `
  subscription OnUpdateBytemineCollection(
    $filter: ModelSubscriptionBytemineCollectionFilterInput
  ) {
    onUpdateBytemineCollection(filter: $filter) {
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
        isEnabled
        role
        email
        phone
        name
        givenName
        familyName
        company
        passwordHash
        accountType
        bonusCredits
        colorCode
        country
        credits
        groupName
        hasApi
        hasEmail
        iconS3Key
        logoS3Key
        isBlocked
        lastLoginAt
        renewalPeriod
        seats
        __typename
      }
      name
      slug
      __typename
    }
  }
`;
export const onDeleteBytemineCollection = /* GraphQL */ `
  subscription OnDeleteBytemineCollection(
    $filter: ModelSubscriptionBytemineCollectionFilterInput
  ) {
    onDeleteBytemineCollection(filter: $filter) {
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
        isEnabled
        role
        email
        phone
        name
        givenName
        familyName
        company
        passwordHash
        accountType
        bonusCredits
        colorCode
        country
        credits
        groupName
        hasApi
        hasEmail
        iconS3Key
        logoS3Key
        isBlocked
        lastLoginAt
        renewalPeriod
        seats
        __typename
      }
      name
      slug
      __typename
    }
  }
`;
export const onCreateBytemineUser = /* GraphQL */ `
  subscription OnCreateBytemineUser(
    $filter: ModelSubscriptionBytemineUserFilterInput
  ) {
    onCreateBytemineUser(filter: $filter) {
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
      accountType
      bonusCredits
      colorCode
      country
      credits
      groupName
      hasApi
      hasEmail
      iconS3Key
      logoS3Key
      isBlocked
      lastLoginAt
      renewalPeriod
      seats
      __typename
    }
  }
`;
export const onUpdateBytemineUser = /* GraphQL */ `
  subscription OnUpdateBytemineUser(
    $filter: ModelSubscriptionBytemineUserFilterInput
  ) {
    onUpdateBytemineUser(filter: $filter) {
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
      accountType
      bonusCredits
      colorCode
      country
      credits
      groupName
      hasApi
      hasEmail
      iconS3Key
      logoS3Key
      isBlocked
      lastLoginAt
      renewalPeriod
      seats
      __typename
    }
  }
`;
export const onDeleteBytemineUser = /* GraphQL */ `
  subscription OnDeleteBytemineUser(
    $filter: ModelSubscriptionBytemineUserFilterInput
  ) {
    onDeleteBytemineUser(filter: $filter) {
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
      accountType
      bonusCredits
      colorCode
      country
      credits
      groupName
      hasApi
      hasEmail
      iconS3Key
      logoS3Key
      isBlocked
      lastLoginAt
      renewalPeriod
      seats
      __typename
    }
  }
`;
export const onCreateBytemineContact = /* GraphQL */ `
  subscription OnCreateBytemineContact(
    $filter: ModelSubscriptionBytemineContactFilterInput
  ) {
    onCreateBytemineContact(filter: $filter) {
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
export const onUpdateBytemineContact = /* GraphQL */ `
  subscription OnUpdateBytemineContact(
    $filter: ModelSubscriptionBytemineContactFilterInput
  ) {
    onUpdateBytemineContact(filter: $filter) {
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
export const onDeleteBytemineContact = /* GraphQL */ `
  subscription OnDeleteBytemineContact(
    $filter: ModelSubscriptionBytemineContactFilterInput
  ) {
    onDeleteBytemineContact(filter: $filter) {
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
export const onCreateBytemineCollectionContact = /* GraphQL */ `
  subscription OnCreateBytemineCollectionContact(
    $filter: ModelSubscriptionBytemineCollectionContactFilterInput
  ) {
    onCreateBytemineCollectionContact(filter: $filter) {
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
          isEnabled
          role
          email
          phone
          name
          givenName
          familyName
          company
          passwordHash
          accountType
          bonusCredits
          colorCode
          country
          credits
          groupName
          hasApi
          hasEmail
          iconS3Key
          logoS3Key
          isBlocked
          lastLoginAt
          renewalPeriod
          seats
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
export const onUpdateBytemineCollectionContact = /* GraphQL */ `
  subscription OnUpdateBytemineCollectionContact(
    $filter: ModelSubscriptionBytemineCollectionContactFilterInput
  ) {
    onUpdateBytemineCollectionContact(filter: $filter) {
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
          isEnabled
          role
          email
          phone
          name
          givenName
          familyName
          company
          passwordHash
          accountType
          bonusCredits
          colorCode
          country
          credits
          groupName
          hasApi
          hasEmail
          iconS3Key
          logoS3Key
          isBlocked
          lastLoginAt
          renewalPeriod
          seats
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
export const onDeleteBytemineCollectionContact = /* GraphQL */ `
  subscription OnDeleteBytemineCollectionContact(
    $filter: ModelSubscriptionBytemineCollectionContactFilterInput
  ) {
    onDeleteBytemineCollectionContact(filter: $filter) {
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
          isEnabled
          role
          email
          phone
          name
          givenName
          familyName
          company
          passwordHash
          accountType
          bonusCredits
          colorCode
          country
          credits
          groupName
          hasApi
          hasEmail
          iconS3Key
          logoS3Key
          isBlocked
          lastLoginAt
          renewalPeriod
          seats
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
export const onCreateBytemineContactForm = /* GraphQL */ `
  subscription OnCreateBytemineContactForm(
    $filter: ModelSubscriptionBytemineContactFormFilterInput
  ) {
    onCreateBytemineContactForm(filter: $filter) {
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
export const onUpdateBytemineContactForm = /* GraphQL */ `
  subscription OnUpdateBytemineContactForm(
    $filter: ModelSubscriptionBytemineContactFormFilterInput
  ) {
    onUpdateBytemineContactForm(filter: $filter) {
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
export const onDeleteBytemineContactForm = /* GraphQL */ `
  subscription OnDeleteBytemineContactForm(
    $filter: ModelSubscriptionBytemineContactFormFilterInput
  ) {
    onDeleteBytemineContactForm(filter: $filter) {
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
export const onCreateBytemineDomainSearch = /* GraphQL */ `
  subscription OnCreateBytemineDomainSearch(
    $filter: ModelSubscriptionBytemineDomainSearchFilterInput
  ) {
    onCreateBytemineDomainSearch(filter: $filter) {
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
export const onUpdateBytemineDomainSearch = /* GraphQL */ `
  subscription OnUpdateBytemineDomainSearch(
    $filter: ModelSubscriptionBytemineDomainSearchFilterInput
  ) {
    onUpdateBytemineDomainSearch(filter: $filter) {
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
export const onDeleteBytemineDomainSearch = /* GraphQL */ `
  subscription OnDeleteBytemineDomainSearch(
    $filter: ModelSubscriptionBytemineDomainSearchFilterInput
  ) {
    onDeleteBytemineDomainSearch(filter: $filter) {
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
export const onCreateBytemineFilter = /* GraphQL */ `
  subscription OnCreateBytemineFilter(
    $filter: ModelSubscriptionBytemineFilterFilterInput
  ) {
    onCreateBytemineFilter(filter: $filter) {
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
export const onUpdateBytemineFilter = /* GraphQL */ `
  subscription OnUpdateBytemineFilter(
    $filter: ModelSubscriptionBytemineFilterFilterInput
  ) {
    onUpdateBytemineFilter(filter: $filter) {
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
export const onDeleteBytemineFilter = /* GraphQL */ `
  subscription OnDeleteBytemineFilter(
    $filter: ModelSubscriptionBytemineFilterFilterInput
  ) {
    onDeleteBytemineFilter(filter: $filter) {
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
export const onCreateBytemineEmailAccount = /* GraphQL */ `
  subscription OnCreateBytemineEmailAccount(
    $filter: ModelSubscriptionBytemineEmailAccountFilterInput
  ) {
    onCreateBytemineEmailAccount(filter: $filter) {
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
export const onUpdateBytemineEmailAccount = /* GraphQL */ `
  subscription OnUpdateBytemineEmailAccount(
    $filter: ModelSubscriptionBytemineEmailAccountFilterInput
  ) {
    onUpdateBytemineEmailAccount(filter: $filter) {
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
export const onDeleteBytemineEmailAccount = /* GraphQL */ `
  subscription OnDeleteBytemineEmailAccount(
    $filter: ModelSubscriptionBytemineEmailAccountFilterInput
  ) {
    onDeleteBytemineEmailAccount(filter: $filter) {
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
export const onCreateBytemineEnrichment = /* GraphQL */ `
  subscription OnCreateBytemineEnrichment(
    $filter: ModelSubscriptionBytemineEnrichmentFilterInput
  ) {
    onCreateBytemineEnrichment(filter: $filter) {
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
export const onUpdateBytemineEnrichment = /* GraphQL */ `
  subscription OnUpdateBytemineEnrichment(
    $filter: ModelSubscriptionBytemineEnrichmentFilterInput
  ) {
    onUpdateBytemineEnrichment(filter: $filter) {
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
export const onDeleteBytemineEnrichment = /* GraphQL */ `
  subscription OnDeleteBytemineEnrichment(
    $filter: ModelSubscriptionBytemineEnrichmentFilterInput
  ) {
    onDeleteBytemineEnrichment(filter: $filter) {
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
export const onCreateBytemineEnrichSearch = /* GraphQL */ `
  subscription OnCreateBytemineEnrichSearch(
    $filter: ModelSubscriptionBytemineEnrichSearchFilterInput
  ) {
    onCreateBytemineEnrichSearch(filter: $filter) {
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
export const onUpdateBytemineEnrichSearch = /* GraphQL */ `
  subscription OnUpdateBytemineEnrichSearch(
    $filter: ModelSubscriptionBytemineEnrichSearchFilterInput
  ) {
    onUpdateBytemineEnrichSearch(filter: $filter) {
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
export const onDeleteBytemineEnrichSearch = /* GraphQL */ `
  subscription OnDeleteBytemineEnrichSearch(
    $filter: ModelSubscriptionBytemineEnrichSearchFilterInput
  ) {
    onDeleteBytemineEnrichSearch(filter: $filter) {
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
export const onCreateBytemineFilterItem = /* GraphQL */ `
  subscription OnCreateBytemineFilterItem(
    $filter: ModelSubscriptionBytemineFilterItemFilterInput
  ) {
    onCreateBytemineFilterItem(filter: $filter) {
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
export const onUpdateBytemineFilterItem = /* GraphQL */ `
  subscription OnUpdateBytemineFilterItem(
    $filter: ModelSubscriptionBytemineFilterItemFilterInput
  ) {
    onUpdateBytemineFilterItem(filter: $filter) {
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
export const onDeleteBytemineFilterItem = /* GraphQL */ `
  subscription OnDeleteBytemineFilterItem(
    $filter: ModelSubscriptionBytemineFilterItemFilterInput
  ) {
    onDeleteBytemineFilterItem(filter: $filter) {
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
export const onCreateBytemineAuditLog = /* GraphQL */ `
  subscription OnCreateBytemineAuditLog(
    $filter: ModelSubscriptionBytemineAuditLogFilterInput
  ) {
    onCreateBytemineAuditLog(filter: $filter) {
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
export const onUpdateBytemineAuditLog = /* GraphQL */ `
  subscription OnUpdateBytemineAuditLog(
    $filter: ModelSubscriptionBytemineAuditLogFilterInput
  ) {
    onUpdateBytemineAuditLog(filter: $filter) {
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
export const onDeleteBytemineAuditLog = /* GraphQL */ `
  subscription OnDeleteBytemineAuditLog(
    $filter: ModelSubscriptionBytemineAuditLogFilterInput
  ) {
    onDeleteBytemineAuditLog(filter: $filter) {
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
export const onCreateBytemineSub = /* GraphQL */ `
  subscription OnCreateBytemineSub(
    $filter: ModelSubscriptionBytemineSubFilterInput
  ) {
    onCreateBytemineSub(filter: $filter) {
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
export const onUpdateBytemineSub = /* GraphQL */ `
  subscription OnUpdateBytemineSub(
    $filter: ModelSubscriptionBytemineSubFilterInput
  ) {
    onUpdateBytemineSub(filter: $filter) {
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
export const onDeleteBytemineSub = /* GraphQL */ `
  subscription OnDeleteBytemineSub(
    $filter: ModelSubscriptionBytemineSubFilterInput
  ) {
    onDeleteBytemineSub(filter: $filter) {
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
export const onCreateBytemineSubLog = /* GraphQL */ `
  subscription OnCreateBytemineSubLog(
    $filter: ModelSubscriptionBytemineSubLogFilterInput
  ) {
    onCreateBytemineSubLog(filter: $filter) {
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
export const onUpdateBytemineSubLog = /* GraphQL */ `
  subscription OnUpdateBytemineSubLog(
    $filter: ModelSubscriptionBytemineSubLogFilterInput
  ) {
    onUpdateBytemineSubLog(filter: $filter) {
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
export const onDeleteBytemineSubLog = /* GraphQL */ `
  subscription OnDeleteBytemineSubLog(
    $filter: ModelSubscriptionBytemineSubLogFilterInput
  ) {
    onDeleteBytemineSubLog(filter: $filter) {
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
export const onCreateBytemineUsage = /* GraphQL */ `
  subscription OnCreateBytemineUsage(
    $filter: ModelSubscriptionBytemineUsageFilterInput
  ) {
    onCreateBytemineUsage(filter: $filter) {
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
export const onUpdateBytemineUsage = /* GraphQL */ `
  subscription OnUpdateBytemineUsage(
    $filter: ModelSubscriptionBytemineUsageFilterInput
  ) {
    onUpdateBytemineUsage(filter: $filter) {
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
export const onDeleteBytemineUsage = /* GraphQL */ `
  subscription OnDeleteBytemineUsage(
    $filter: ModelSubscriptionBytemineUsageFilterInput
  ) {
    onDeleteBytemineUsage(filter: $filter) {
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
