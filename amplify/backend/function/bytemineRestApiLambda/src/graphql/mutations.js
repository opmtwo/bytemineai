/* eslint-disable */
// this is an auto generated file. This will be overwritten

exports.createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
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
exports.updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
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
exports.deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
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
exports.createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
exports.updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
exports.deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
exports.createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
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
exports.updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
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
exports.deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
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
exports.createCollectionContact = /* GraphQL */ `
  mutation CreateCollectionContact(
    $input: CreateCollectionContactInput!
    $condition: ModelCollectionContactConditionInput
  ) {
    createCollectionContact(input: $input, condition: $condition) {
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
exports.updateCollectionContact = /* GraphQL */ `
  mutation UpdateCollectionContact(
    $input: UpdateCollectionContactInput!
    $condition: ModelCollectionContactConditionInput
  ) {
    updateCollectionContact(input: $input, condition: $condition) {
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
exports.deleteCollectionContact = /* GraphQL */ `
  mutation DeleteCollectionContact(
    $input: DeleteCollectionContactInput!
    $condition: ModelCollectionContactConditionInput
  ) {
    deleteCollectionContact(input: $input, condition: $condition) {
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
exports.createContactForm = /* GraphQL */ `
  mutation CreateContactForm(
    $input: CreateContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    createContactForm(input: $input, condition: $condition) {
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
exports.updateContactForm = /* GraphQL */ `
  mutation UpdateContactForm(
    $input: UpdateContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    updateContactForm(input: $input, condition: $condition) {
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
exports.deleteContactForm = /* GraphQL */ `
  mutation DeleteContactForm(
    $input: DeleteContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    deleteContactForm(input: $input, condition: $condition) {
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
exports.createDomainSearch = /* GraphQL */ `
  mutation CreateDomainSearch(
    $input: CreateDomainSearchInput!
    $condition: ModelDomainSearchConditionInput
  ) {
    createDomainSearch(input: $input, condition: $condition) {
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
exports.updateDomainSearch = /* GraphQL */ `
  mutation UpdateDomainSearch(
    $input: UpdateDomainSearchInput!
    $condition: ModelDomainSearchConditionInput
  ) {
    updateDomainSearch(input: $input, condition: $condition) {
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
exports.deleteDomainSearch = /* GraphQL */ `
  mutation DeleteDomainSearch(
    $input: DeleteDomainSearchInput!
    $condition: ModelDomainSearchConditionInput
  ) {
    deleteDomainSearch(input: $input, condition: $condition) {
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
exports.createFilter = /* GraphQL */ `
  mutation CreateFilter(
    $input: CreateFilterInput!
    $condition: ModelFilterConditionInput
  ) {
    createFilter(input: $input, condition: $condition) {
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
exports.updateFilter = /* GraphQL */ `
  mutation UpdateFilter(
    $input: UpdateFilterInput!
    $condition: ModelFilterConditionInput
  ) {
    updateFilter(input: $input, condition: $condition) {
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
exports.deleteFilter = /* GraphQL */ `
  mutation DeleteFilter(
    $input: DeleteFilterInput!
    $condition: ModelFilterConditionInput
  ) {
    deleteFilter(input: $input, condition: $condition) {
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
exports.createEmailAccount = /* GraphQL */ `
  mutation CreateEmailAccount(
    $input: CreateEmailAccountInput!
    $condition: ModelEmailAccountConditionInput
  ) {
    createEmailAccount(input: $input, condition: $condition) {
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
exports.updateEmailAccount = /* GraphQL */ `
  mutation UpdateEmailAccount(
    $input: UpdateEmailAccountInput!
    $condition: ModelEmailAccountConditionInput
  ) {
    updateEmailAccount(input: $input, condition: $condition) {
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
exports.deleteEmailAccount = /* GraphQL */ `
  mutation DeleteEmailAccount(
    $input: DeleteEmailAccountInput!
    $condition: ModelEmailAccountConditionInput
  ) {
    deleteEmailAccount(input: $input, condition: $condition) {
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
exports.createEnrichment = /* GraphQL */ `
  mutation CreateEnrichment(
    $input: CreateEnrichmentInput!
    $condition: ModelEnrichmentConditionInput
  ) {
    createEnrichment(input: $input, condition: $condition) {
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
exports.updateEnrichment = /* GraphQL */ `
  mutation UpdateEnrichment(
    $input: UpdateEnrichmentInput!
    $condition: ModelEnrichmentConditionInput
  ) {
    updateEnrichment(input: $input, condition: $condition) {
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
exports.deleteEnrichment = /* GraphQL */ `
  mutation DeleteEnrichment(
    $input: DeleteEnrichmentInput!
    $condition: ModelEnrichmentConditionInput
  ) {
    deleteEnrichment(input: $input, condition: $condition) {
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
exports.createEnrichSearch = /* GraphQL */ `
  mutation CreateEnrichSearch(
    $input: CreateEnrichSearchInput!
    $condition: ModelEnrichSearchConditionInput
  ) {
    createEnrichSearch(input: $input, condition: $condition) {
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
exports.updateEnrichSearch = /* GraphQL */ `
  mutation UpdateEnrichSearch(
    $input: UpdateEnrichSearchInput!
    $condition: ModelEnrichSearchConditionInput
  ) {
    updateEnrichSearch(input: $input, condition: $condition) {
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
exports.deleteEnrichSearch = /* GraphQL */ `
  mutation DeleteEnrichSearch(
    $input: DeleteEnrichSearchInput!
    $condition: ModelEnrichSearchConditionInput
  ) {
    deleteEnrichSearch(input: $input, condition: $condition) {
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
exports.createFilterItem = /* GraphQL */ `
  mutation CreateFilterItem(
    $input: CreateFilterItemInput!
    $condition: ModelFilterItemConditionInput
  ) {
    createFilterItem(input: $input, condition: $condition) {
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
exports.updateFilterItem = /* GraphQL */ `
  mutation UpdateFilterItem(
    $input: UpdateFilterItemInput!
    $condition: ModelFilterItemConditionInput
  ) {
    updateFilterItem(input: $input, condition: $condition) {
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
exports.deleteFilterItem = /* GraphQL */ `
  mutation DeleteFilterItem(
    $input: DeleteFilterItemInput!
    $condition: ModelFilterItemConditionInput
  ) {
    deleteFilterItem(input: $input, condition: $condition) {
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
exports.createAuditLog = /* GraphQL */ `
  mutation CreateAuditLog(
    $input: CreateAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    createAuditLog(input: $input, condition: $condition) {
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
exports.updateAuditLog = /* GraphQL */ `
  mutation UpdateAuditLog(
    $input: UpdateAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    updateAuditLog(input: $input, condition: $condition) {
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
exports.deleteAuditLog = /* GraphQL */ `
  mutation DeleteAuditLog(
    $input: DeleteAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    deleteAuditLog(input: $input, condition: $condition) {
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
exports.createSub = /* GraphQL */ `
  mutation CreateSub(
    $input: CreateSubInput!
    $condition: ModelSubConditionInput
  ) {
    createSub(input: $input, condition: $condition) {
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
exports.updateSub = /* GraphQL */ `
  mutation UpdateSub(
    $input: UpdateSubInput!
    $condition: ModelSubConditionInput
  ) {
    updateSub(input: $input, condition: $condition) {
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
exports.deleteSub = /* GraphQL */ `
  mutation DeleteSub(
    $input: DeleteSubInput!
    $condition: ModelSubConditionInput
  ) {
    deleteSub(input: $input, condition: $condition) {
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
exports.createSubLog = /* GraphQL */ `
  mutation CreateSubLog(
    $input: CreateSubLogInput!
    $condition: ModelSubLogConditionInput
  ) {
    createSubLog(input: $input, condition: $condition) {
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
exports.updateSubLog = /* GraphQL */ `
  mutation UpdateSubLog(
    $input: UpdateSubLogInput!
    $condition: ModelSubLogConditionInput
  ) {
    updateSubLog(input: $input, condition: $condition) {
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
exports.deleteSubLog = /* GraphQL */ `
  mutation DeleteSubLog(
    $input: DeleteSubLogInput!
    $condition: ModelSubLogConditionInput
  ) {
    deleteSubLog(input: $input, condition: $condition) {
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
exports.createUsage = /* GraphQL */ `
  mutation CreateUsage(
    $input: CreateUsageInput!
    $condition: ModelUsageConditionInput
  ) {
    createUsage(input: $input, condition: $condition) {
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
exports.updateUsage = /* GraphQL */ `
  mutation UpdateUsage(
    $input: UpdateUsageInput!
    $condition: ModelUsageConditionInput
  ) {
    updateUsage(input: $input, condition: $condition) {
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
exports.deleteUsage = /* GraphQL */ `
  mutation DeleteUsage(
    $input: DeleteUsageInput!
    $condition: ModelUsageConditionInput
  ) {
    deleteUsage(input: $input, condition: $condition) {
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
