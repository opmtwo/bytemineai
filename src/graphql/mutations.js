/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
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
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
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
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
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
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
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
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
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
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
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
export const createListContact = /* GraphQL */ `
  mutation CreateListContact(
    $input: CreateListContactInput!
    $condition: ModelListContactConditionInput
  ) {
    createListContact(input: $input, condition: $condition) {
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
export const updateListContact = /* GraphQL */ `
  mutation UpdateListContact(
    $input: UpdateListContactInput!
    $condition: ModelListContactConditionInput
  ) {
    updateListContact(input: $input, condition: $condition) {
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
export const deleteListContact = /* GraphQL */ `
  mutation DeleteListContact(
    $input: DeleteListContactInput!
    $condition: ModelListContactConditionInput
  ) {
    deleteListContact(input: $input, condition: $condition) {
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
export const createContactForm = /* GraphQL */ `
  mutation CreateContactForm(
    $input: CreateContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    createContactForm(input: $input, condition: $condition) {
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
export const updateContactForm = /* GraphQL */ `
  mutation UpdateContactForm(
    $input: UpdateContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    updateContactForm(input: $input, condition: $condition) {
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
export const deleteContactForm = /* GraphQL */ `
  mutation DeleteContactForm(
    $input: DeleteContactFormInput!
    $condition: ModelContactFormConditionInput
  ) {
    deleteContactForm(input: $input, condition: $condition) {
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
export const createDomainSearch = /* GraphQL */ `
  mutation CreateDomainSearch(
    $input: CreateDomainSearchInput!
    $condition: ModelDomainSearchConditionInput
  ) {
    createDomainSearch(input: $input, condition: $condition) {
      id
      tenants
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateDomainSearch = /* GraphQL */ `
  mutation UpdateDomainSearch(
    $input: UpdateDomainSearchInput!
    $condition: ModelDomainSearchConditionInput
  ) {
    updateDomainSearch(input: $input, condition: $condition) {
      id
      tenants
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteDomainSearch = /* GraphQL */ `
  mutation DeleteDomainSearch(
    $input: DeleteDomainSearchInput!
    $condition: ModelDomainSearchConditionInput
  ) {
    deleteDomainSearch(input: $input, condition: $condition) {
      id
      tenants
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createFilter = /* GraphQL */ `
  mutation CreateFilter(
    $input: CreateFilterInput!
    $condition: ModelFilterConditionInput
  ) {
    createFilter(input: $input, condition: $condition) {
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
export const updateFilter = /* GraphQL */ `
  mutation UpdateFilter(
    $input: UpdateFilterInput!
    $condition: ModelFilterConditionInput
  ) {
    updateFilter(input: $input, condition: $condition) {
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
export const deleteFilter = /* GraphQL */ `
  mutation DeleteFilter(
    $input: DeleteFilterInput!
    $condition: ModelFilterConditionInput
  ) {
    deleteFilter(input: $input, condition: $condition) {
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
export const createUsage = /* GraphQL */ `
  mutation CreateUsage(
    $input: CreateUsageInput!
    $condition: ModelUsageConditionInput
  ) {
    createUsage(input: $input, condition: $condition) {
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
export const updateUsage = /* GraphQL */ `
  mutation UpdateUsage(
    $input: UpdateUsageInput!
    $condition: ModelUsageConditionInput
  ) {
    updateUsage(input: $input, condition: $condition) {
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
export const deleteUsage = /* GraphQL */ `
  mutation DeleteUsage(
    $input: DeleteUsageInput!
    $condition: ModelUsageConditionInput
  ) {
    deleteUsage(input: $input, condition: $condition) {
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
export const createEmailAccount = /* GraphQL */ `
  mutation CreateEmailAccount(
    $input: CreateEmailAccountInput!
    $condition: ModelEmailAccountConditionInput
  ) {
    createEmailAccount(input: $input, condition: $condition) {
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
export const updateEmailAccount = /* GraphQL */ `
  mutation UpdateEmailAccount(
    $input: UpdateEmailAccountInput!
    $condition: ModelEmailAccountConditionInput
  ) {
    updateEmailAccount(input: $input, condition: $condition) {
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
export const deleteEmailAccount = /* GraphQL */ `
  mutation DeleteEmailAccount(
    $input: DeleteEmailAccountInput!
    $condition: ModelEmailAccountConditionInput
  ) {
    deleteEmailAccount(input: $input, condition: $condition) {
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
export const createAuditLog = /* GraphQL */ `
  mutation CreateAuditLog(
    $input: CreateAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    createAuditLog(input: $input, condition: $condition) {
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
export const updateAuditLog = /* GraphQL */ `
  mutation UpdateAuditLog(
    $input: UpdateAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    updateAuditLog(input: $input, condition: $condition) {
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
export const deleteAuditLog = /* GraphQL */ `
  mutation DeleteAuditLog(
    $input: DeleteAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    deleteAuditLog(input: $input, condition: $condition) {
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
export const createEnrichSearch = /* GraphQL */ `
  mutation CreateEnrichSearch(
    $input: CreateEnrichSearchInput!
    $condition: ModelEnrichSearchConditionInput
  ) {
    createEnrichSearch(input: $input, condition: $condition) {
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
export const updateEnrichSearch = /* GraphQL */ `
  mutation UpdateEnrichSearch(
    $input: UpdateEnrichSearchInput!
    $condition: ModelEnrichSearchConditionInput
  ) {
    updateEnrichSearch(input: $input, condition: $condition) {
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
export const deleteEnrichSearch = /* GraphQL */ `
  mutation DeleteEnrichSearch(
    $input: DeleteEnrichSearchInput!
    $condition: ModelEnrichSearchConditionInput
  ) {
    deleteEnrichSearch(input: $input, condition: $condition) {
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
export const createNymblrSubscription = /* GraphQL */ `
  mutation CreateNymblrSubscription(
    $input: CreateNymblrSubscriptionInput!
    $condition: ModelNymblrSubscriptionConditionInput
  ) {
    createNymblrSubscription(input: $input, condition: $condition) {
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
export const updateNymblrSubscription = /* GraphQL */ `
  mutation UpdateNymblrSubscription(
    $input: UpdateNymblrSubscriptionInput!
    $condition: ModelNymblrSubscriptionConditionInput
  ) {
    updateNymblrSubscription(input: $input, condition: $condition) {
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
export const deleteNymblrSubscription = /* GraphQL */ `
  mutation DeleteNymblrSubscription(
    $input: DeleteNymblrSubscriptionInput!
    $condition: ModelNymblrSubscriptionConditionInput
  ) {
    deleteNymblrSubscription(input: $input, condition: $condition) {
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
export const createAudience = /* GraphQL */ `
  mutation CreateAudience(
    $input: CreateAudienceInput!
    $condition: ModelAudienceConditionInput
  ) {
    createAudience(input: $input, condition: $condition) {
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
export const updateAudience = /* GraphQL */ `
  mutation UpdateAudience(
    $input: UpdateAudienceInput!
    $condition: ModelAudienceConditionInput
  ) {
    updateAudience(input: $input, condition: $condition) {
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
export const deleteAudience = /* GraphQL */ `
  mutation DeleteAudience(
    $input: DeleteAudienceInput!
    $condition: ModelAudienceConditionInput
  ) {
    deleteAudience(input: $input, condition: $condition) {
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
export const createEnrichment = /* GraphQL */ `
  mutation CreateEnrichment(
    $input: CreateEnrichmentInput!
    $condition: ModelEnrichmentConditionInput
  ) {
    createEnrichment(input: $input, condition: $condition) {
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
export const updateEnrichment = /* GraphQL */ `
  mutation UpdateEnrichment(
    $input: UpdateEnrichmentInput!
    $condition: ModelEnrichmentConditionInput
  ) {
    updateEnrichment(input: $input, condition: $condition) {
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
export const deleteEnrichment = /* GraphQL */ `
  mutation DeleteEnrichment(
    $input: DeleteEnrichmentInput!
    $condition: ModelEnrichmentConditionInput
  ) {
    deleteEnrichment(input: $input, condition: $condition) {
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
export const createFilterItem = /* GraphQL */ `
  mutation CreateFilterItem(
    $input: CreateFilterItemInput!
    $condition: ModelFilterItemConditionInput
  ) {
    createFilterItem(input: $input, condition: $condition) {
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
export const updateFilterItem = /* GraphQL */ `
  mutation UpdateFilterItem(
    $input: UpdateFilterItemInput!
    $condition: ModelFilterItemConditionInput
  ) {
    updateFilterItem(input: $input, condition: $condition) {
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
export const deleteFilterItem = /* GraphQL */ `
  mutation DeleteFilterItem(
    $input: DeleteFilterItemInput!
    $condition: ModelFilterItemConditionInput
  ) {
    deleteFilterItem(input: $input, condition: $condition) {
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
export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign(
    $input: CreateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    createCampaign(input: $input, condition: $condition) {
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
export const updateCampaign = /* GraphQL */ `
  mutation UpdateCampaign(
    $input: UpdateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    updateCampaign(input: $input, condition: $condition) {
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
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign(
    $input: DeleteCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    deleteCampaign(input: $input, condition: $condition) {
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
