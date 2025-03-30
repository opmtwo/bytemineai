/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($owner: String) {
    onCreateList(owner: $owner) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($owner: String) {
    onUpdateList(owner: $owner) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($owner: String) {
    onDeleteList(owner: $owner) {
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
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact($owner: String) {
    onCreateContact(owner: $owner) {
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact($owner: String) {
    onUpdateContact(owner: $owner) {
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact($owner: String) {
    onDeleteContact(owner: $owner) {
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
export const onCreateListContact = /* GraphQL */ `
  subscription OnCreateListContact($owner: String) {
    onCreateListContact(owner: $owner) {
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
export const onUpdateListContact = /* GraphQL */ `
  subscription OnUpdateListContact($owner: String) {
    onUpdateListContact(owner: $owner) {
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
export const onDeleteListContact = /* GraphQL */ `
  subscription OnDeleteListContact($owner: String) {
    onDeleteListContact(owner: $owner) {
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
export const onCreateContactForm = /* GraphQL */ `
  subscription OnCreateContactForm($owner: String) {
    onCreateContactForm(owner: $owner) {
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
export const onUpdateContactForm = /* GraphQL */ `
  subscription OnUpdateContactForm($owner: String) {
    onUpdateContactForm(owner: $owner) {
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
export const onDeleteContactForm = /* GraphQL */ `
  subscription OnDeleteContactForm($owner: String) {
    onDeleteContactForm(owner: $owner) {
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
export const onCreateDomainSearch = /* GraphQL */ `
  subscription OnCreateDomainSearch($owner: String) {
    onCreateDomainSearch(owner: $owner) {
      id
      tenants
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateDomainSearch = /* GraphQL */ `
  subscription OnUpdateDomainSearch($owner: String) {
    onUpdateDomainSearch(owner: $owner) {
      id
      tenants
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteDomainSearch = /* GraphQL */ `
  subscription OnDeleteDomainSearch($owner: String) {
    onDeleteDomainSearch(owner: $owner) {
      id
      tenants
      term
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFilter = /* GraphQL */ `
  subscription OnCreateFilter($owner: String) {
    onCreateFilter(owner: $owner) {
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
export const onUpdateFilter = /* GraphQL */ `
  subscription OnUpdateFilter($owner: String) {
    onUpdateFilter(owner: $owner) {
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
export const onDeleteFilter = /* GraphQL */ `
  subscription OnDeleteFilter($owner: String) {
    onDeleteFilter(owner: $owner) {
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
export const onCreateUsage = /* GraphQL */ `
  subscription OnCreateUsage {
    onCreateUsage {
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
export const onUpdateUsage = /* GraphQL */ `
  subscription OnUpdateUsage {
    onUpdateUsage {
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
export const onDeleteUsage = /* GraphQL */ `
  subscription OnDeleteUsage {
    onDeleteUsage {
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
export const onCreateEmailAccount = /* GraphQL */ `
  subscription OnCreateEmailAccount($owner: String) {
    onCreateEmailAccount(owner: $owner) {
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
export const onUpdateEmailAccount = /* GraphQL */ `
  subscription OnUpdateEmailAccount($owner: String) {
    onUpdateEmailAccount(owner: $owner) {
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
export const onDeleteEmailAccount = /* GraphQL */ `
  subscription OnDeleteEmailAccount($owner: String) {
    onDeleteEmailAccount(owner: $owner) {
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
export const onCreateAuditLog = /* GraphQL */ `
  subscription OnCreateAuditLog {
    onCreateAuditLog {
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
export const onUpdateAuditLog = /* GraphQL */ `
  subscription OnUpdateAuditLog {
    onUpdateAuditLog {
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
export const onDeleteAuditLog = /* GraphQL */ `
  subscription OnDeleteAuditLog {
    onDeleteAuditLog {
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
export const onCreateEnrichSearch = /* GraphQL */ `
  subscription OnCreateEnrichSearch($owner: String) {
    onCreateEnrichSearch(owner: $owner) {
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
export const onUpdateEnrichSearch = /* GraphQL */ `
  subscription OnUpdateEnrichSearch($owner: String) {
    onUpdateEnrichSearch(owner: $owner) {
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
export const onDeleteEnrichSearch = /* GraphQL */ `
  subscription OnDeleteEnrichSearch($owner: String) {
    onDeleteEnrichSearch(owner: $owner) {
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
export const onCreateNymblrSubscription = /* GraphQL */ `
  subscription OnCreateNymblrSubscription($owner: String) {
    onCreateNymblrSubscription(owner: $owner) {
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
export const onUpdateNymblrSubscription = /* GraphQL */ `
  subscription OnUpdateNymblrSubscription($owner: String) {
    onUpdateNymblrSubscription(owner: $owner) {
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
export const onDeleteNymblrSubscription = /* GraphQL */ `
  subscription OnDeleteNymblrSubscription($owner: String) {
    onDeleteNymblrSubscription(owner: $owner) {
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
export const onCreateAudience = /* GraphQL */ `
  subscription OnCreateAudience($owner: String) {
    onCreateAudience(owner: $owner) {
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
export const onUpdateAudience = /* GraphQL */ `
  subscription OnUpdateAudience($owner: String) {
    onUpdateAudience(owner: $owner) {
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
export const onDeleteAudience = /* GraphQL */ `
  subscription OnDeleteAudience($owner: String) {
    onDeleteAudience(owner: $owner) {
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
export const onCreateEnrichment = /* GraphQL */ `
  subscription OnCreateEnrichment($owner: String) {
    onCreateEnrichment(owner: $owner) {
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
export const onUpdateEnrichment = /* GraphQL */ `
  subscription OnUpdateEnrichment($owner: String) {
    onUpdateEnrichment(owner: $owner) {
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
export const onDeleteEnrichment = /* GraphQL */ `
  subscription OnDeleteEnrichment($owner: String) {
    onDeleteEnrichment(owner: $owner) {
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
export const onCreateFilterItem = /* GraphQL */ `
  subscription OnCreateFilterItem($owner: String) {
    onCreateFilterItem(owner: $owner) {
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
export const onUpdateFilterItem = /* GraphQL */ `
  subscription OnUpdateFilterItem($owner: String) {
    onUpdateFilterItem(owner: $owner) {
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
export const onDeleteFilterItem = /* GraphQL */ `
  subscription OnDeleteFilterItem($owner: String) {
    onDeleteFilterItem(owner: $owner) {
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
export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign($owner: String) {
    onCreateCampaign(owner: $owner) {
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
export const onUpdateCampaign = /* GraphQL */ `
  subscription OnUpdateCampaign($owner: String) {
    onUpdateCampaign(owner: $owner) {
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
export const onDeleteCampaign = /* GraphQL */ `
  subscription OnDeleteCampaign($owner: String) {
    onDeleteCampaign(owner: $owner) {
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
