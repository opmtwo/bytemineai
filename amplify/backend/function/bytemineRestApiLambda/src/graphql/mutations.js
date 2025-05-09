/* eslint-disable */
// this is an auto generated file. This will be overwritten

exports.createBytemineCollection = /* GraphQL */ `
  mutation CreateBytemineCollection(
    $input: CreateBytemineCollectionInput!
    $condition: ModelBytemineCollectionConditionInput
  ) {
    createBytemineCollection(input: $input, condition: $condition) {
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
        avatarS3Key
        avatarS3Url
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
exports.updateBytemineCollection = /* GraphQL */ `
  mutation UpdateBytemineCollection(
    $input: UpdateBytemineCollectionInput!
    $condition: ModelBytemineCollectionConditionInput
  ) {
    updateBytemineCollection(input: $input, condition: $condition) {
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
        avatarS3Key
        avatarS3Url
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
exports.deleteBytemineCollection = /* GraphQL */ `
  mutation DeleteBytemineCollection(
    $input: DeleteBytemineCollectionInput!
    $condition: ModelBytemineCollectionConditionInput
  ) {
    deleteBytemineCollection(input: $input, condition: $condition) {
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
        avatarS3Key
        avatarS3Url
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
exports.createBytemineUser = /* GraphQL */ `
  mutation CreateBytemineUser(
    $input: CreateBytemineUserInput!
    $condition: ModelBytemineUserConditionInput
  ) {
    createBytemineUser(input: $input, condition: $condition) {
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
      avatarS3Key
      avatarS3Url
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
exports.updateBytemineUser = /* GraphQL */ `
  mutation UpdateBytemineUser(
    $input: UpdateBytemineUserInput!
    $condition: ModelBytemineUserConditionInput
  ) {
    updateBytemineUser(input: $input, condition: $condition) {
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
      avatarS3Key
      avatarS3Url
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
exports.deleteBytemineUser = /* GraphQL */ `
  mutation DeleteBytemineUser(
    $input: DeleteBytemineUserInput!
    $condition: ModelBytemineUserConditionInput
  ) {
    deleteBytemineUser(input: $input, condition: $condition) {
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
      avatarS3Key
      avatarS3Url
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
exports.createBytemineContact = /* GraphQL */ `
  mutation CreateBytemineContact(
    $input: CreateBytemineContactInput!
    $condition: ModelBytemineContactConditionInput
  ) {
    createBytemineContact(input: $input, condition: $condition) {
      id
      pid
      uuid
      owner
      teamId
      userId
      createdAt
      updatedAt
      is_email_verified
      contact_email_status_code
      contact_email_domain_type
      personal_email_status_code
      personal_email_domain_type
      contact_personal_email_status_code
      contact_personal_email_domain_type
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
exports.updateBytemineContact = /* GraphQL */ `
  mutation UpdateBytemineContact(
    $input: UpdateBytemineContactInput!
    $condition: ModelBytemineContactConditionInput
  ) {
    updateBytemineContact(input: $input, condition: $condition) {
      id
      pid
      uuid
      owner
      teamId
      userId
      createdAt
      updatedAt
      is_email_verified
      contact_email_status_code
      contact_email_domain_type
      personal_email_status_code
      personal_email_domain_type
      contact_personal_email_status_code
      contact_personal_email_domain_type
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
exports.deleteBytemineContact = /* GraphQL */ `
  mutation DeleteBytemineContact(
    $input: DeleteBytemineContactInput!
    $condition: ModelBytemineContactConditionInput
  ) {
    deleteBytemineContact(input: $input, condition: $condition) {
      id
      pid
      uuid
      owner
      teamId
      userId
      createdAt
      updatedAt
      is_email_verified
      contact_email_status_code
      contact_email_domain_type
      personal_email_status_code
      personal_email_domain_type
      contact_personal_email_status_code
      contact_personal_email_domain_type
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
exports.createBytemineCollectionContact = /* GraphQL */ `
  mutation CreateBytemineCollectionContact(
    $input: CreateBytemineCollectionContactInput!
    $condition: ModelBytemineCollectionContactConditionInput
  ) {
    createBytemineCollectionContact(input: $input, condition: $condition) {
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
          avatarS3Key
          avatarS3Url
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
        pid
        uuid
        owner
        teamId
        userId
        createdAt
        updatedAt
        is_email_verified
        contact_email_status_code
        contact_email_domain_type
        personal_email_status_code
        personal_email_domain_type
        contact_personal_email_status_code
        contact_personal_email_domain_type
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
exports.updateBytemineCollectionContact = /* GraphQL */ `
  mutation UpdateBytemineCollectionContact(
    $input: UpdateBytemineCollectionContactInput!
    $condition: ModelBytemineCollectionContactConditionInput
  ) {
    updateBytemineCollectionContact(input: $input, condition: $condition) {
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
          avatarS3Key
          avatarS3Url
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
        pid
        uuid
        owner
        teamId
        userId
        createdAt
        updatedAt
        is_email_verified
        contact_email_status_code
        contact_email_domain_type
        personal_email_status_code
        personal_email_domain_type
        contact_personal_email_status_code
        contact_personal_email_domain_type
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
exports.deleteBytemineCollectionContact = /* GraphQL */ `
  mutation DeleteBytemineCollectionContact(
    $input: DeleteBytemineCollectionContactInput!
    $condition: ModelBytemineCollectionContactConditionInput
  ) {
    deleteBytemineCollectionContact(input: $input, condition: $condition) {
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
          avatarS3Key
          avatarS3Url
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
        pid
        uuid
        owner
        teamId
        userId
        createdAt
        updatedAt
        is_email_verified
        contact_email_status_code
        contact_email_domain_type
        personal_email_status_code
        personal_email_domain_type
        contact_personal_email_status_code
        contact_personal_email_domain_type
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
exports.createBytemineContactForm = /* GraphQL */ `
  mutation CreateBytemineContactForm(
    $input: CreateBytemineContactFormInput!
    $condition: ModelBytemineContactFormConditionInput
  ) {
    createBytemineContactForm(input: $input, condition: $condition) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      contactId
      contact {
        id
        pid
        uuid
        owner
        teamId
        userId
        createdAt
        updatedAt
        is_email_verified
        contact_email_status_code
        contact_email_domain_type
        personal_email_status_code
        personal_email_domain_type
        contact_personal_email_status_code
        contact_personal_email_domain_type
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
exports.updateBytemineContactForm = /* GraphQL */ `
  mutation UpdateBytemineContactForm(
    $input: UpdateBytemineContactFormInput!
    $condition: ModelBytemineContactFormConditionInput
  ) {
    updateBytemineContactForm(input: $input, condition: $condition) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      contactId
      contact {
        id
        pid
        uuid
        owner
        teamId
        userId
        createdAt
        updatedAt
        is_email_verified
        contact_email_status_code
        contact_email_domain_type
        personal_email_status_code
        personal_email_domain_type
        contact_personal_email_status_code
        contact_personal_email_domain_type
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
exports.deleteBytemineContactForm = /* GraphQL */ `
  mutation DeleteBytemineContactForm(
    $input: DeleteBytemineContactFormInput!
    $condition: ModelBytemineContactFormConditionInput
  ) {
    deleteBytemineContactForm(input: $input, condition: $condition) {
      id
      owner
      teamId
      userId
      createdAt
      updatedAt
      contactId
      contact {
        id
        pid
        uuid
        owner
        teamId
        userId
        createdAt
        updatedAt
        is_email_verified
        contact_email_status_code
        contact_email_domain_type
        personal_email_status_code
        personal_email_domain_type
        contact_personal_email_status_code
        contact_personal_email_domain_type
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
exports.createBytemineDomainSearch = /* GraphQL */ `
  mutation CreateBytemineDomainSearch(
    $input: CreateBytemineDomainSearchInput!
    $condition: ModelBytemineDomainSearchConditionInput
  ) {
    createBytemineDomainSearch(input: $input, condition: $condition) {
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
exports.updateBytemineDomainSearch = /* GraphQL */ `
  mutation UpdateBytemineDomainSearch(
    $input: UpdateBytemineDomainSearchInput!
    $condition: ModelBytemineDomainSearchConditionInput
  ) {
    updateBytemineDomainSearch(input: $input, condition: $condition) {
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
exports.deleteBytemineDomainSearch = /* GraphQL */ `
  mutation DeleteBytemineDomainSearch(
    $input: DeleteBytemineDomainSearchInput!
    $condition: ModelBytemineDomainSearchConditionInput
  ) {
    deleteBytemineDomainSearch(input: $input, condition: $condition) {
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
exports.createBytemineFilter = /* GraphQL */ `
  mutation CreateBytemineFilter(
    $input: CreateBytemineFilterInput!
    $condition: ModelBytemineFilterConditionInput
  ) {
    createBytemineFilter(input: $input, condition: $condition) {
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
exports.updateBytemineFilter = /* GraphQL */ `
  mutation UpdateBytemineFilter(
    $input: UpdateBytemineFilterInput!
    $condition: ModelBytemineFilterConditionInput
  ) {
    updateBytemineFilter(input: $input, condition: $condition) {
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
exports.deleteBytemineFilter = /* GraphQL */ `
  mutation DeleteBytemineFilter(
    $input: DeleteBytemineFilterInput!
    $condition: ModelBytemineFilterConditionInput
  ) {
    deleteBytemineFilter(input: $input, condition: $condition) {
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
exports.createBytemineEmailAccount = /* GraphQL */ `
  mutation CreateBytemineEmailAccount(
    $input: CreateBytemineEmailAccountInput!
    $condition: ModelBytemineEmailAccountConditionInput
  ) {
    createBytemineEmailAccount(input: $input, condition: $condition) {
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
exports.updateBytemineEmailAccount = /* GraphQL */ `
  mutation UpdateBytemineEmailAccount(
    $input: UpdateBytemineEmailAccountInput!
    $condition: ModelBytemineEmailAccountConditionInput
  ) {
    updateBytemineEmailAccount(input: $input, condition: $condition) {
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
exports.deleteBytemineEmailAccount = /* GraphQL */ `
  mutation DeleteBytemineEmailAccount(
    $input: DeleteBytemineEmailAccountInput!
    $condition: ModelBytemineEmailAccountConditionInput
  ) {
    deleteBytemineEmailAccount(input: $input, condition: $condition) {
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
exports.createBytemineEnrichment = /* GraphQL */ `
  mutation CreateBytemineEnrichment(
    $input: CreateBytemineEnrichmentInput!
    $condition: ModelBytemineEnrichmentConditionInput
  ) {
    createBytemineEnrichment(input: $input, condition: $condition) {
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
      keyFacebook
      status
      __typename
    }
  }
`;
exports.updateBytemineEnrichment = /* GraphQL */ `
  mutation UpdateBytemineEnrichment(
    $input: UpdateBytemineEnrichmentInput!
    $condition: ModelBytemineEnrichmentConditionInput
  ) {
    updateBytemineEnrichment(input: $input, condition: $condition) {
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
      keyFacebook
      status
      __typename
    }
  }
`;
exports.deleteBytemineEnrichment = /* GraphQL */ `
  mutation DeleteBytemineEnrichment(
    $input: DeleteBytemineEnrichmentInput!
    $condition: ModelBytemineEnrichmentConditionInput
  ) {
    deleteBytemineEnrichment(input: $input, condition: $condition) {
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
      keyFacebook
      status
      __typename
    }
  }
`;
exports.createBytemineEnrichSearch = /* GraphQL */ `
  mutation CreateBytemineEnrichSearch(
    $input: CreateBytemineEnrichSearchInput!
    $condition: ModelBytemineEnrichSearchConditionInput
  ) {
    createBytemineEnrichSearch(input: $input, condition: $condition) {
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
exports.updateBytemineEnrichSearch = /* GraphQL */ `
  mutation UpdateBytemineEnrichSearch(
    $input: UpdateBytemineEnrichSearchInput!
    $condition: ModelBytemineEnrichSearchConditionInput
  ) {
    updateBytemineEnrichSearch(input: $input, condition: $condition) {
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
exports.deleteBytemineEnrichSearch = /* GraphQL */ `
  mutation DeleteBytemineEnrichSearch(
    $input: DeleteBytemineEnrichSearchInput!
    $condition: ModelBytemineEnrichSearchConditionInput
  ) {
    deleteBytemineEnrichSearch(input: $input, condition: $condition) {
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
exports.createBytemineFilterItem = /* GraphQL */ `
  mutation CreateBytemineFilterItem(
    $input: CreateBytemineFilterItemInput!
    $condition: ModelBytemineFilterItemConditionInput
  ) {
    createBytemineFilterItem(input: $input, condition: $condition) {
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
exports.updateBytemineFilterItem = /* GraphQL */ `
  mutation UpdateBytemineFilterItem(
    $input: UpdateBytemineFilterItemInput!
    $condition: ModelBytemineFilterItemConditionInput
  ) {
    updateBytemineFilterItem(input: $input, condition: $condition) {
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
exports.deleteBytemineFilterItem = /* GraphQL */ `
  mutation DeleteBytemineFilterItem(
    $input: DeleteBytemineFilterItemInput!
    $condition: ModelBytemineFilterItemConditionInput
  ) {
    deleteBytemineFilterItem(input: $input, condition: $condition) {
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
exports.createBytemineAuditLog = /* GraphQL */ `
  mutation CreateBytemineAuditLog(
    $input: CreateBytemineAuditLogInput!
    $condition: ModelBytemineAuditLogConditionInput
  ) {
    createBytemineAuditLog(input: $input, condition: $condition) {
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
exports.updateBytemineAuditLog = /* GraphQL */ `
  mutation UpdateBytemineAuditLog(
    $input: UpdateBytemineAuditLogInput!
    $condition: ModelBytemineAuditLogConditionInput
  ) {
    updateBytemineAuditLog(input: $input, condition: $condition) {
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
exports.deleteBytemineAuditLog = /* GraphQL */ `
  mutation DeleteBytemineAuditLog(
    $input: DeleteBytemineAuditLogInput!
    $condition: ModelBytemineAuditLogConditionInput
  ) {
    deleteBytemineAuditLog(input: $input, condition: $condition) {
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
exports.createBytemineSub = /* GraphQL */ `
  mutation CreateBytemineSub(
    $input: CreateBytemineSubInput!
    $condition: ModelBytemineSubConditionInput
  ) {
    createBytemineSub(input: $input, condition: $condition) {
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
      iconS3Key
      logoS3Key
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
exports.updateBytemineSub = /* GraphQL */ `
  mutation UpdateBytemineSub(
    $input: UpdateBytemineSubInput!
    $condition: ModelBytemineSubConditionInput
  ) {
    updateBytemineSub(input: $input, condition: $condition) {
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
      iconS3Key
      logoS3Key
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
exports.deleteBytemineSub = /* GraphQL */ `
  mutation DeleteBytemineSub(
    $input: DeleteBytemineSubInput!
    $condition: ModelBytemineSubConditionInput
  ) {
    deleteBytemineSub(input: $input, condition: $condition) {
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
      iconS3Key
      logoS3Key
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
exports.createBytemineSubLog = /* GraphQL */ `
  mutation CreateBytemineSubLog(
    $input: CreateBytemineSubLogInput!
    $condition: ModelBytemineSubLogConditionInput
  ) {
    createBytemineSubLog(input: $input, condition: $condition) {
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
exports.updateBytemineSubLog = /* GraphQL */ `
  mutation UpdateBytemineSubLog(
    $input: UpdateBytemineSubLogInput!
    $condition: ModelBytemineSubLogConditionInput
  ) {
    updateBytemineSubLog(input: $input, condition: $condition) {
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
exports.deleteBytemineSubLog = /* GraphQL */ `
  mutation DeleteBytemineSubLog(
    $input: DeleteBytemineSubLogInput!
    $condition: ModelBytemineSubLogConditionInput
  ) {
    deleteBytemineSubLog(input: $input, condition: $condition) {
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
exports.createBytemineUsage = /* GraphQL */ `
  mutation CreateBytemineUsage(
    $input: CreateBytemineUsageInput!
    $condition: ModelBytemineUsageConditionInput
  ) {
    createBytemineUsage(input: $input, condition: $condition) {
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
exports.updateBytemineUsage = /* GraphQL */ `
  mutation UpdateBytemineUsage(
    $input: UpdateBytemineUsageInput!
    $condition: ModelBytemineUsageConditionInput
  ) {
    updateBytemineUsage(input: $input, condition: $condition) {
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
exports.deleteBytemineUsage = /* GraphQL */ `
  mutation DeleteBytemineUsage(
    $input: DeleteBytemineUsageInput!
    $condition: ModelBytemineUsageConditionInput
  ) {
    deleteBytemineUsage(input: $input, condition: $condition) {
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
