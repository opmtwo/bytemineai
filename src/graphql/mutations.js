/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBytemineCollection = /* GraphQL */ `
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
export const updateBytemineCollection = /* GraphQL */ `
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
export const deleteBytemineCollection = /* GraphQL */ `
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
export const createBytemineUser = /* GraphQL */ `
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
      __typename
    }
  }
`;
export const updateBytemineUser = /* GraphQL */ `
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
      __typename
    }
  }
`;
export const deleteBytemineUser = /* GraphQL */ `
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
      __typename
    }
  }
`;
export const createBytemineContact = /* GraphQL */ `
  mutation CreateBytemineContact(
    $input: CreateBytemineContactInput!
    $condition: ModelBytemineContactConditionInput
  ) {
    createBytemineContact(input: $input, condition: $condition) {
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
export const updateBytemineContact = /* GraphQL */ `
  mutation UpdateBytemineContact(
    $input: UpdateBytemineContactInput!
    $condition: ModelBytemineContactConditionInput
  ) {
    updateBytemineContact(input: $input, condition: $condition) {
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
export const deleteBytemineContact = /* GraphQL */ `
  mutation DeleteBytemineContact(
    $input: DeleteBytemineContactInput!
    $condition: ModelBytemineContactConditionInput
  ) {
    deleteBytemineContact(input: $input, condition: $condition) {
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
export const createBytemineCollectionContact = /* GraphQL */ `
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
export const updateBytemineCollectionContact = /* GraphQL */ `
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
export const deleteBytemineCollectionContact = /* GraphQL */ `
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
export const createBytemineContactForm = /* GraphQL */ `
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
export const updateBytemineContactForm = /* GraphQL */ `
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
export const deleteBytemineContactForm = /* GraphQL */ `
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
export const createBytemineDomainSearch = /* GraphQL */ `
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
export const updateBytemineDomainSearch = /* GraphQL */ `
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
export const deleteBytemineDomainSearch = /* GraphQL */ `
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
export const createBytemineFilter = /* GraphQL */ `
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
export const updateBytemineFilter = /* GraphQL */ `
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
export const deleteBytemineFilter = /* GraphQL */ `
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
export const createBytemineEmailAccount = /* GraphQL */ `
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
export const updateBytemineEmailAccount = /* GraphQL */ `
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
export const deleteBytemineEmailAccount = /* GraphQL */ `
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
export const createBytemineEnrichment = /* GraphQL */ `
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
      status
      __typename
    }
  }
`;
export const updateBytemineEnrichment = /* GraphQL */ `
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
      status
      __typename
    }
  }
`;
export const deleteBytemineEnrichment = /* GraphQL */ `
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
      status
      __typename
    }
  }
`;
export const createBytemineEnrichSearch = /* GraphQL */ `
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
export const updateBytemineEnrichSearch = /* GraphQL */ `
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
export const deleteBytemineEnrichSearch = /* GraphQL */ `
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
export const createBytemineFilterItem = /* GraphQL */ `
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
export const updateBytemineFilterItem = /* GraphQL */ `
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
export const deleteBytemineFilterItem = /* GraphQL */ `
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
export const createBytemineAuditLog = /* GraphQL */ `
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
export const updateBytemineAuditLog = /* GraphQL */ `
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
export const deleteBytemineAuditLog = /* GraphQL */ `
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
export const createBytemineSub = /* GraphQL */ `
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
export const updateBytemineSub = /* GraphQL */ `
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
export const deleteBytemineSub = /* GraphQL */ `
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
export const createBytemineSubLog = /* GraphQL */ `
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
export const updateBytemineSubLog = /* GraphQL */ `
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
export const deleteBytemineSubLog = /* GraphQL */ `
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
export const createBytemineUsage = /* GraphQL */ `
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
export const updateBytemineUsage = /* GraphQL */ `
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
export const deleteBytemineUsage = /* GraphQL */ `
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
